// js related to edit functionalities
// URLSearchParams
document.addEventListener('DOMContentLoaded', () => {
  // get our id from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));

  // get bookmarks from LS
  let bookmarksData = JSON.parse(localStorage.getItem('bookmarks'));

  // get a bookmark that corresponds to the id
  let bookmarkToUpdate = bookmarksData.find((bookmark) => {
    return bookmark.id === id;
  });

  document.getElementById('editSiteName').value = bookmarkToUpdate.name;
  document.getElementById('editSiteUrl').value = bookmarkToUpdate.url;

  /**
   *   implement the functionalities of updating our bookmark* (assignemt)
   */



});