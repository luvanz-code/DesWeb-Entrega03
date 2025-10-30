/* === Conteúdo CORRIGIDO para: javascript/index.js === */

// Espera o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica do Menu Hambúrguer
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Verifica se os elementos do menu existem antes de adicionar o clique
    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            // Alterna (liga/desliga) a classe 'hidden' no menu mobile
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Você pode descomentar o alerta se quiser
    // alert("Bem-vindo à Ong Água Limpa para Todos!");

    console.log("index.js carregado com sucesso (sem erros de SPA).");
});
