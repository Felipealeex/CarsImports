let currentImageIndex = 0;
const images = ['dentro.jpg', 'frente.jpg', 'tras.jpg', 'lado.jpg','dianteira.jpg','porta.jpg','motor.jpg','banco.jpg','roda.jpg'];

function openLightbox(image) {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox-image').src = image;
    currentImageIndex = images.indexOf(image);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('lightbox-image').src = images[currentImageIndex];
}
// Função para mudar a imagem
function changeImage(direction) {
    currentImageIndex += direction;

    // Se o índice for menor que 0, volta para a última imagem
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    // Se o índice for maior ou igual ao número de imagens, volta para a primeira imagem
    else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    // Atualiza a imagem no Lightbox
    document.getElementById("lightbox-image").src = images[currentImageIndex];

    // Aumenta a escala da nova imagem
    document.getElementById("lightbox-image").style.transform = "scale(1.1)";
}

// Função para capturar a tecla pressionada
document.addEventListener('keydown', function(event) {
    if (document.getElementById("lightbox").style.display === "block") {
        if (event.key === "ArrowLeft") {
            changeImage(-1); // Setinha esquerda
        } else if (event.key === "ArrowRight") {
            changeImage(1); // Setinha direita
        } else if (event.key === "Escape") {
            closeLightbox(); // Fechar com ESC
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Event listener para o botão hamburger
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Prevenir que cliques dentro do menu fechem ele
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Fechar menu ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});