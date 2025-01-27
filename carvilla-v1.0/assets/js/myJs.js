document.addEventListener("DOMContentLoaded", function () {
    var dropdowns = document.querySelectorAll(".dropdown-btn");

    dropdowns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.classList.contains("show")) {
                content.classList.remove("show");
                content.style.maxHeight = null;
            } else {
                content.classList.add("show");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});