// Initialize bookmarksData as an empty array
let bookmarksData = [];

// Fetch bookmarks from the backend when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchBookmarks();
});

// Event listener for submitting the bookmark form
document.getElementById('bookmarkForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const siteName = document.getElementById('siteName').value.trim();
  const siteUrl = document.getElementById('siteUrl').value.trim();

  // Basic input validation
  if (!siteName || !siteUrl) {
    alert('Please provide both a name and a URL for the bookmark.');
    return;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  await addBookmark(bookmark);
});


// Function to display bookmarks
const displayBookmarks = () => {
  let bookmarksList = document.querySelector('.bookmarks');
  bookmarksList.innerHTML = "";

  if (!Array.isArray(bookmarksData) || bookmarksData.length === 0) {
    bookmarksList.innerHTML = 'You do not have bookmarks yet';
    return;
  }

  bookmarksData.forEach((bookmark) => {
    let bookmarkElement = createBookmarkElement(bookmark);
    bookmarksList.appendChild(bookmarkElement);
  });
};

// Function to create a bookmark element
const createBookmarkElement = (bookmark) => {
  let bookmarkElement = document.createElement('li');
  bookmarkElement.classList.add('bookmark');
  bookmarkElement.innerHTML = `
    <h3>${bookmark.name}</h3>
    <p>
      <a href="${bookmark.url}" target="_blank">Visit the bookmark</a>
    </p>
    <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
    <button onclick="navigateToEditForm('${bookmark._id}')">Edit</button>
  `;
  return bookmarkElement;
};

// Function to fetch bookmarks from the backend
const fetchBookmarks = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      throw new Error('Token not found in localStorage');
    }

    // Fetch bookmarks with the token included in the request headers
    const response = await fetch('http://localhost:8081/bookmarks', {
      headers: {
        'Authorization': `${token}`
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }

    // Extract bookmarks data from the response
    const dataObj = await response.json();
    bookmarksData = dataObj.data;
    displayBookmarks();
  } catch (error) {
    console.error('Error while fetching bookmarks:', error);
  }
};


// Function to add a bookmark
const addBookmark = async (bookmark) => {
  try {
    const response = await fetch('http://localhost:8081/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookmark)
    });
    if (!response.ok) {
      throw new Error('Failed to add bookmark');
    }
    fetchBookmarks(); // Refresh bookmarks after adding
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
  }
};



// Function to delete a bookmark
const deleteBookmark = async (id) => {
  try {
    const response = await fetch(`http://localhost:8081/bookmarks/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete bookmark');
    }
    fetchBookmarks(); // Refresh bookmarks after deleting
  } catch (error) {
    console.error('Error deleting bookmark:', error.message);
  }
};


// Function to navigate to the edit bookmark form
const navigateToEditForm = (id) => {
  window.location.href = `editBookmark.html?id=${id}`;
};
