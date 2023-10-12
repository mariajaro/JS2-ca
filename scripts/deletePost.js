export async function deletePost(postId) {
  const API_URL = `https://api.noroff.dev/api/v1/social/posts/${postId}`;
  const token = localStorage.getItem('accessToken');

  try {
      const response = await fetch(API_URL, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Post deleted successfully!");
      fetchAndDisplayPosts();
  } catch (error) {
      console.error('Error deleting the post:', error);
  }
}
