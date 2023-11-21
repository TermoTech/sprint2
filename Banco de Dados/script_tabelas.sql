-- CRIANDO O BANCO DE DADOS
CREATE DATABASE termotech;
USE termotech;

-- CRIANDO AS TABELAS

-- TABELA EMPRESA
CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(45),
 email VARCHAR(45),
 plano TINYINT,
 constraint chkPlano check (plano in(0, 1)));
 
 -- TABELA USUÁRIO
 CREATE TABLE usuario (
 idUsuario INT PRIMARY KEY AUTO_INCREMENT,
 email VARCHAR(45),
 senha VARCHAR(45), 
 nome VARCHAR(45),
 acesso TINYINT,
 fkEmpresa INT,
 FOREIGN KEY (fkEmpresa) references empresa (idEmpresa),
 constraint chkAcesso check (acesso in(0, 1)));
 
 -- TABELA MÁQUINA
 CREATE TABLE maquina (
 idMaquina INT PRIMARY KEY AUTO_INCREMENT,
 fkEmpresa INT,
 FOREIGN KEY (fkEmpresa) references empresa(idEmpresa));
 
 -- TABELA SENSORES
 CREATE TABLE sensores (
 idSensor INT PRIMARY KEY AUTO_INCREMENT,
 tipo VARCHAR(45),
 localizacao VARCHAR(45),
 temperatura FLOAT,
 umidade FLOAT,
 horario DATETIME DEFAULT CURRENT_TIMESTAMP,
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina(idMaquina));
 
 -- TABELA USUARIO_MAQUINA
 CREATE TABLE usuario_maquina (
 fkUsuario INT,
 FOREIGN KEY (fkUsuario) references usuario (idUsuario),
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina (idMaquina),
 PRIMARY KEY (fkUsuario, fkMaquina));
 