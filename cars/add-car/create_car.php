<?php
// Diretório onde as páginas dos carros serão salvas
$carDirectory = 'cars/'; // Certifique-se de que este diretório existe e é gravável

// Verifica se o diretório existe, caso contrário, cria
if (!is_dir($carDirectory)) {
    mkdir($carDirectory, 0755, true);
}

// Captura os dados do formulário
$nome = htmlspecialchars($_POST['nome']);
$marca = htmlspecialchars($_POST['marca']);
$modelo = htmlspecialchars($_POST['modelo']);
$quilometragem = htmlspecialchars($_POST['quilometragem']);
$cor = htmlspecialchars($_POST['cor']);
$combustivel = htmlspecialchars($_POST['combustivel']);
$potencia = htmlspecialchars($_POST['potencia']);
$cambio = htmlspecialchars($_POST['cambio']);
$portas = htmlspecialchars($_POST['portas']);
$assentos = htmlspecialchars($_POST['assentos']);
$estado = htmlspecialchars($_POST['estado']);
$equipamentos = htmlspecialchars($_POST['equipamentos']);
$valor = htmlspecialchars($_POST['valor']);

// Processa as imagens
$imagens = $_FILES['imagem'];
$imagemPaths = [];

// Valida e move as imagens para o diretório
for ($i = 0; $i < count($imagens['name']); $i++) {
    $targetFile = $carDirectory . basename($imagens['name'][$i]);
    if (move_uploaded_file($imagens['tmp_name'][$i], $targetFile)) {
        $imagemPaths[] = $targetFile;
    } else {
        echo "Desculpe, ocorreu um erro ao fazer o upload da imagem: " . htmlspecialchars($imagens['name'][$i]);
    }
}

// Cria um nome de arquivo para a nova página do carro
$carFileName = strtolower(str_replace(' ', '-', $marca . '-' . $modelo . '.html'));
$carFilePath = $carDirectory . $carFileName;

// Conteúdo HTML da nova página
$htmlContent = "
<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>$marca $modelo</title>
    <link rel='stylesheet' href='style.css'> <!-- Certifique-se de que o estilo está correto -->
</head>
<body>
    <header>
        <h1>$marca $modelo</h1>
    </header>
    <section>
        <p><strong>Nome:</strong> $nome</p>
        <p><strong>Marca:</strong> $marca</p>
        <p><strong>Modelo:</strong> $modelo</p>
        <p><strong>Quilometragem:</strong> $quilometragem km</p>
        <p><strong>Cor:</strong> $cor</p>
        <p><strong>Combustível:</strong> $combustivel</p>
        <p><strong>Potência:</strong> $potencia cv</p>
        <p><strong>Câmbio:</strong> $cambio</p>
        <p><strong>Número de portas:</strong> $portas</p>
        <p><strong>Número de assentos:</strong> $assentos</p>
        <p><strong>Estado:</strong> $estado</p>
        <p><strong>Equipamentos e Acessórios:</strong> $equipamentos</p>
        <p><strong>Valor:</strong> R$ $valor</p>
        <h2>Imagens:</h2>
        <div class='image-gallery'>";
        
foreach ($imagemPaths as $path) {
    $htmlContent .= "<img src='$path' alt='Imagem do $modelo' style='width: 200px; height: auto;'>";
}

$htmlContent .= "
        </div>
    </section>
</body>
</html>";

// Salva o conteúdo HTML em um novo arquivo
if (file_put_contents($carFilePath, $htmlContent) !== false) {
    echo "Carro adicionado com sucesso! <a href='$carFilePath'>Ver página do carro</a>";
} else {
    echo "Desculpe, ocorreu um erro ao salvar a página do carro.";
}
?>
