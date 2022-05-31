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
  var entryObject = {};
  entryObject.entryId = data.nextEntryId;
  entryObject.photoUrl = $form.elements.photoUrl.value;
  entryObject.title = $form.elements.title.value;
  entryObject.notes = $form.elements.notes.value;
  data.nextEntryId++;
  data.entries.unshift(entryObject);
  $photoUrlInput.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  renderEntry(entryObject);
}

$form.addEventListener('submit', clickSaveButton);

function renderEntry(entryObject) {
  var $outerDiv = document.querySelector('.create-entry');
  var rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  $outerDiv.appendChild(rowDiv);
  var colDiv = document.createElement('div');
  colDiv.className = 'column-half';
  rowDiv.appendChild(colDiv);
  var ul = document.createElement('ul');
  colDiv.appendChild(ul);
  var li = document.createElement('li');
  ul.appendChild(li);
  var img = document.createElement('img');
  img.className = 'entry-image';
  img.src = entryObject.photoUrl;
  li.appendChild(img);
  var secondColDiv = document.createElement('div');
  secondColDiv.className = 'column-half';
  rowDiv.appendChild(secondColDiv);
  var secondUl = document.createElement('ul');
  secondColDiv.appendChild(secondUl);
  var secondLi = document.createElement('li');
  secondUl.appendChild(secondLi);
  var h3 = document.createElement('h3');
  h3.textContent = entryObject.title;
  secondLi.appendChild(h3);
  var thirdLi = document.createElement('li');
  secondUl.appendChild(thirdLi);
  var p = document.createElement('p');
  p.textContent = entryObject.notes;
  thirdLi.appendChild(p);
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
});
