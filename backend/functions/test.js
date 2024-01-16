const admin = require('firebase-admin');

admin.initializeApp({
    // Konfiguracja inicjalizacji (jeśli jest wymagana)
});

const uid = 'V76MOlDihDb1axPMjfhib8a8wKr1'; // UID użytkownika, któremu chcesz przypisać rolę admina

admin.auth().setCustomUserClaims(uid, { role: 'admin' })
    .then(() => {
        console.log('Rola admina przypisana dla użytkownika o UID:', uid);
    })
    .catch(error => {
        console.error('Wystąpił błąd podczas przypisywania roli:', error);
    });
