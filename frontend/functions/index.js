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

exports.calculateWeakestLift = functions.https.onCall((userData, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    const bucket = admin.storage().bucket();
    const fileName = 'filtered_data.json';

    return bucket.file(fileName).download().then(data => {
        const allUsers = JSON.parse(data.toString('utf-8'));
        const filteredUsers = allUsers.data.filter(user =>
            user.Age >= userData.age - 3 && user.Age <= userData.age + 3 &&
            user.BodyweightKg >= userData.bodyweightKg - 5 && user.BodyweightKg <= userData.bodyweightKg + 5 &&
            user.Sex === userData.sex &&
            user.Equipment === userData.equipment &&
            user.Tested === userData.tested);

        console.log(filteredUsers.length)

        const medianSquat = calculateMedian(filteredUsers.map(user => user.Best3SquatKg));
        const medianBench = calculateMedian(filteredUsers.map(user => user.Best3BenchKg));
        const medianDeadlift = calculateMedian(filteredUsers.map(user => user.Best3DeadliftKg));

        const squatRatio = medianSquat / userData.best3SquatKg;
        const benchRatio = medianBench / userData.best3BenchKg;
        const deadliftRatio = medianDeadlift / userData.best3DeadliftKg;
        const maxRatio = Math.max(squatRatio, benchRatio, deadliftRatio);
        const weakestLift = maxRatio === squatRatio ? 'Squat' : maxRatio === benchRatio ? 'Bench' : 'Deadlift';

        return {
            weakestLift: weakestLift,
            squatRatio: squatRatio,
            benchRatio: benchRatio,
            deadliftRatio: deadliftRatio
        };
    });
});

function calculateMedian(values) {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    return (values[half - 1] + values[half]) / 2.0;
}