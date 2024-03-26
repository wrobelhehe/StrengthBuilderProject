const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const adminEmail = functions.config().admin.email;

exports.assignUserRole = functions.auth.user().onCreate((user) => {
    if (user.email === adminEmail) {
        return admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
    } else {
        return admin.auth().setCustomUserClaims(user.uid, { role: 'user' });
    }
});

exports.addUserToFirestore = functions.auth.user().onCreate((user) => {
    const usersRef = admin.firestore().collection('users');
    return usersRef.doc(user.uid).set({
        email: user.email,
        uid: user.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});

exports.generateTrainingExercises = functions.https.onCall(async (userData, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    const bucket = admin.storage().bucket();
    const fileName = 'filtered_data.json';
    const dataBuffer = await bucket.file(fileName).download();
    const allData = JSON.parse(dataBuffer[0].toString('utf-8'));
    const filteredData = allData.data.filter(user =>
        user.age >= userData.age - 1 && user.age <= userData.age + 1 &&
        user.bodyWeight >= userData.bodyWeight - 2 && user.bodyWeight <= userData.bodyWeight + 2 &&
        user.sex === userData.sex &&
        user.tested === userData.tested);

    const medianSquat = calculateMedian(filteredData.map(user => user.squat));
    const medianBench = calculateMedian(filteredData.map(user => user.bench));
    const medianDeadlift = calculateMedian(filteredData.map(user => user.deadlift));

    const squatRatio = medianSquat / userData.squat;
    const benchRatio = medianBench / userData.bench;
    const deadliftRatio = medianDeadlift / userData.deadlift;

    const userRatios = { squat: squatRatio, bench: benchRatio, deadlift: deadliftRatio }


    const exercisesSnapshot = await admin.firestore().collection('exercises')
        .where('type', 'array-contains', 'powerlifting').get();

    const exercises = exercisesSnapshot.docs.map(doc => doc.data());
    const competitionLifts = filterAndShuffleExercises(exercises, true, 1);
    const nonCompetitionLiftsOne = filterAndShuffleExercises(exercises, false, 1);
    const nonCompetitionLiftsTwo = filterAndShuffleExercises(exercises, false, 0.75);
    const nonCompetitionLiftsThree = filterAndShuffleExercises(exercises, false, 0.5);
    const nonCompetitionLiftsFour = filterAndShuffleExercises(exercises, false, 0.25);
    const selectedExercises = [
        ...selectExercises(competitionLifts, ['squat', 'deadlift', 'bench']),
        ...selectExercises(nonCompetitionLiftsOne, ['squat', 'deadlift', 'bench', 'bench', 'bench']),
        ...selectExercises(nonCompetitionLiftsTwo, ['squat', 'deadlift', 'bench', 'bench', 'bench']),
        ...selectExercises(nonCompetitionLiftsThree, ['squat', 'deadlift', 'bench', 'bench', 'row', 'row', 'row', 'row']),
        ...selectExercises(nonCompetitionLiftsFour, ['squat', 'deadlift', 'bench', 'core', 'core']),
    ];
    const trainingExercises = generateTrainingExercises(selectedExercises, userData.experience, userRatios, siValuesMap, seriesParamsMap, adjustments, stressTable);
    const workouts = generateWorkouts(trainingExercises, userData.numberOfTrainings)
    return workouts;
});

function generateWorkouts(exercises, numberOfTrainings) {
    const sortedExercises = sortExercises(exercises);
    const workouts = distributeExercises(sortedExercises, numberOfTrainings)
    return workouts
}

function distributeExercises(exercises, numberOfTrainings) {
    const sortedExercises = sortExercises(exercises);

    const trainingDays = [];

    for (let day = 0; day < numberOfTrainings; day++) {
        trainingDays.push({
            dayName: `Training ${day + 1}`,
            description: `Description for Training ${day + 1}`,
            exercises: []
        });
    }

    let currentDay = 0;

    sortedExercises.forEach(exercise => {
        const exerciseWithoutUnwantedKeys = {
            name: exercise.name,
            videoUrl: exercise.videoUrl,
            description: exercise.description,
            sets: exercise.sets,
        };

        let tryCount = 0;
        while (tryCount < numberOfTrainings) {
            const lastExerciseInDay = trainingDays[currentDay].exercises[trainingDays[currentDay].exercises.length - 1];
            if (!lastExerciseInDay || !exercise.category.some(category => lastExerciseInDay.category && lastExerciseInDay.category.includes(category))) {
                trainingDays[currentDay].exercises.push(exerciseWithoutUnwantedKeys);
                break;
            } else {
                currentDay = (currentDay + 1) % numberOfTrainings;
            }
            tryCount++;
        }
        if (tryCount === numberOfTrainings) {
            trainingDays[currentDay].exercises.push(exerciseWithoutUnwantedKeys);
        }

        currentDay = (currentDay + 1) % numberOfTrainings;
    });

    return trainingDays;
}



function sortExercises(exercises) {
    return exercises.sort((a, b) => {
        if (a.isCompetitionLift === b.isCompetitionLift) {
            return b.coeff - a.coeff;
        }
        return a.isCompetitionLift ? -1 : 1;
    });
}

function calculateMedian(values) {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    return (values[half - 1] + values[half]) / 2.0;
}



function generateTrainingExercises(exercises, experience, userRatios, siValuesMap, seriesParamsMap, adjustments, stressTable) {
    const trainingExercises = [];
    let upperSiSum = 0;
    let lowerSiSum = 0;
    let stressForWeakerLiftSum = 0;
    let stressForStrongerLiftSum = 0;

    const { squat, deadlift } = userRatios;
    let { upperSi, lowerSi } = analyzeLifts(userRatios, experience, siValuesMap);

    const strongerLift = squat < deadlift ? 'squat' : 'deadlift';
    const weakerLift = strongerLift === 'squat' ? 'deadlift' : 'squat';

    const lowerSiSumTargetForStrongerLift = lowerSi * 0.40;
    const lowerSiSumTargetForWeakerLift = lowerSi * 0.60;
    const errorMargin = 0.05;
    const lowerSiWithMarginForStrongerLift = lowerSiSumTargetForStrongerLift * (1 + errorMargin);
    const lowerSiWithMarginForWeakerLift = lowerSiSumTargetForWeakerLift * (1 + errorMargin);

    exercises.forEach(exercise => {
        const sets = generateRandomSeriesSet(exercise.coeff, experience, seriesParamsMap, adjustments, stressTable);
        if (sets) {
            const exerciseStress = sets.reduce((acc, set) => acc + calculateTotalStress(set, stressTable), 0);

            let addToPlan = false;
            if (exercise.category.includes('bench') && upperSiSum + exerciseStress <= upperSi) {
                upperSiSum += exerciseStress;
                addToPlan = true;
            } else if (exercise.category.includes(weakerLift) && stressForWeakerLiftSum + exerciseStress <= lowerSiWithMarginForWeakerLift) {
                stressForWeakerLiftSum += exerciseStress;
                lowerSiSum += exerciseStress;
                addToPlan = true;
            } else if (exercise.category.includes(strongerLift) && stressForStrongerLiftSum + exerciseStress <= lowerSiWithMarginForStrongerLift) {
                stressForStrongerLiftSum += exerciseStress;
                lowerSiSum += exerciseStress;
                addToPlan = true;
            } else if (!['bench', 'deadlift', 'squat'].some(cat => exercise.category.includes(cat))) {
                addToPlan = true;
            }

            if (addToPlan) {
                trainingExercises.push({
                    name: exercise.name,
                    videoUrl: exercise.videoUrl,
                    description: exercise.description,
                    coeff: exercise.coeff,
                    isCompetitionLift: exercise.isCompetitionLift,
                    category: exercise.category,
                    sets: sets,
                });
            }
        }
    });

    console.log(`Upper body stress index (upperSiSum): ${upperSiSum}, Target Upper SI: ${upperSi}`);
    console.log(`Lower body stress index (lowerSiSum): ${lowerSiSum}, ${weakerLift} Stress: ${stressForWeakerLiftSum}, ${strongerLift} Stress: ${stressForStrongerLiftSum}, Target Lower SI: ${lowerSi}`);
    return trainingExercises;
}


function filterAndShuffleExercises(exercises, isCompetitionLift, coeff) {
    return shuffleArray(exercises.filter(exercise =>
        exercise.isCompetitionLift === isCompetitionLift && exercise.coeff === coeff
    ));
}


function selectExercises(exercises, categories) {
    const selectedExercises = [];

    categories.forEach(category => {
        const foundExercise = exercises.find(exercise => exercise.category.includes(category));
        if (foundExercise) {
            selectedExercises.push(foundExercise);
            exercises.splice(exercises.indexOf(foundExercise), 1);
        }
    });


    return selectedExercises;
}

function shuffleArray(array) {
    array.forEach((element, index) => {
        const j = Math.floor(Math.random() * (index + 1));
        [array[index], array[j]] = [array[j], array[index]];
    });
    return array;
}

function analyzeLifts(ratios, experience, siValuesMap) {
    const { squat, bench, deadlift } = ratios;
    const lowestRatioName = bench <= squat && bench <= deadlift ? 'other' : 'bench';

    console.log(lowestRatioName)
    const siValuesForExperience = siValuesMap[experience];
    if (!siValuesForExperience) throw new Error('Invalid experience level');

    return siValuesForExperience[lowestRatioName];
}


function calculateTotalStress(set, stressTable) {
    const { reps, rpe } = set
    const rpeKey = rpe.toFixed(1);
    const stressValues = stressTable[rpeKey];
    if (!stressValues) {
        console.error("Invalid RPE value.");
        return 0;
    }
    if (reps < 1 || reps > stressValues.length) {
        console.error("Reps out of bounds.");
        return 0;
    }

    return stressValues[reps - 1];
}


function generateRandomSeriesSet(key, experience, seriesParamsMap, adjustments, stressTable) {

    let adjustedSeriesParamsMap = new Map();
    seriesParamsMap.forEach((value, key) => {
        let adjustedValue = {
            ...value,
            stress: value.stress + adjustments[experience].stressAdjustment,
            rpeRange: adjustments[experience].rpeRange
        };
        adjustedSeriesParamsMap.set(key, adjustedValue);
    });

    const params = adjustedSeriesParamsMap.get(key);
    if (!params) return null;

    const seriesSet = [];
    let totalStress = 0;

    if (key === 1 || key === 2) {
        const firstSet = {
            reps: 1,
            rpe: randomIntFromInterval(params.rpeRange[0], params.rpeRange[1]),
            weight: 0,
            tempo: randomElementFromArray(params.tempo),
            rest: roundToNearest(randomIntFromInterval(params.restRange[0], params.restRange[1]), 30)
        };

        let firstSetStress = calculateTotalStress(firstSet, stressTable);
        if (firstSetStress !== undefined) {
            seriesSet.push(firstSet);
            totalStress += firstSetStress;
        }
    }

    const reps = randomIntFromInterval(params.repsRange[0], params.repsRange[1]);
    const rpe = randomIntFromInterval(params.rpeRange[0], params.rpeRange[1]);
    const rest = roundToNearest(randomIntFromInterval(params.restRange[0], params.restRange[1]), 30);
    const tempo = randomElementFromArray(params.tempo);

    while (totalStress < params.stress + 0.5) {
        const newSet = { reps, rpe, weight: params.weight, tempo, rest };
        const stress = calculateTotalStress(newSet, stressTable);

        if (totalStress + stress > params.stress + 0.5) break;

        seriesSet.push(newSet);
        totalStress += stress;
    }

    return seriesSet.length > 0 ? seriesSet : null;
}








function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function roundToNearest(value, nearest) {
    return Math.round(value / nearest) * nearest;
}


adjustments = {
    'beginner': { stressAdjustment: -0.25, rpeRange: [6, 8] },
    'intermediate': { stressAdjustment: 0, rpeRange: [7, 8] },
    'advanced': { stressAdjustment: 0.5, rpeRange: [7, 8, 9] },
};

siValuesMap = {
    beginner: {
        bench: { upperSi: 18, lowerSi: 13 },
        other: { upperSi: 15, lowerSi: 17 },
    },
    intermediate: {
        bench: { upperSi: 23, lowerSi: 17 },
        other: { upperSi: 19, lowerSi: 21 },
    },
    advanced: {
        bench: { upperSi: 30, lowerSi: 23 },
        other: { upperSi: 23, lowerSi: 26 },
    },
};

stressTable = {
    "10.0": [1.2, 1.2, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.0, 1.0],
    "9.5": [1.0, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.0, 1.0, 0.9, 0.9, 0.9],
    "9.0": [0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 0.9, 0.8, 0.8, 0.7],
    "8.5": [0.8, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.8, 0.8, 0.8, 0.7, 0.7, 0.6],
    "8.0": [0.7, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6],
    "7.5": [0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5],
    "7.0": [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4],
    "6.5": [0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4],
    "6.0": [0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3],
    "5.5": [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3],
    "5.0": [0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2],
};

seriesParamsMap = new Map([
    [2, {
        stress: 4,
        rpeRange: [8, 9],
        repsRange: [3, 10],
        tempo: ["2111", "2010", "3010", "2020"],
        weight: 0,
        restRange: [360, 420]
    }],
    [1, {
        stress: 3,
        rpeRange: [7, 8, 9],
        repsRange: [3, 10],
        tempo: ["2111", "2010", "3010", "2020"],
        weight: 0,
        restRange: [240, 360]
    }],
    [0.75, {
        stress: 2,
        rpeRange: [7, 8, 9],
        repsRange: [6, 12],
        tempo: ["2111", "2010", "3010", "2020"],
        weight: 0,
        restRange: [240, 360]
    }],
    [0.5, {
        stress: 1,
        rpeRange: [8, 9],
        repsRange: [6, 12],
        tempo: ["2111", "2010", "3010", "2020"],
        weight: 0,
        restRange: [180, 240]
    }],
    [0.25, {
        stress: 0.75,
        rpeRange: [6, 9],
        repsRange: [3, 10],
        tempo: ["2111", "2010", "3010", "2020"],
        weight: 0,
        restRange: [120, 180]
    }],
]);