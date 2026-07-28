// Wire up prev/next arrows for a mobile carousel of <figure> elements

function setupCarousel(carouselSelector, gridSelector) {
    const carousel = document.querySelector(carouselSelector);

    if (!carousel) {
        return;
    }

    const figures = carousel.querySelectorAll(`${gridSelector} figure`);
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    if (!figures.length || !prevButton || !nextButton) {
        return;
    }

    let currentIndex = 0;

    function showFigure(index) {
        figures.forEach((figure, i) => {
            figure.classList.toggle("active", i === index);
        });
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + figures.length) % figures.length;
        showFigure(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % figures.length;
        showFigure(currentIndex);
    });
}

setupCarousel(".success-carousel", ".success-grid");
