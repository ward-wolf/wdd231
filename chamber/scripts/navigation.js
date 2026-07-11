// Navigation hamburger button and listener

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("show");
    hamButton.setAttribute("aria-expanded", isOpen);
});

// Mark whichever nav link matches the current page as "current"

const navLinks = document.querySelectorAll(".navigation a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === currentPage;
    link.parentElement.classList.toggle("current", isCurrent);
});
