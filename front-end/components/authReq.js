//login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Une erreur s\'est produite');
                });
            }
            return response.json();
        })
        // en cas de reussite
        .then(data => {
            window.location.href = './accueil.html';
        })
        .catch((error) => {
            alert(error.message);
            console.error('Erreur :', error.message);
        });
    });
});

// register
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password_check = document.getElementById('password-confirm').value;

        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, password_check })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Une erreur s\'est produite');
                });
            }
            return response.json();
        })
        .then(data => {
            sendEmail(email);
            window.location.href = './accueil.html';
        })
        .catch((error) => {
            alert(error.message);
            console.error('Erreur :', error.message);
        });
    });
});

function sendEmail(toAddress) {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "do-not-reply@spotiflyx.fr",
      Password: "C1121803775B243ECDB5D17520890DABE26A",
      To: toAddress,
      From: "noemerle@hotmail.fr",
      Subject: "Spotiflyx - Confirmation d'inscription",
      Body: "Bonjour, ceci est un mail automatique pour vous confirmez que votre inscription à Spotiflyx été réaliser avec succès."
    });
}
