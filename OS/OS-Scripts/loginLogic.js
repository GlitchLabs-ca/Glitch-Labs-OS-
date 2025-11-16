const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const overlay  = document.getElementById('LoginOverlay');

var successfulLogin = false; // Placeholder for actual login status

password.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // alert(`Username: ${username.value}\nPassword: ${password.value}`);
        // add suppabase login logic here
    }
});

if (successfulLogin)
{
    overlay.style.display = 'none'; // Hide the login overlay on successful login
}


loginBtn.addEventListener('click', function() 
{
    alert(`Username: ${username.value}\nPassword: ${password.value}`);
    // add suppabase login logic here
});

