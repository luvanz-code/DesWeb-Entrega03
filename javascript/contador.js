// 1. FUNÇÃO PARA ANIMAR O CONTADOR
    const animateCounter = (el) => {
        // Pega os dados do elemento
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000; // Duração da animação em milissegundos (2 segundos)
        const prefix = el.dataset.prefix || ''; // Pega o prefixo (ex: "+") ou usa ""
        const suffix = el.dataset.suffix || ''; // Pega o sufixo (ex: "+") ou usa ""
        
        let startTime = null;

        // Função de animação (passo a passo)
        const step = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }

            // Calcula o progresso da animação (de 0 a 1)
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Calcula o valor atual baseado no progresso
            const currentValue = Math.floor(progress * target);
            
            // Formata o número para o padrão brasileiro (ex: 15000 -> 15.000)
            const formattedValue = currentValue.toLocaleString('pt-BR');
            
            // Atualiza o HTML do elemento
            el.innerText = prefix + formattedValue + suffix;

            // Continua a animação se o progresso for menor que 1
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        // Inicia a animação
        window.requestAnimationFrame(step);
    };

    
    // 2. INTERSECTION OBSERVER PARA INICIAR A ANIMAÇÃO QUANDO VISÍVEL
    
    // Seleciona todos os elementos com a classe "counter"
    const counters = document.querySelectorAll('.counter');

    // Opções do Observer:
    // rootMargin: "margem" ao redor da tela (viewport)
    // threshold: 0.5 = dispara quando 50% do elemento está visível
    const options = {
        rootMargin: '0px',
        threshold: 0.5
    };

    // O Callback do observer
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento (entry) está visível (isIntersecting)
            if (entry.isIntersecting) {
                // Inicia a animação para esse elemento
                animateCounter(entry.target);
                
                // Para de "observar" este elemento (para não animar de novo)
                observer.unobserve(entry.target);
            }
        });
    };
    // Cria o observer
    const observer = new IntersectionObserver(callback, options);
    // Faz o observer "observar" cada um dos contadores
    counters.forEach(counter => {
        observer.observe(counter);
    });