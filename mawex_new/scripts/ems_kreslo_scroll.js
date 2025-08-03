document.querySelectorAll('.ems-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const targetId = btn.getAttribute('data-target');
    const target = document.getElementById(targetId);

    // Neprepínaj display!
    if (target.classList.contains('active')) {
      target.classList.remove('active');
      btn.classList.remove('active');
    } else {
      target.classList.add('active');
      btn.classList.add('active');
    }
  });
});

// Pridaj šípky na pravú stranu buttonov (ak ešte nie sú)
document.querySelectorAll('.ems-btn').forEach(btn => {
  if (!btn.querySelector('.ems-arrow')) {
    btn.insertAdjacentHTML('beforeend', '<span class="ems-arrow">&#9654;</span>');
  }
});

// Po načítaní stránky automaticky vyroluj vybrané sekcie a ich buttony
window.addEventListener('DOMContentLoaded', () => {
  ['ems-problemy', 'ems-zeny', 'ems-muzi'].forEach(id => {
    const section = document.getElementById(id);
    const btn = document.querySelector(`.ems-btn[data-target="${id}"]`);
    if (section && btn) {
      section.classList.add('active');
      btn.classList.add('active');
    }
  });
});