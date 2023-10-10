const API_BASE_URL = 'https://api.noroff.dev';
const token = localStorage.getItem('accessToken');

// Function to create a new post
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

// Function to fetch and display posts
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

function displayPosts(posts) {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = ''; // Clear previous posts

  posts.forEach(post => {
      const postElement = document.createElement('a');
      postElement.href = 'single-post.html'; // this is where the user will be navigated on clicking
      postElement.dataset.id = post.id;      // store the post's ID as a data attribute
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

fetchAndDisplayPosts();

document.getElementById('createPostForm').addEventListener('submit', function(event) {
  event.preventDefault();
  createPost();
});
