drop database TCC;
CREATE DATABASE IF NOT EXISTS TCC;

USE TCC;

CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,  -- Adiciona a constraint UNIQUE para email
    senha CHAR(60) NOT NULL,  -- Considera que você estará armazenando hashes de senha
    cpf CHAR(11) NOT NULL UNIQUE  -- Adiciona a constraint UNIQUE para CPF
);

select * from registros;

CREATE TABLE IF NOT EXISTS ENTRAR (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf CHAR(11) NOT NULL UNIQUE,  -- Adiciona a constraint UNIQUE para CPF
    senha CHAR(60) NOT NULL  -- Consistente com o tamanho da senha na tabela 'registros'
);

select * from ENTRAR;

drop table ANUNCIO_ITENS;
-- Cria a tabela 'ANUNCIO_ITENS' se não existir
CREATE TABLE IF NOT EXISTS ANUNCIO_ITENS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    quilometragem INT NOT NULL,
    cor VARCHAR(50) NOT NULL,
    combustivel VARCHAR(50) NOT NULL,
    potencia INT NOT NULL,
    cambio VARCHAR(50) NOT NULL,
    portas INT NOT NULL,
    assentos INT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    equipamentos TEXT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    imagens TEXT NOT NULL
);

select * from ANUNCIO_ITENS;
