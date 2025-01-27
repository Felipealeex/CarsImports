document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os filtros
    const filters = {
        price: document.getElementById('price'),
        color: document.getElementById('color'),
        brand: document.getElementById('brand'),
        cate: document.getElementById('cate')
    };

    // Seleciona todos os cards
    const cards = document.querySelectorAll('.card');

    // Função para filtrar os carros
    function filterCars() {
        let visibleCount = 0;

        cards.forEach(card => {
            let shouldShow = true;

            // Filtro de Preço
            if (filters.price.value !== 'todas') {
                const cardPrice = parseInt(card.getAttribute('data-price'));
                switch(filters.price.value) {
                    case 'ate-100000':
                        shouldShow = cardPrice <= 100000;
                        break;
                    case '120000-150000':
                        shouldShow = cardPrice >= 120000 && cardPrice <= 150000;
                        break;
                    case 'acima-160000':
                        shouldShow = cardPrice >= 160000;
                        break;
                }
            }

            // Filtro de Cor
            if (shouldShow && filters.color.value !== 'todas') {
                shouldShow = card.getAttribute('data-color') === filters.color.value;
            }

            // Filtro de Marca
            if (shouldShow && filters.brand.value !== 'todas') {
                shouldShow = card.getAttribute('data-brand') === filters.brand.value;
            }

            // Filtro de Categoria
            if (shouldShow && filters.cate.value !== 'todas') {
                shouldShow = card.getAttribute('data-cate').toLowerCase() === filters.cate.value.toLowerCase();
            }

            // Mostra ou esconde o card
            if (shouldShow) {
                card.style.display = '';
                card.style.width = '';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
                visibleCount++;
            } else {
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // Tempo da transição
                card.style.width = '0';
                card.style.opacity = '0';
                card.style.transform = 'translateX(-20px)';
            }
        });

        handleNoResults(visibleCount);
    }

    // Função para resetar filtros
    function resetFilters() {
        Object.values(filters).forEach(filter => {
            filter.value = 'todas';
        });
        
        cards.forEach(card => {
            card.style.display = '';
        });

        const noResultsMessage = document.querySelector('.no-results');
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    }

    // Função para gerenciar mensagem de "Nenhum resultado"
    function handleNoResults(visibleCount) {
        let noResultsMessage = document.querySelector('.no-results');
        
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results';
            noResultsMessage.innerHTML = `
                <h3>Nenhum carro encontrado</h3>
                <p>Tente ajustar os filtros para ver mais opções.</p>
            `;
            document.querySelector('.card-row').after(noResultsMessage);
        }

        noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Adiciona listeners para os filtros
    Object.values(filters).forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterCars);
        }
    });

    // Listener para o botão de reset
    const resetButton = document.querySelector('.reset-filter-btn');
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }

    // Listener para o botão de aplicar filtros
    const applyButton = document.querySelector('.filter-btn.primary');
    if (applyButton) {
        applyButton.addEventListener('click', filterCars);
    }

    // Elementos do filtro mobile
    const mobileFilterBtn = document.querySelector('.mobile-filter-btn');
    const filtersSection = document.querySelector('.filters-section');
    const closeFiltersBtn = document.querySelector('.close-filters-btn');
    const filterOverlay = document.querySelector('.filter-overlay');

    // Função para abrir o menu de filtros
    function openFilters() {
        filtersSection.classList.add('active');
        filterOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar o menu de filtros
    function closeFilters() {
        filtersSection.classList.remove('active');
        filterOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners para abrir/fechar filtros
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', openFilters);
    }

    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', closeFilters);
    }

    if (filterOverlay) {
        filterOverlay.addEventListener('click', closeFilters);
    }
});
