const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('show');
    hamButton.setAttribute('aria-expanded', isOpen);
});
