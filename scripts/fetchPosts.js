// Fetching the token from localStorage
const token = localStorage.getItem('accessToken');

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
    const API_URL = 'https://api.noroff.dev/api/v1/social/posts';

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post mb-4 border p-3';

        // Check for media
        let mediaContent = '';
        if (post.media) {
            mediaContent = `<img src="${post.media}" alt="Post media" class="img-fluid mb-3">`;
        }

        // Convert tags into a string format
        const tagsString = post.tags.join(', ');

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            ${mediaContent}
            <p>${post.body}</p>
            <small class="text-muted">Tags: ${tagsString}</small>
            <div>
                <small>Created on: ${post.created}</small>
                <br>
                <small>Last updated: ${post.updated}</small>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}



// Call the function to fetch and display posts
fetchAndDisplayPosts();
