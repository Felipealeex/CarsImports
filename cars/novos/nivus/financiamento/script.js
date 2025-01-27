document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const carValue = parseFloat(params.get('value')).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('carValue').value = carValue;

    document.getElementById('financingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const rawCarValue = parseFloat(params.get('value')); // Valor original sem formatação
        const interestRate = parseFloat(document.querySelector('input[name="bank"]:checked').value);
        const months = parseInt(document.getElementById('months').value);
        const selectedInsurance = document.querySelector('input[name="insurance"]:checked').value; // Captura a seguradora selecionada
        const warranty = document.getElementById('warranty').value;

        const totalInterest = rawCarValue * interestRate * months;
        const totalPayment = rawCarValue + totalInterest;
        const monthlyPayment = totalPayment / months;

        // Lógica de aprovação
        const isApproved = interestRate < 0.02; // Exemplo de critério de aprovação

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h3>Resultado do Financiamento:</h3>
            <p>Valor Original do Carro: R$ ${rawCarValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Valor Total com Juros: R$ ${totalPayment.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Pagamento Mensal: R$ ${monthlyPayment.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Aprovação do Financiamento: ${isApproved ? 'Aprovado' : 'Reprovado'}</p>
            <p>Seguradora Selecionada: ${selectedInsurance}</p>
            <p>Garantia Selecionada: ${warranty}</p>
        `;
        resultDiv.style.display = 'block';
    });
});
