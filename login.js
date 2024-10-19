document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simulasi login: admin dan user
    if (email === 'admin@example.com' && password === 'admin123') {
        window.location.href = 'about.html'; // Redirect ke halaman about untuk admin
    } else if (email === 'user@example.com' && password === 'user123') {
        window.location.href = 'home.html'; // Redirect ke halaman home untuk user
    } else {
        errorMessage.innerText = 'Invalid email or password';
    }
});
