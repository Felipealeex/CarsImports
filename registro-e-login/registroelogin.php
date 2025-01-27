<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style_registroelogin.css">
    <title>Registro e Login</title>
</head>
<body>
    <div class="container" id="container">
        <div class="form-container sign-up">
            <form method="POST" action="auth.php">
                <h1>Registro</h1>
                <span>Campos obrigatórios.</span>
                <input type="text" placeholder="Nome completo" id="name" name="nome" autofocus="true" required>
                <input type="email" placeholder="Email" id="email" name="email" required>
                <input type="password" id="password" name="senha" placeholder="Digite sua Senha" required>
                <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF" required>
                <button type="submit" name="register">Registre-se</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form method="POST" action="auth.php">
                <h1>Login</h1>
                <span>Utilize seu CPF e Senha para efetuar o login.</span>
                <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF" required>
                <input type="password" id="password" name="senha" placeholder="Digite sua Senha" required>
                <a href="#">Esqueceu sua senha?</a>
                <button type="submit" name="login">Login</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Seja Bem-vindo!</h1>
                    <p>Preencha os campos para efetuar a criação de conta.</p>
                    <button class="hidden" id="login">Login</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Olá!</h1>
                    <p>Registre-se com seus dados pessoais para entrar com sua conta.</p>
                    <button class="hidden" id="register">Registre-se</button>
                </div>
            </div>
        </div>
    </div>
    <script src="script_registroelogin.js"></script>
</body>
</html>
