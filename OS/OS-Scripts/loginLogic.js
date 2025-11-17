const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');


// Get reference to the login overlay
const overlay  = document.getElementById('LoginOverlay');


async function login(email, password) {
    const response = await fetch("http://localhost:3000/auth/loginOs", { // adjust URL as needed
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const data = await response.json();
        if (response.ok)   {
            alert('Login successful!');
            overlay.style.display = 'none';
        }  
        else {
            alert('Login failed: ' + data.error);
        }

}


loginBtn.addEventListener('click', function() 
{
    //alert(`Username: ${username.value}\nPassword: ${password.value}`);
    login( username.value, password.value);
    // add suppabase login logic here
});



password.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        login( username.value, password.value);
       // alert(`Username: ${username.value}\nPassword: ${password.value}`);
        // add suppabase login logic here
    }
});



