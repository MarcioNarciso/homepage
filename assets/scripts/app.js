window.onload = (event) => {
    /**
     * Exibe todas seções quando a página está totalmente carregada.
     */
    setTimeout(showInterface, 500);

    /**
     * Fechamento do menu mobile ao clicar nos menus.
     */
    initMenuButtons();

    /**
     * Habilita o toque nos cards das skills
     */
    initSkillsCards();

    /**
     * Evento de quando a página é rolada.
     */
    window.onscroll = () => {
        backToTop();
        goToNextSection();
        activeMenuAtCurrentSection();
    };

    window.onresize = () => {

    }

    // Elementos que receberão animação quando a página for rolada
    const contents = document.querySelectorAll("main section[id]:not(#home) .container");
    const loop = animateElementsOnScroll(contents, 'is-visible');
    loop();
}

/**
 * Slider das redes sociais.
 */
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination'
    },
    keyboard: true,
    breakpoints: {
        992: {
            slidesPerView: 2,
            setWrapperSize: true
        }
    }
});

const menuMobile = document.querySelector("#header .menu");

function openMenu() {
    menuMobile.classList.add('show');
}

function closeMenu() {
    menuMobile.classList.remove('show');
}

function backToTop() {
    const backToTopButton = document.querySelector(".back-to-top");

    if (window.scrollY >= 300) { 
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    } 
}

function goToNextSection() {
    const goToNextSectionBtn = document.querySelector('.go-to-next-section');

    if (window.scrollY >= 600) {
        goToNextSectionBtn.classList.remove('show');
    } else {
        goToNextSectionBtn.classList.add('show');

    }
}

function initMenuButtons() {
    const buttons = document.querySelectorAll(".close-menu");
    for(const button of buttons) {
        button.addEventListener('click', closeMenu);
    }
}

function initSkillsCards() {
    const flipperCards = document.getElementsByClassName("card flipper");
    for (const flipper of flipperCards) {
        flipper.addEventListener('touchstart', (e) => {
            flipper.classList.toggle('flip');
        });
    }
}

function showInterface() {
    const loadingMsg = document.querySelector('.loading-msg');
    const body = document.querySelector('body');
    const contents = body.querySelectorAll("main, #header, footer");
    const goToNextSectionBtn = document.querySelector('.go-to-next-section');
    const mainSectionContainer = body.querySelector("main #home .container");

    loadingMsg.style.display = 'none';

    for (const section of contents) {
        section.classList.add('show');
    }

    body.style.overflow = 'auto';
    goToNextSectionBtn.classList.add('show');
    mainSectionContainer.classList.add('is-visible');
}

/**
 * Ativa o menu conforme a seção visível na página.
 * É traçada uma linha imaginária no meio da tela e verifica qual seção está em
 * cima dessa linha no momento.
 */
function activeMenuAtCurrentSection() {
    const sections = document.querySelectorAll("main section[id]");
    const userViewingArea = window.pageYOffset + (window.innerHeight / 8) * 4;
    let sectionPositionStart = 0;
    let sectionPositionEnd = 0;
    let sectionId = null;
    let isSectionStartInsideView = false;
    let isSectionEndInsideView = false;
    let isUserSeeing = false;
    let sectionMenu = null;

    for(const section of sections) {
        sectionPositionStart = section.offsetTop;
        sectionPositionEnd = sectionPositionStart + section.offsetHeight;
        sectionId = section.getAttribute('id');

        isSectionStartInsideView = userViewingArea >= sectionPositionStart;
        isSectionEndInsideView = userViewingArea <= sectionPositionEnd;

        isUserSeeing = isSectionStartInsideView && isSectionEndInsideView;

        sectionMenu = document.querySelector('#header nav ul li a[href*="'+sectionId+'"]');

        if (isUserSeeing) {
            sectionMenu.classList.add('active');
        } else {
            sectionMenu.classList.remove('active');
        }
    }
}

