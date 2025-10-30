/* === Conteúdo para: ../javascript/index.js === */

// 1. Defina a área onde o conteúdo será injetado
const appContent = document.getElementById('app-content');

// --- 2. TEMPLATES JAVASCRIPT ---

// Template da Página Inicial (conteúdo que estava no index.html original)
const getHomeTemplate = () => `
    <section class="bg-blue-600 text-white text-center py-20 px-6">
        <div class="container mx-auto">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">Transformando Vidas com Água Potável</h2>
            <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Acreditamos que o acesso à água limpa é um direito humano fundamental. Junte-se a nós para levar saúde, dignidade e esperança a comunidades em todo o Brasil.</p>
            <a href="#projetos" data-page="projetos" class="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition hover:bg-blue-700 hover:text-white spa-link">
                Conheça Nossos Projetos
            </a>
        </div>
    </section>
    <section class="py-16 px-6">
        <section class="bg-gray-100 py-16 px-6">
            <div class="container mx-auto text-center">
                <h2 class="text-3xl font-bold mb-12">Nosso Impacto em Números</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <article class="bg-white p-8 rounded-lg shadow-md">
                        <h3 class="counter text-5xl font-bold text-blue-600 mb-2" data-target="15000" data-prefix="+">0</h3>
                        <p class="text-lg text-gray-700">Pessoas com acesso à água potável</p>
                    </article>
                    </div>
            </div>
        </section>
    </section>
`;

// Template da Página de Projetos (Conteúdo do Projetos.html)
const getProjetosTemplate = () => `
    <section class="py-16 px-6">
        <div class="container mx-auto">
            <h2 class="text-4xl font-bold text-blue-600 mb-8 text-center">💧 Nossos Projetos em Andamento</h2>
            <p class="text-lg text-gray-700">Aqui você pode acompanhar as iniciativas...</p>
            </div>
    </section>
`;

// Template da Página de Cadastro (Conteúdo do Cadastro.html)
const getCadastroTemplate = () => `
    <section class="py-16 px-6 bg-blue-50">
        <div class="container mx-auto">
            <h2 class="text-4xl font-bold text-blue-600 mb-8 text-center">🤝 Participe da Nossa Missão</h2>
            <p class="text-lg text-gray-700 text-center mb-10">Preencha o formulário para se voluntariar ou doar.</p>
            </div>
    </section>
`;

// --- 3. LOGICA DE ROTEAMENTO (SPA BÁSICO) ---

// Mapeia a string da página para a função do template
const routes = {
    'home': getHomeTemplate,
    'projetos': getProjetosTemplate,
    'cadastro': getCadastroTemplate
};

function renderPage(pageId) {
    const templateFunction = routes[pageId];

    if (templateFunction) {
        // 1. Manipulação do DOM: Injeta o novo conteúdo no contêiner
        appContent.innerHTML = templateFunction();
        
        // 2. Chama a animação do contador DEPOIS que o HTML for injetado
        if (pageId === 'home' && typeof window.initializeCounters === 'function') {
            window.initializeCounters();
        }

        // 3. Atualiza a URL do navegador sem recarregar (History API)
        const newHash = pageId === 'home' ? '' : `#${pageId}`;
        window.history.pushState(null, '', newHash);

        // 4. Atualiza o estilo do menu de navegação
        updateNav(pageId);
    } else {
        // Tratar página 404
        appContent.innerHTML = '<h2>Página não encontrada</h2>';
    }
}

// Lógica para atualizar qual item do menu está ativo
function updateNav(activePageId) {
    document.querySelectorAll('.spa-link').forEach(link => {
        if (link.dataset.page === activePageId) {
            link.classList.add('font-semibold', 'border-b-2', 'border-blue-600');
        } else {
            link.classList.remove('font-semibold', 'border-b-2', 'border-blue-600');
        }
    });
}

// Gerencia a navegação ao clicar nos links
document.addEventListener('click', (event) => {
    const link = event.target.closest('.spa-link'); // Procura o link clicado
    if (link) {
        event.preventDefault(); // Impede a navegação tradicional (recarga)
        const pageId = link.getAttribute('data-page');
        if (pageId) {
            renderPage(pageId);
        }
    }
});

// Lida com a navegação inicial e com o botão 'voltar' do navegador
window.addEventListener('load', () => {
    const initialPage = window.location.hash.substring(1) || 'home';
    renderPage(initialPage);
});

window.addEventListener('popstate', () => {
    const page = window.location.hash.substring(1) || 'home';
    renderPage(page);
});

// Alerta inicial (mantido do seu código original, mas movido para baixo)
alert("Bem-vindo à Ong Água Limpa para Todos! Junte-se a nós na missão de levar água potável para todos.");