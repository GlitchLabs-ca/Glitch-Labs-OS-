

//env

require('dotenv').config();

//supabase
/////////////////////////////////////////////////////////////


import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
/////////////////////////////////////////////////////////////



const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');


// Get reference to the login overlay
const overlay  = document.getElementById('LoginOverlay');

var successfulLogin = false; // Placeholder for actual login status

password.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        alert(`Username: ${username.value}\nPassword: ${password.value}`);
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

