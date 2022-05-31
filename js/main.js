var $photoUrlInput = document.getElementById('photo-url');
var $entryImage = document.querySelector('.entry-image');
function updatePhoto(event) {
  var url = event.target.value;
  $entryImage.setAttribute('src', url);
}
$photoUrlInput.addEventListener('input', updatePhoto);

var $saveButton = document.querySelector('.save-button');
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
}

$saveButton.addEventListener('submit', clickSaveButton);
