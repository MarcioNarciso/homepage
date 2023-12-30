/**
 * Slider das redes sociais.
 */
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination'
    },
    keyboard: true
});

function backToTop() {
    const backToTopButton = document.querySelector(".back-to-top");

    if (window.scrollY >= 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
}

function showInterface() {
    const loadingMsg = document.querySelector('#home .text .loading-msg');
    const welcomeMsg = document.querySelector('#home .text .welcome-msg');
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    const sections = document.querySelectorAll('.section:not(#home)');

    loadingMsg.style.display = 'none';
    welcomeMsg.classList.add('show');
    header.classList.add('show');
    body.style.overflow = 'auto';

    for (const section of sections) {
        section.classList.add('show');
    }
            
    // Exibe uma mensagem antes do nome na home page
    showSlogan();
}

function showSlogan() {
    const welcomeMsg = document.querySelector('#home .text .welcome-msg');
    const slogan = document.querySelector('#home .text .slogan');

    setTimeout(() => {
        welcomeMsg.style.display = 'none';
        slogan.classList.add('show');

        // Exibe meu nome na home page
        showMyName();
    }, 2000);
}

function showMyName() {
    const slogan = document.querySelector('#home .text .slogan');
    const myName = document.querySelector('#home .text .my-name');

    setTimeout(() => {
        slogan.style.display = 'none';
        myName.classList.add('show');
    }, 4000);
}

window.onload = (event) => {
    /**
     * Exibe todas seções quando a página está totalmente carregada.
     */
    showInterface();

    window.onscroll = () => {
        backToTop();
    };
}

