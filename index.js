const baseURL = "https://api.noroff.dev/api/v1";
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

// Registration Functionality
registerBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const name = usernameInput.value;

    try {
        const response = await fetch(baseURL + '/social/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert('Registration successful. Please log in.');
        } else {
            const data = await response.json();
            alert('Registration error: ' + data.message);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please try again.');
    }
});

// Login Functionality
loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch(baseURL + '/social/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Save JWT to localStorage for future requests
            localStorage.setItem('jwt', data.accessToken);
            window.location.href = '/feed.html';  // redirect to the feed page
        } else {
            alert('Login error: ' + data.message);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please try again.');
    }
});
