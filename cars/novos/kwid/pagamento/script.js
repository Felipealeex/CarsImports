function showPaymentForm(type) {
    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('.boleto-container').style.display = 'none';
    
    if (type === 'cartao') {
        document.querySelector('.form-container').style.display = 'block';
    } else if (type === 'boleto') {
        document.querySelector('.boleto-container').style.display = 'block';
    }
}

function generateBoleto() {
    const boletoContainer = document.querySelector('.boleto-details');
    
    // Valores fictícios
    const valorOriginal = 65000.00; // Valor original do carro
    const percentualJuros = 6; // Juros em percentual
    const meses = 12; // Quantidade de parcelas

    // Cálculo do valor total e valor das prestações
    const valorTotal = valorOriginal + (valorOriginal * percentualJuros / 100);
    const valorPrestacao = valorTotal / meses;

    // Formatando para o estilo monetário brasileiro
    const valorOriginalFormatted = valorOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorTotalFormatted = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorPrestacaoFormatted = valorPrestacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const codigoBarras = " 10491.87654 32100.000000 98765.432109 1 234500123456"; // Código de barras falso.

    // Dados fictícios para o boleto
    const dataVencimento = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');
    const beneficiario = "Cars Imports";
    const cedente = "Banco do Brasil";
    const pagador = " Andréa Souza Lima";
    const cpfPagador = "785.412.963-00";
    const nossoNumero = "11 986981750"; // Nosso número do boleto.

    boletoContainer.innerHTML = `
        <div class="boleto">
            <div class="boleto-header">
                <img src="bb.jpg" alt="Logo do Banco" class="logo-banco">
                <h3>Boleto Bancário</h3>
                <p>${cedente}</p>
                <p>Beneficiário: ${beneficiario}</p>
                <p>Nosso Número: ${nossoNumero}</p>
            </div>
            <div class="boleto-body">
                <p><strong>Valor Original:</strong> <span class="valor">${valorOriginalFormatted}</span></p>
                <p><strong>Valor Total (com Juros):</strong> <span class="valor">${valorTotalFormatted}</span></p>
                <p><strong>Percentual de Juros:</strong> <span>${percentualJuros}%</span></p>
                <p><strong>Valor da Prestação:</strong> <span class="valor">${valorPrestacaoFormatted}</span></p>
                <p><strong>Data de Vencimento:</strong> ${dataVencimento}</p>
                <p><strong>Pagador:</strong> ${pagador}</p>
                <p><strong>CPF:</strong> ${cpfPagador}</p>
            </div>
            <div class="boleto-footer">
                <div class="codigo">Código de Barras: <span id="codigoBarras">${codigoBarras}</span></div>
                <button onclick="copyCodigoBarras()">Copiar Código de Barras</button>
                <p>Utilize o código acima para efetuar o pagamento.</p>
            </div>
        </div>
    `;
}

// Função para copiar o código de barras para a área de transferência
function copyCodigoBarras() {
    const codigoBarrasElement = document.getElementById("codigoBarras");
    const codigoBarras = codigoBarrasElement.innerText;

    // Cria um elemento temporário para copiar o texto
    const tempInput = document.createElement("input");
    tempInput.value = codigoBarras;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Código de barras copiado para a área de transferência!");
}
