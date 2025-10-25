/* === Conteúdo para: ../javascript/contador.js === */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona todos os elementos que têm a classe .counter
    const counters = document.querySelectorAll('.counter');

    // 2. A função que anima o número
    const animateCounter = (element) => {
        const target = +element.getAttribute('data-target'); // O número final
        const prefix = element.getAttribute('data-prefix') || ''; // O "+" (opcional)
        const suffix = element.getAttribute('data-suffix') || ''; // O "+" (opcional)
        const duration = 2000; // Duração da animação em milissegundos (ex: 2 segundos)
        
        const frameRate = 1000 / 60; // 60 frames por segundo
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;

        let current = 0;

        const updateCount = () => {
            current += increment;

            if (current >= target) {
                // Ao terminar, exibe o número final formatado
                // .toLocaleString('pt-BR') formata 15000 para "15.000"
                element.innerText = prefix + target.toLocaleString('pt-BR') + suffix;
            } else {
                // Durante a animação, exibe o número atual arredondado
                element.innerText = prefix + Math.ceil(current).toLocaleString('pt-BR') + suffix;
                // Chama a próxima "pintura" de tela
                requestAnimationFrame(updateCount);
            }
        };

        // Inicia a animação
        requestAnimationFrame(updateCount);
    };

    // 3. Configurações do IntersectionObserver
    const options = {
        root: null, // Observa em relação à viewport inteira
        rootMargin: '0px',
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    };

    // 4. O "Ouvinte" que será chamado
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            // entry.isIntersecting é 'true' quando o elemento entra na tela
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                
                // Inicia a animação para aquele elemento
                animateCounter(counterElement);
                
                // Para de "assistir" este elemento, para a animação não repetir
                observer.unobserve(counterElement);
            }
        });
    };

    // 5. Cria e inicia o Observer
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Manda o Observer "assistir" cada um dos contadores
    counters.forEach(counter => {
        // Inicia o contador com 0 (como no seu HTML original)
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        counter.innerText = prefix + '0' + suffix;

        // Começa a observar
        observer.observe(counter);
    });

});