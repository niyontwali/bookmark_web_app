document.addEventListener('DOMContentLoaded', async () => {
  // get our id from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  try {
    // Fetch the bookmark data corresponding to the provided ID from the backend
    const response = await fetch(`http://localhost:8081/bookmarks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bookmark for editing');
    }

    const resObj = await response.json()
    const bookmarkToUpdate = resObj.data;

    // Populate the edit form with the fetched bookmark data
    document.getElementById('editSiteName').value = bookmarkToUpdate.name;
    document.getElementById('editSiteUrl').value = bookmarkToUpdate.url;
  } catch (error) {
    console.error('Error fetching bookmark for editing:', error);
  }

  // Add event listener for the edit form submission
  document.getElementById('editBookmarkForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const siteName = document.getElementById('editSiteName').value;
    const siteUrl = document.getElementById('editSiteUrl').value;

    const updatedBookmark = {
      name: siteName,
      url: siteUrl
    };

    try {
      // Update the bookmark with the new data
      const response = await fetch(`http://localhost:8081/bookmarks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBookmark)
      });

      if (!response.ok) {
        throw new Error('Failed to update bookmark');
      }

      // Redirect to the bookmarks page after successful update
      window.location.href = 'bookmarks.html';
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  });
});
