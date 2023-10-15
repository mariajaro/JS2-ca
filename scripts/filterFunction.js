/**
 * Base URL for the API.
 * @constant {string}
 */
const API_BASE_URL = 'https://api.noroff.dev';

/**
 * Fetches posts based on provided filters.
 *
 * @export
 * @param {string} [tag=null] - Tag to filter posts by.
 * @param {boolean} [isActive=true] - Flag to filter only active posts.
 * @returns {Promise<Array>} - A promise that resolves to an array of filtered posts.
 * @throws Will throw an error if the request fails.
 */
export async function fetchPostsFiltered(tag = null, isActive = true) {
    let url = `${API_BASE_URL}/api/v1/social/posts`;

    if (tag || isActive !== null) {
        url += "?";
        if (tag) {
            url += `_tag=${tag}&`;
        }
        if (isActive !== null) {
            url += `_active=${isActive}`;
        }
    }

    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching filtered posts:", error);
        return [];
    }
}
