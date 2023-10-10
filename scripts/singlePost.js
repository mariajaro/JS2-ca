// Fetching the token from localStorage
const API_BASE_URL = 'https://api.noroff.dev';
const token = localStorage.getItem('accessToken');
const postId = localStorage.getItem('currentPostId');

if (postId) {
    fetchPostById(postId);
} else {
    console.error('No post ID found in localStorage.');
}

async function fetchPostById(postId) {
    const API_URL = `https://api.noroff.dev/api/v1/social/posts/${postId}`;

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

        const post = await response.json();
        displaySinglePost(post);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

function displaySinglePost(post) {
    const postContainer = document.getElementById('singlePostContainer');
    postContainer.innerHTML = ''; // Clear previous post content

    // Check for media
    let mediaContent = '';
    if (post.media) {
        mediaContent = `<img src="${post.media}" alt="Post media" class="img-fluid mb-3">`;
    }

    // Convert tags into a string format
    const tagsString = post.tags.join(', ');

    postContainer.innerHTML = `
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
}

document.addEventListener('DOMContentLoaded', function() {
    fetchPostById();
});
