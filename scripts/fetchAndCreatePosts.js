const API_BASE_URL = 'https://api.noroff.dev';
const token = localStorage.getItem('accessToken');
import { fetchPostsFiltered } from './filterFunction.js';


/**
 * Create a new post.
 */ 
async function createPost() {
  const title = document.getElementById('postTitle').value;
  const body = document.getElementById('postBody').value;
  const media = document.getElementById('postMedia').value;

  if(!title) {
      alert("Title is required!");
      return;
  }

  const postData = {
      title: title,
      body: body,
      media: media
  };

  try {
      const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postData)
      });

      if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Post created successfully!");
      fetchAndDisplayPosts();
  } catch(error) {
      console.error("There was an error creating the post:", error);
  }
}

/**
 * Apply post filters.
 */
function applyFilter() {
    const tag = document.getElementById('tagFilter').value;
    const isActive = document.getElementById('activeFilter').checked;

    fetchPostsFiltered(tag, isActive)
        .then(posts => {
            displayPosts(posts);
        });
}

/**
 * Search posts based on a query.
 */
async function searchPosts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    
    if (!searchTerm) {
        fetchAndDisplayPosts();
        return;
    }

    try {
        const allPosts = await fetchAllPosts();
        const filteredPosts = allPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.body.toLowerCase().includes(searchTerm)
        );
        
        displayPosts(filteredPosts); 
    } catch (error) {
        console.error("Error searching posts:", error);
    }
}

/**
 * Fetch all available posts.
 * @returns {Array} Array of posts
 */
async function fetchAllPosts() {
    const API_URL = `${API_BASE_URL}/api/v1/social/posts`;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

/**
 * Fetch and display posts.
 */
async function fetchAndDisplayPosts() {
    const API_URL = `${API_BASE_URL}/api/v1/social/posts`;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
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

/**
 * Render posts to the DOM.
 * @param {Array} posts - Array of posts to display
 */
function displayPosts(posts) {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
      const postElement = document.createElement('a');
      postElement.href = 'single-post.html'; 
      postElement.dataset.id = post.id;   
      postElement.className = 'post mb-4 border p-3 d-block';

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
      postElement.addEventListener('click', function(event) {
          event.preventDefault();
          const postId = this.dataset.id;
          localStorage.setItem('currentPostId', postId);
          window.location.href = 'singlePost.html'; 
      });
      
      postsContainer.appendChild(postElement);
  });
}

// Initial call to fetch and display posts
fetchAndDisplayPosts();

// Event listeners
document.getElementById('createPostForm').addEventListener('submit', function(event) {
  event.preventDefault();
  createPost();
});

document.getElementById('filterButton').addEventListener('click', applyFilter);

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchPosts();
});