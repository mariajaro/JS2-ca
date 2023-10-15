/**
 * Updates a post using the provided post ID, post data, and token.
 * 
 * @async
 * @function
 * @param {string} postId - The ID of the post to update.
 * @param {Object} postData - The updated post data.
 * @param {string} token - The authorization token.
 * @returns {Object} The updated post.
 * @throws Will throw an error if the request fails.
 */
export async function updatePost(postId, postData, token) {    
    const API_URL = `https://api.noroff.dev/api/v1/social/posts/${postId}`;

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse;

    } catch (error) {
        console.error('Error updating the post:', error);
        throw error;
    }
}
