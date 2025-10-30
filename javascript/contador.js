// 'EventListener' que executa o código automaticamente quando o HTML carregar.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona todos os elementos que têm a classe .counter
    const counters = document.querySelectorAll('.counter');
    
    // Se não houver contadores, não faz nada
    if (counters.length === 0) return; 

    // 2. A função que anima o número (Lógica interna inalterada)
    const animateCounter = (element) => {
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

    // 3. Configurações e Lógica do IntersectionObserver (Inalterado)
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
    
    // 4. Manda o Observer "assistir" cada um dos contadores (Inalterado)
    counters.forEach(counter => {
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        counter.innerText = prefix + '0' + suffix;

        observer.observe(counter);
    });

}); // <- Chave de fechamento do 'DOMContentLoaded'