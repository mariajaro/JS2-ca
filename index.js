/**
 * Base URL for the API endpoints.
 * @constant {string}
 */
const API_BASE_URL = 'https://api.noroff.dev';

/**
 * Registers a new user.
 * @async
 * @param {string} url - The endpoint URL for registration.
 * @param {Object} data - User details for registration.
 * @param {string} data.name - User's name.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @returns {Promise<Object>} Response data from the server.
 */
async function registerUser(url, data) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, postData);
        if (!response.ok) throw new Error('Registration failed');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Logs in a user.
 * @async
 * @param {string} url - The endpoint URL for logging in.
 * @param {Object} data - User details for login.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @returns {Promise<Object>} Response data containing the authentication token.
 */
async function loginUser(url, data) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, postData);
        if (!response.ok) throw new Error('Login failed');
        const json = await response.json();
        localStorage.setItem('accessToken', json.accessToken);
        return json;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Fetches data using an authentication token.
 * @async
 * @param {string} url - The endpoint URL for fetching data.
 * @returns {Promise<Object>} Response data from the server.
 */
async function fetchWithToken(url) {
    try {
        const token = localStorage.getItem('accessToken');
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, getData);
        if (!response.ok) throw new Error('Fetching with token failed');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Handles user registration process.
 */
function handleRegister() {
    const user = {
        name: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user)
        .then(response => {
            console.log(response);
            localStorage.setItem('userRegistered', 'true');
            alert('Registration successful!');
        })
        .catch(error => {
            console.error('Registration error:', error);
        });
}

/**
 * Handles user login process.
 */
function handleLogin() {
    const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user)
        .then(response => {
            console.log(response);
            localStorage.setItem('accessToken', response.accessToken);
            alert('Login successful!');
            
            // Redirect to feed.html
            window.location.href = 'feed.html';
        })
        .catch(error => {
            console.error('Login error:', error);
        });
}

/**
 * Main function: Handles user registration (if not already registered), login, and fetches data.
 * @async
 */
async function main() {
    const user = {
        name: 'one_name',
        email: 'one-name-a@noroff.no',
        password: 'one-password',
    };

    if (!localStorage.getItem('userRegistered')) {
        const registerResponse = await registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
        console.log(registerResponse);
        localStorage.setItem('userRegistered', 'true');
    }

    const loginResponse = await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
    console.log(loginResponse);

    const fetchData = await fetchWithToken(API_BASE_URL + '/api/v1/social/posts');
    console.log(fetchData);
}

document.getElementById('registerBtn').addEventListener('click', function(event) {
    event.preventDefault();
    handleRegister();
});

document.getElementById('loginBtn').addEventListener('click', function(event) {
    event.preventDefault();
    handleLogin();
});

// Call the main function
main();
