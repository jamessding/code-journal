/* global data */
var $photoUrlInput = document.getElementById('photo-url');
var $entryImage = document.getElementById('placeholder');
function updatePhoto(event) {
  var url = event.target.value;
  $entryImage.setAttribute('src', url);
}
$photoUrlInput.addEventListener('input', updatePhoto);

var $form = document.querySelector('.form');
var $editForm = document.querySelector('.edit-form');
function clickSaveButton(event) {
  event.preventDefault();
  var entryObject = {};
  entryObject.entryId = data.nextEntryId;
  entryObject.photoUrl = $form.elements.photoUrl.value;
  entryObject.title = $form.elements.title.value;
  entryObject.notes = $form.elements.notes.value;
  data.nextEntryId++;
  data.entries.unshift(entryObject);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  renderEntry(entryObject);
  viewEntries();
}
$form.addEventListener('submit', clickSaveButton);
$editForm.addEventListener('submit', clickSaveButton);

var $entryList = document.querySelector('.entry-list');
function renderEntry(entryObject) {
  var li = document.createElement('li');
  li.setAttribute('data-entry-id', entryObject.entryId);
  $entryList.prepend(li);
  var rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  li.appendChild(rowDiv);
  var colDiv = document.createElement('div');
  colDiv.className = 'column-half';
  rowDiv.appendChild(colDiv);
  var img = document.createElement('img');
  img.className = 'entry-image';
  img.setAttribute('src', entryObject.photoUrl);
  colDiv.appendChild(img);
  var secondColDiv = document.createElement('div');
  secondColDiv.className = 'column-half';
  rowDiv.appendChild(secondColDiv);
  var secondRowDiv = document.createElement('div');
  secondRowDiv.className = 'row';
  secondColDiv.appendChild(secondRowDiv);
  var rowHalfDiv = document.createElement('div');
  rowHalfDiv.className = 'row-half';
  secondRowDiv.appendChild(rowHalfDiv);
  var h3 = document.createElement('h3');
  h3.textContent = entryObject.title;
  rowHalfDiv.appendChild(h3);
  var secondRowHalfDiv = document.createElement('div');
  secondRowHalfDiv.className = 'row-half';
  secondRowDiv.appendChild(secondRowHalfDiv);
  var a = document.createElement('a');
  secondRowHalfDiv.appendChild(a);
  var icon = document.createElement('i');
  icon.className = 'fa-solid fa-pencil right purple margin-top';
  icon.setAttribute('data-entry-id', entryObject.entryId);
  a.appendChild(icon);
  var p = document.createElement('p');
  p.textContent = entryObject.notes;
  secondColDiv.appendChild(p);
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    renderEntry(data.entries[i]);
  }
});

var $entries = document.getElementById('entries');
var $views = document.querySelectorAll('.view');
function viewEntries(event) {
  for (var j = 0; j < $views.length; j++) {
    if ($views[j].getAttribute('data-view') !== 'entries') {
      $views[j].className = 'views hidden';
    } else {
      $views[j].className = 'views';
    }
  }
  data.view = 'entries';
}
$entries.addEventListener('click', viewEntries);

var $newButton = document.querySelector('.new');
function viewNewEntry(event) {
  for (var k = 0; k < $views.length; k++) {
    if ($views[k].getAttribute('data-view') !== 'entry-form') {
      $views[k].className = 'views hidden';
    } else {
      $views[k].className = 'views';
    }
  }
  data.view = 'entry-form';
}
$newButton.addEventListener('click', viewNewEntry);

function viewEditNewEntry(event) {
  for (var k = 0; k < $views.length; k++) {
    if ($views[k].getAttribute('data-view') !== 'edit-entry-form') {
      $views[k].className = 'views hidden';
    } else {
      $views[k].className = 'views';
    }
  }
  data.view = 'edit-entry-form';
}
$entryList.addEventListener('click', viewEditNewEntry);

function currentView(event) {
  if (data.view === 'entries') {
    viewEntries();
  } else if (data.view === 'entry-form') {
    viewNewEntry();
  } else if (data.view === 'edit-entry-form') {
    viewEditNewEntry();
  }
}
window.addEventListener('DOMContentLoaded', currentView);

var $editEntryImage = document.getElementById('edit-placeholder');
function editEntry(event) {
  var editEntryId = event.target.getAttribute('data-entry-id');
  if (editEntryId !== null) {
    viewEditNewEntry();
    data.editing = data.entries[data.entries.length - editEntryId];
    $editEntryImage.setAttribute('src', data.editing.photoUrl);
    $editForm.elements.photoUrl.value = data.editing.photoUrl;
    $editForm.elements.title.value = data.editing.title;
    $editForm.elements.notes.value = data.editing.notes;
  }
}

$entryList.addEventListener('click', editEntry);
