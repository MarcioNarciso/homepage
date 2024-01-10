/**
 * Armazena a referência à função que executada as verificações do elemento visível.
 */
const scroll = window.requestAnimationFrame
                || function (callback) { window.setTimeout(callback, 1000/60) };

/**
 * Determina se o elemento "el" está no viewport.
 * @param {Element} el 
 * @returns boolean
 */
function isElementInViewport(el) {
    /**
     * Retorna um DOMRect. Representação retangular do elemento 
     * descrevendo seu tamanho e posiçao relativa ao topo 
     * (limite superior da área visível) do viewport.
     */
    const rect = el.getBoundingClientRect();

    /**
     * O tamanho da "área morta" é a área que desconsiderei no viewport.
     */
    const deadAreaSize = window.innerHeight / 16;

    // O topo do elemento já saiu da tela, mas a parte inferior ainda está visível.
    const isBottomOfElementVisible = rect.top <= deadAreaSize && rect.bottom >= deadAreaSize;
    // A parte inferior do elemento já saiu da tela, mas o topo ainda está visível
    const isTopOfElementVisible = rect.bottom >= (window.innerHeight - deadAreaSize) 
                                    && rect.top <= (window.innerHeight - deadAreaSize);
    // O elemento está totalmente visível 
    const isElementFullyVisible = rect.top >= deadAreaSize 
                                    && rect.bottom <= (window.innerHeight - deadAreaSize);

    return (
        isBottomOfElementVisible || isTopOfElementVisible || isElementFullyVisible
    );
}

function animateElementsOnScroll(elmnts, cssClass) {
    function loop() {
        elmnts.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add(cssClass);
            } else {
                el.classList.remove(cssClass);
            }
        });
    
        scroll(loop);
    }

    return loop;
}