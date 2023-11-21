-- CRIANDO O BANCO DE DADOS
CREATE DATABASE termotech;
USE termotech;

-- CRIANDO AS TABELAS

-- CRIANDO A TABELA ENDEREÇO

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
estado VARCHAR(45),
cidade VARCHAR(45),
bairro VARCHAR(45),
rua VARCHAR(45),
numero INT,
cep CHAR(9));

-- TABELA EMPRESA
CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
 nomeEmpresa VA
 RCHAR(45),
-- emailEmpresa VARCHAR(45),
 plano INT,
 fkEndereco INT,
 constraint fkEndereco foreign key (fkEndereco) references endereco (idEndereco),
 constraint chkPlano check (plano in(0, 1)));
 
 -- TABELA USUÁRIO
 CREATE TABLE usuario (
 idUsuario INT PRIMARY KEY AUTO_INCREMENT,
 email VARCHAR(45),
 senha VARCHAR(45), 
 nome VARCHAR(45),
 nivelAcesso int,
 fkEmpresa INT,
 FOREIGN KEY (fkEmpresa) references empresa (idEmpresa),
 constraint chkAcesso check (nivelAcesso in(0, 1)));
 
 -- TABELA MÁQUINA
 CREATE TABLE maquina (
 idMaquina INT PRIMARY KEY AUTO_INCREMENT,
 fkEmpresa INT,
 FOREIGN KEY (fkEmpresa) references empresa(idEmpresa));
 
 -- TABELA SENSORES
 CREATE TABLE sensores (
 idSensor INT PRIMARY KEY AUTO_INCREMENT,
 tipo VARCHAR(45),
 parteProcesso VARCHAR(45),
 temperatura FLOAT,
 umidade FLOAT,
 horario DATETIME DEFAULT CURRENT_TIMESTAMP,
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina(idMaquina));
 
 -- TABELA ACESSO
 CREATE TABLE acesso (
 fkUsuario INT,
 FOREIGN KEY (fkUsuario) references usuario (idUsuario),
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina (idMaquina),
 PRIMARY KEY (fkUsuario, fkMaquina));