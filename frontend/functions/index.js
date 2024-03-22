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
        const allData = JSON.parse(data.toString('utf-8'));
        const filteredData = allData.data.filter(user =>
            user.age >= userData.age - 1 && user.age <= userData.age + 1 &&
            user.bodyWeight >= userData.bodyWeight - 2 && user.bodyWeight <= userData.bodyWeight + 2 &&
            user.sex === userData.sex &&
            user.tested === userData.tested);

        console.log(filteredData.length)
        const medianSquat = calculateMedian(filteredData.map(user => user.squat));
        const medianBench = calculateMedian(filteredData.map(user => user.bench));
        const medianDeadlift = calculateMedian(filteredData.map(user => user.deadlift));

        const squatRatio = medianSquat / userData.squat;
        const benchRatio = medianBench / userData.bench;
        const deadliftRatio = medianDeadlift / userData.deadlift;

        return {
            squat: squatRatio,
            bench: benchRatio,
            deadlift: deadliftRatio
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