import { updatePost } from './updatePost.js';
import { deletePost } from './deletePost.js';

const API_BASE_URL = 'https://api.noroff.dev';
const token = localStorage.getItem('accessToken');
const postId = localStorage.getItem('currentPostId');

let currentPost = null;

if (postId) {
    fetchPostById(postId);
} else {
    console.error('No post ID found in localStorage.');
}

async function fetchPostById(postId) {
    const API_URL = `${API_BASE_URL}/api/v1/social/posts/${postId}`;

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

        currentPost = await response.json();
        displaySinglePost(currentPost);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

function displaySinglePost(post) {
    const postContainer = document.getElementById('singlePostContainer');
    postContainer.innerHTML = '';

    let mediaContent = '';
    if (post.media) {
        mediaContent = `<img src="${post.media}" alt="Post media" class="img-fluid mb-3">`;
    }

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
        <button onclick="handleEditButtonClick()" class="btn btn-primary mt-2">Edit</button>
        <button onclick="handleDeleteButtonClick(${post.id})" class="btn btn-danger mt-2 ml-2">Delete</button>
    `;
}

window.handleEditButtonClick = function() {
    if (currentPost) {
        document.getElementById('editPostTitle').value = currentPost.title;
        document.getElementById('editPostBody').value = currentPost.body;
    }
    var modal = new bootstrap.Modal(document.getElementById('editPostModal'));
    modal.show();
}

window.submitEdit = async function() {
    const title = document.getElementById('editPostTitle').value;
    const body = document.getElementById('editPostBody').value;

    let postData = {
        title: title,
        body: body,
    };

    try {
        const updatedPost = await updatePost(postId, postData, token);
        location.reload();
    } catch(error) {
        console.error("Error updating post:", error);
    }
}

window.handleDeleteButtonClick = async function(postId) {
    try {
        const response = await deletePost(postId);
        window.location.href = 'feed.html';
    } catch(error) {
        console.error("Error deleting post:", error);
    }
};