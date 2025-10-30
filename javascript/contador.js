/* === Conteúdo para: ../javascript/contador.js === */

// Encapsulamos a lógica para que ela possa ser chamada pelo index.js
window.initializeCounters = () => {

    // 1. Seleciona todos os elementos que têm a classe .counter
    const counters = document.querySelectorAll('.counter');
    
    // Se não houver contadores, não faz nada
    if (counters.length === 0) return; 

    // 2. A função que anima o número (Mantida a lógica interna)
    const animateCounter = (element) => {
        // ... (todo o seu código da função animateCounter, inalterado) ...
        const target = +element.getAttribute('data-target');
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;

        let current = 0;

        const updateCount = () => {
            current += increment;

            if (current >= target) {
                element.innerText = prefix + target.toLocaleString('pt-BR') + suffix;
            } else {
                element.innerText = prefix + Math.ceil(current).toLocaleString('pt-BR') + suffix;
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    };

    // 3. Configurações e Lógica do IntersectionObserver (Mantida a lógica interna)
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                animateCounter(counterElement);
                observer.unobserve(counterElement);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Manda o Observer "assistir" cada um dos contadores
    counters.forEach(counter => {
        // Garante que o contador comece em 0 (opcional, mas bom)
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        counter.innerText = prefix + '0' + suffix;

        observer.observe(counter);
    });

};
// A chamada original `document.addEventListener('DOMContentLoaded', ...)` é removida.
// O index.js agora chama `window.initializeCounters()` quando renderiza a home.