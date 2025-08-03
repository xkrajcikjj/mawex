// Získaj všetky obrázky z galérií
const allGalleryImages = Array.from(document.querySelectorAll('.ems-gallery-img'));

// Vytvor modal
const modal = document.createElement('div');
modal.className = 'ems-modal';
modal.innerHTML = `
  <div class="ems-modal-content">
    <button class="ems-modal-close" title="Zavrieť">&times;</button>
    <button class="ems-modal-prev" title="Predchádzajúci">&#8592;</button>
    <img class="ems-modal-img" src="" alt="Veľký obrázok" />
    <button class="ems-modal-next" title="Ďalší">&#8594;</button>
  </div>
`;
document.body.appendChild(modal);

// Získaj elementy modalu
const modalImg = modal.querySelector('.ems-modal-img');
const closeBtn = modal.querySelector('.ems-modal-close');
const prevBtn = modal.querySelector('.ems-modal-prev');
const nextBtn = modal.querySelector('.ems-modal-next');

let currentIndex = 0;
let currentGallery = [];

// Funkcie pre ovládanie modalu
function openModal(index, gallery) {
  // Filtrovanie obrázkov podľa galérie
  currentGallery = allGalleryImages.filter(img => 
    img.getAttribute('data-gallery') === gallery
  );
  
  currentIndex = index;
  modalImg.src = currentGallery[index].src;
  modalImg.alt = currentGallery[index].alt;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Zakáž scrollovanie
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Povolí scrollovanie
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  modalImg.src = currentGallery[currentIndex].src;
  modalImg.alt = currentGallery[currentIndex].alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  modalImg.src = currentGallery[currentIndex].src;
  modalImg.alt = currentGallery[currentIndex].alt;
}

// Event listenery pre obrázky
allGalleryImages.forEach((img, globalIndex) => {
  img.addEventListener('click', () => {
    const gallery = img.getAttribute('data-gallery');
    const localIndex = parseInt(img.getAttribute('data-index'));
    openModal(localIndex, gallery);
  });
});

// Event listenery pre ovládanie modalu
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Zatvorenie klikom mimo obsahu
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Klávesové skratky
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;
  
  switch(e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowLeft':
      showPrev();
      break;
    case 'ArrowRight':
      showNext();
      break;
  }
});

// Animácia pri načítaní stránky
document.addEventListener('DOMContentLoaded', () => {
  // Pozoruj, kedy sa galérie dostanú do viewport
  const galleries = document.querySelectorAll('.ems-gallery');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    });
  });
  
  galleries.forEach(gallery => {
    observer.observe(gallery);
  });
});