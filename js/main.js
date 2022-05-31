var $photoUrlInput = document.getElementById('photo-url');
var $entryImage = document.querySelector('.entry-image');
function updatePhoto(event) {
  var url = event.target.value;
  $entryImage.setAttribute('src', url);
}

$photoUrlInput.addEventListener('input', updatePhoto);
