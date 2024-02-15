let bookmarksData = [];

// set an event listen for whenever a page loads and this will help us always graph the update LS data
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('bookmarks')) {
    bookmarksData = JSON.parse(localStorage.getItem('bookmarks'));

  }
  displayBookmarks();
});

document.getElementById('bookmarkForm').addEventListener('submit', (event) => {
  event.preventDefault();
  // grab values from the inputs
  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  // bookmark data to be submited
  const bookmark = {
    id: Date.now(),
    name: siteName,
    url: siteUrl
  };

  // Call the function of addBookmark 
  addBookmark(bookmark);
});

const addBookmark = (bookmark) => {
  // functionalities of adding a bookmark
  bookmarksData.push(bookmark);
  // store the updated bookmarksData in the LS
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksData));
  displayBookmarks();
};

// display bookmarks function
const displayBookmarks = () => {
  // define a bookmarksList for our ul
  let bookmarksList = document.querySelector('.bookmarks');
  // show message when we do not have bookmarks
  if (bookmarksData.length === 0) {
    bookmarksList.innerHTML = 'You do not have bookmarks yet';
    return;
  } else {
    bookmarksList.innerHTML = "";
  }


  bookmarksData.map((bookmark) => {
    let bookmarkElement = document.createElement('li');
    bookmarkElement.classList.add('bookmark');
    bookmarkElement.innerHTML = `
                    <h3>${bookmark.name}</h3>
                    <p>
                      <a href="${bookmark.url}" target="_blank">Visit the bookmark</a>
                    </p>
                    <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
                    <button onclick="navigateToEditForm(${bookmark.id})">Edit</button>
                    `;

    // append the new element so that it can display
    bookmarksList.appendChild(bookmarkElement);
  });

};

// delete bookmark function
const deleteBookmark = (id) => {
  // functionalities of deleting a bookmark
  bookmarksData = bookmarksData.filter((bookmark) => {
    return bookmark.id !== id;
  });

  localStorage.setItem('bookmarks', JSON.stringify(bookmarksData));
  displayBookmarks();
};


// navigate to edit bookmark form 
const navigateToEditForm = (id) => {
  window.location.href = `editBookmark.html?id=${id}` 
  //  window.location.href ='editBookmark.html?id=' + id
}