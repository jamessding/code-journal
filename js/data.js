/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
  darkMode: false
};

var previousDataJSON = localStorage.getItem('data-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
