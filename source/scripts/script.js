// Seleccionar imágenes
const images = document.querySelectorAll('.gallery__image');
// Eventos para ampliar imágenes
for (let image of images) { image.addEventListener('click', showImage); }
// Mostrar imágenes
function showImage(img) {
  // Seleccionando los elementos
  const body = document.querySelector('body');
  // Creando un div con la clase overlay
  const overlay = document.createElement('div');
  overlay.classList.toggle('overlay');
  // Seleccionando las imágenes para mostrarlas
  const image = document.createElement('img');
  // Creando la imágen
  image.src = img.target.src;
  image.alt = img.target.alt;
  image.width = 300;
  image.height = 200;
  image.loading = 'lazy';
  image.fetchPriority = 'high';
  image.decoding = 'async';
  // Enlazando al overlay la imágen
  overlay.appendChild(image)
  // Enlazando al body el overlay
  body.appendChild(overlay);
  // Eliminar el overlay apenas toque la pantalla
  overlay.addEventListener('click', function () { overlay.remove(); })
}