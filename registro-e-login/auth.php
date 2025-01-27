<?php
include 'conexao.php';
session_start(); 

function validateInput($data) {
    return htmlspecialchars(trim($data));
}

function validateCPF($cpf) {
    $cpf = preg_replace('/[^0-9]/', '', $cpf);
    
    if (strlen($cpf) !== 11) {
        return false;
    }

    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['register'])) {
        $nome = validateInput($_POST['nome']);
        $email = validateInput($_POST['email']);
        $senha = password_hash(validateInput($_POST['senha']), PASSWORD_BCRYPT);
        $cpf = validateInput($_POST['cpf']);

        if (!validateCPF($cpf)) {
            echo "CPF inválido.";
            exit();
        }

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM registros WHERE cpf = :cpf OR email = :email");
        $stmt->execute(['cpf' => $cpf, 'email' => $email]);
        if ($stmt->fetchColumn() > 0) {
            echo "CPF ou email já estão cadastrados.";
        } else {
            $stmt = $pdo->prepare("INSERT INTO registros (nome, email, senha, cpf) VALUES (:nome, :email, :senha, :cpf)");
            if ($stmt->execute(['nome' => $nome, 'email' => $email, 'senha' => $senha, 'cpf' => $cpf])) {
                header("Location: ../index.html");
                exit();
            } else {
                echo "Erro ao registrar.";
            }
        }
    } elseif (isset($_POST['login'])) {
        $cpf = validateInput($_POST['cpf']);
        $senha = validateInput($_POST['senha']);

        $stmt = $pdo->prepare("SELECT senha FROM registros WHERE cpf = :cpf");
        $stmt->execute(['cpf' => $cpf]);    
        $hash = $stmt->fetchColumn();

        if ($hash && password_verify($senha, $hash)) {
            $_SESSION['cpf'] = $cpf;
            header("Location: ../index.html");
            exit();
        } else {
            echo "CPF ou senha incorretos.";
        }
    }
}
?>
