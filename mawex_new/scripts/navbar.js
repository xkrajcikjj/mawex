document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");
  const dropdown = document.querySelector(".dropdown");
  const dropbtn = document.querySelector(".dropbtn");

  navToggle.addEventListener("click", function () {
    navbar.classList.toggle("active");
    // Pri otvorení hamburgeru zavri dropdown
    dropdown.classList.remove("open");
  });

  // Dropdown funguje na klik (desktop aj mobil)
  dropbtn.addEventListener("click", function (e) {
    e.preventDefault();
    dropdown.classList.toggle("open");
  });

  // Zavrie dropdown pri kliknutí mimo
  document.addEventListener("click", function (e) {
    if (
      !dropdown.contains(e.target) &&
      !dropbtn.contains(e.target)
    ) {
      dropdown.classList.remove("open");
    }
  });

  // Sticky efekt pri skrolovaní
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});