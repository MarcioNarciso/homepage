window.onload = (event) => {
    /**
     * Exibe todas seções quando a página está totalmente carregada.
     */
    showInterface();

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
    const loadingMsg = document.querySelector('#home .text .loading-msg');
    const welcomeMsg = document.querySelector('#home .text .welcome-msg');
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    const sections = document.querySelectorAll('.section:not(#home)');
    const goToNextSectionBtn = document.querySelector('.go-to-next-section');

    loadingMsg.style.display = 'none';

    welcomeMsg.classList.add('show');
    header.classList.add('show');
    goToNextSectionBtn.classList.add('show');
    body.style.overflow = 'auto';

    for (const section of sections) {
        section.classList.add('show');
    }

    // Exibe uma mensagem antes do nome na home page
    showSlogan();
    // Exibe meu nome na home page
    showMyName();
}

function showSlogan() {
    // const welcomeMsg = document.querySelector('#home .text .welcome-msg');
    const slogan = document.querySelector('#home .text .slogan');

    // setTimeout(() => {
        slogan.classList.add('show');


    // }, 2000);
}

function showMyName() {
    const myName = document.querySelector('#home .text .my-name');
    const buttonOnHome = document.querySelector('#home .button');

    // setTimeout(() => {
        myName.classList.add('show');
        buttonOnHome.classList.add('show');
    // }, 4000);
}

/**
 * Ativa o menu conforme a seção visível na página.
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

