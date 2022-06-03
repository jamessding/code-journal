/* global data */
var $photoUrlInput = document.getElementById('photo-url');
var $entryImage = document.getElementById('placeholder');
function updatePhoto(event) {
  var url = event.target.value;
  $entryImage.setAttribute('src', url);
}
$photoUrlInput.addEventListener('input', updatePhoto);

var $form = document.querySelector('.form');
function clickSaveButton(event) {
  event.preventDefault();
  if (event.submitter.className === 'delete-button') {
    return;
  }
  if (data.editing === null) {
    var entryObject = {};
    entryObject.entryId = data.nextEntryId;
  } else {
    var entryLi = data.editing;
    entryObject = getEntryObject(entryLi);
  }
  entryObject.photoUrl = $form.elements.photoUrl.value;
  entryObject.title = $form.elements.title.value;
  entryObject.notes = $form.elements.notes.value;
  var renderedEntry = renderEntry(entryObject);
  if (data.editing === null) {
    entryList.prepend(renderedEntry);
    data.entries.unshift(entryObject);
    data.nextEntryId++;
  } else {
    entryLi.replaceWith(renderedEntry);
  }
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  viewEntries();
}
$form.addEventListener('submit', clickSaveButton);

function renderEntry(entryObject) {
  var entryLi = document.createElement('li');
  entryLi.setAttribute('data-entry-id', entryObject.entryId);
  entryLi.className = 'entry';
  var rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  entryLi.appendChild(rowDiv);
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
  h3.className = 'entry-title';
  rowHalfDiv.appendChild(h3);
  var secondRowHalfDiv = document.createElement('div');
  secondRowHalfDiv.className = 'row-half right';
  secondRowDiv.appendChild(secondRowHalfDiv);
  var icon = document.createElement('i');
  icon.className = 'fa-solid fa-pencil purple margin-top';
  icon.setAttribute('data-entry-id', entryObject.entryId);
  secondRowHalfDiv.appendChild(icon);
  var p = document.createElement('p');
  p.textContent = entryObject.notes;
  p.className = 'entry-notes';
  secondColDiv.appendChild(p);
  return entryLi;
}

var entryList = document.querySelector('.entry-list');
window.addEventListener('DOMContentLoaded', DOMContentLoaded);
function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    entryList.append(renderEntry(data.entries[i]));
  }
}

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
  data.editing = null;
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

function createEntry(event) {
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $changeTitle.textContent = 'New Entry';
  $deleteButton.className = 'delete-button hidden';
  $form.reset();
}
$newButton.addEventListener('click', createEntry);

function currentView(event) {
  if (data.view === 'entries') {
    viewEntries();
  } else if (data.view === 'entry-form') {
    viewNewEntry();
  }
}
window.addEventListener('DOMContentLoaded', currentView);

var $entryPlaceholder = document.getElementById('placeholder');
var $entryTitle = document.getElementById('title');
var $entryNotes = document.getElementById('notes');
var $entryPhotoUrl = document.getElementById('photo-url');
var $changeTitle = document.querySelector('.change-title');
function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  viewNewEntry();
  $deleteButton.className = 'delete-button';
  $changeTitle.textContent = 'Edit Entry';
  var entryLi = event.target.closest('li');
  data.editing = entryLi;
  var entryObject = getEntryObject(entryLi);
  $entryTitle.value = entryObject.title;
  $entryPhotoUrl.value = entryObject.photoUrl;
  $entryPlaceholder.setAttribute('src', entryObject.photoUrl);
  $entryNotes.value = entryObject.notes;
}
entryList.addEventListener('click', editEntry);

function getEntryObject(entryLi) {
  var entryId = entryLi.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      var entryObject = data.entries[i];
      return entryObject;
    }
  }
}
// set data.editing = null
// splice object at index i of entries array that has entryId equal to current
// remove entry's dom tree from page
// viewEntries();
function deleteEntry(event) {
  var entryLi = data.editing;
  var entryId = entryLi.getAttribute('data-entry-id');
  var $entryNodeList = document.querySelectorAll('.entry');
  for (var i = 0; i < $entryNodeList.length; i++) {
    if (entryId === $entryNodeList[i].getAttribute('data-entry-id')) {
      $entryNodeList[i].remove();
    }
  }
  for (var j = 0; j < data.entries.length; j++) {
    if (entryId === data.entries[j].entryId.toString()) {
      data.entries.splice(j, 1);
    }
  }
  data.editing = null;
  viewEntries();
  $modalContainer.className = 'off-container';
}

var $deleteButton = document.querySelector('.delete-button');
var $modalContainer = document.getElementById('modal-container');
var $buttonCancel = document.querySelector('.button-cancel');
var $buttonConfirm = document.querySelector('.button-confirm');

$deleteButton.addEventListener('click', function (event) {
  $modalContainer.className = 'on-container';
});

$buttonCancel.addEventListener('click', function (event) {
  $modalContainer.className = 'off-container';
});

$buttonConfirm.addEventListener('click', deleteEntry);
