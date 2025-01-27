document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Menu Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Suave
    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Calcula a posição considerando a navbar fixa
                    const offsetTop = targetSection.offsetTop - 80; // 80px é a altura da navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth',
                        // Adiciona easing para movimento mais natural
                        easing: function(t) {
                            return t < 0.5 
                                ? 4 * t * t * t 
                                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                        }
                    });

                    // Adiciona classe ativa ao link (opcional)
                    links.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    // Atualiza URL sem recarregar a página (opcional)
                    history.pushState(null, null, targetId);
                }
            });
        });

        // Detecta scroll para destacar seção atual (opcional)
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Atualiza link ativo no menu
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    });

    // Função para scroll mais suave em dispositivos iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.addEventListener('touchmove', () => {});
    }

    // Otimização do efeito de mouse
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse relativa ao card
            const y = e.clientY - rect.top;  // Posição Y do mouse relativa ao card
            
            // Converte as posições para porcentagens
            const mouseX = `${(x / rect.width) * 100}%`;
            const mouseY = `${(y / rect.height) * 100}%`;
            
            // Atualiza as variáveis CSS
            card.style.setProperty('--mouse-x', mouseX);
            card.style.setProperty('--mouse-y', mouseY);
        });

        // Reset do efeito quando o mouse sai do card
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Inicialização do Swiper
    const swiper = new Swiper('.carrosselCarros', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            enabled: false // Desabilita completamente a navegação
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Pausa o autoplay quando o mouse está sobre o carrossel
    document.querySelector('.carrosselCarros').addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });

    document.querySelector('.carrosselCarros').addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });

    // Seleciona os elementos de filtro
    const filters = {
        price: document.getElementById('price'),
        color: document.getElementById('color'),
        brand: document.getElementById('brand'),
        cate: document.getElementById('cate')
    };

    // Seleciona todos os cards
    const cards = document.querySelectorAll('.card');
    const resetButton = document.querySelector('.reset-filter-btn');

    // Função principal de filtragem
    function filterCars() {
        const selectedFilters = {
            price: filters.price.value,
            color: filters.color.value,
            brand: filters.brand.value,
            cate: filters.cate.value
        };

        cards.forEach(card => {
            let shouldShow = true;
            const cardPrice = parseInt(card.dataset.price);
            const cardColor = card.dataset.color;
            const cardBrand = card.dataset.brand;
            const cardCategory = card.dataset.category;

            // Filtro de preço
            if (selectedFilters.price !== 'todas') {
                switch (selectedFilters.price) {
                    case 'ate-200000':
                        shouldShow = cardPrice <= 200000;
                        break;
                    case '200000-400000':
                        shouldShow = cardPrice > 200000 && cardPrice <= 400000;
                        break;
                    case 'acima-400000':
                        shouldShow = cardPrice > 400000;
                        break;
                }
            }

            // Filtro de cor
            if (shouldShow && selectedFilters.color !== 'todas') {
                shouldShow = cardColor === selectedFilters.color;
            }

            // Filtro de marca
            if (shouldShow && selectedFilters.brand !== 'todas') {
                shouldShow = cardBrand === selectedFilters.brand;
            }

            // Filtro de categoria
            if (shouldShow && selectedFilters.cate !== 'todas') {
                shouldShow = cardCategory === selectedFilters.cate;
            }

            // Aplica a visibilidade com animação
            if (shouldShow) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.classList.add('visible');
                }, 50);
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });

        // Verifica se há resultados
        checkNoResults();
    }

    // Função para verificar se não há resultados
    function checkNoResults() {
        const visibleCards = document.querySelectorAll('.card:not(.hidden)');
        const noResultsEl = document.querySelector('.no-results');
        
        if (visibleCards.length === 0) {
            if (!noResultsEl) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <h3>Nenhum carro encontrado</h3>
                    <p>Tente ajustar os filtros para ver mais opções.</p>
                `;
                document.querySelector('.card-row').after(message);
            } else {
                noResultsEl.style.display = 'block';
            }
        } else if (noResultsEl) {
            noResultsEl.style.display = 'none';
        }
    }

    // Função para resetar filtros
    function resetFilters() {
        // Reset todos os selects para 'todas'
        Object.values(filters).forEach(filter => {
            filter.value = 'todas';
        });

        // Mostra todos os cards
        cards.forEach(card => {
            card.classList.remove('hidden');
            card.classList.add('visible');
        });

        // Esconde mensagem de "nenhum resultado"
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }

    // Adiciona listeners para cada filtro
    Object.values(filters).forEach(filter => {
        filter.addEventListener('change', filterCars);
    });

    // Adiciona listener para o botão de reset
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
});


