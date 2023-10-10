const API_BASE_URL = 'https://api.noroff.dev';

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

// Use the functions sequentially
async function main() {
  const user = {
    name: 'one_name',
    email: 'one-name-a@noroff.no',
    password: 'one-password',
  };

  // Register
  const registerResponse = await registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
  console.log(registerResponse);

  // Login
  const loginResponse = await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
  console.log(loginResponse);

  // Fetch using token
  const fetchData = await fetchWithToken(API_BASE_URL + '/api/v1/social/posts');
  console.log(fetchData);
}

// Execute the main function
main();
