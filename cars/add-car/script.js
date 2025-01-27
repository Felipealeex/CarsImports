// Função para gerar anos (de 1990 até o ano atual + 1)
function popularAnosSelect() {
    const anoSelect = document.getElementById('ano');
    const anoAtual = new Date().getFullYear() + 1;
    
    for (let ano = anoAtual; ano >= 1990; ano--) {
        const option = document.createElement('option');
        option.value = ano;
        option.textContent = ano;
        anoSelect.appendChild(option);
    }
}

// Chamada da função quando a página carregar
document.addEventListener('DOMContentLoaded', popularAnosSelect);

// Função para salvar os dados do formulário e exibi-los em pp.html
document.getElementById('carForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pega os dados do formulário
    const nome = document.getElementById('nome').value;
    const marca = document.getElementById('marca').value;
    const cor = document.getElementById('cor').value;
    const estado = document.getElementById('estado').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const detalhes = document.getElementById('detalhes').value;
    const ano = document.getElementById('ano').value;
    const categoria = document.getElementById('categoria').value;
    const numPortas = document.getElementById('numPortas').value;
    const numAssentos = document.getElementById('numAssentos').value;
    const combustivel = document.getElementById('combustivel').value;
    const cambio = document.getElementById('cambio').value;

    // Pega as imagens e converte para URLs temporárias
    const imagens = document.getElementById('imagem').files;
    let imagensArray = [];
    for (let i = 0; i < imagens.length; i++) {
        const url = URL.createObjectURL(imagens[i]);
        imagensArray.push(url);
    }

    // Salva os dados no LocalStorage
    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    carros.push({ 
        nome, marca, cor, estado, valor, detalhes, imagensArray,
        ano, categoria, numPortas, numAssentos, combustivel, cambio 
    });
    localStorage.setItem('carros', JSON.stringify(carros));

    // Redireciona para pp.html
    window.location.href = 'pp.html';
});

// Atualização da função que exibe os carros
window.onload = function() {
    if (window.location.pathname.endsWith('pp.html')) {
        const carros = JSON.parse(localStorage.getItem('carros')) || [];
        const carsList = document.getElementById('carsList');
        carsList.innerHTML = ''; // Limpa a lista antes de adicionar

        carros.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');

            // Slider de imagens
            if (car.imagensArray && car.imagensArray.length > 0) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                car.imagensArray.forEach(imgUrl => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = `Imagem de ${car.nome}`;
                    imageContainer.appendChild(img);
                });
                carCard.appendChild(imageContainer);
            }

            // Informações principais
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('car-info');
            
            infoDiv.innerHTML = `
                <h3>${car.nome}</h3>
                <div class="car-specs">
                    <div class="spec-item">
                        <strong>Marca:</strong> ${car.marca}
                    </div>
                    <div class="spec-item">
                        <strong>Modelo:</strong> ${car.categoria}
                    </div>
                    <div class="spec-item">
                        <strong>Ano:</strong> ${car.ano}
                    </div>
                    <div class="spec-item">
                        <strong>Cor:</strong> ${car.cor}
                    </div>
                    <div class="spec-item">
                        <strong>Estado:</strong> ${car.estado}
                    </div>
                    <div class="spec-item">
                        <strong>Portas:</strong> ${car.numPortas}
                    </div>
                    <div class="spec-item">
                        <strong>Assentos:</strong> ${car.numAssentos}
                    </div>
                    <div class="spec-item">
                        <strong>Combustível:</strong> ${car.combustivel}
                    </div>
                    <div class="spec-item">
                        <strong>Câmbio:</strong> ${car.cambio}
                    </div>
                </div>
                <p class="price">
                    ${parseFloat(car.valor).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    })}
                </p>
            `;

            carCard.appendChild(infoDiv);

            // Botão de detalhes com modal
            const detalhesButton = document.createElement('button');
            detalhesButton.classList.add('details-button');
            detalhesButton.textContent = 'Mais Detalhes';
            detalhesButton.onclick = function() {
                const detalhesCompletos = `
                    Nome: ${car.nome}
                    Marca: ${car.marca}
                    Categoria: ${car.categoria}
                    Ano: ${car.ano}
                    Cor: ${car.cor}
                    Estado: ${car.estado}
                    Número de Portas: ${car.numPortas}
                    Número de Assentos: ${car.numAssentos}
                    Combustível: ${car.combustivel}
                    Câmbio: ${car.cambio}
                    Valor: ${parseFloat(car.valor).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    })}
                    
                    Detalhes Adicionais:
                    ${car.detalhes}
                `;
                alert(detalhesCompletos);
            };
            carCard.appendChild(detalhesButton);

            carsList.appendChild(carCard);
        });
    }
};

// Funcionalidade do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Ajuste para orientação do dispositivo
window.addEventListener('orientationchange', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.overlay');
    
    if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Prevenir zoom em inputs em dispositivos móveis
const mobileInputs = document.querySelectorAll('input[type="text"], input[type="number"], select, textarea');
mobileInputs.forEach(input => {
    input.addEventListener('focus', function() {
        if (window.innerWidth <= 768) {
            input.setAttribute('readonly', true);
            input.removeAttribute('readonly');
        }
    });
});
