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
 nome VARCHAR(45),
 email VARCHAR(45),
 plano TINYINT,
 fkEndereco INT,
 constraint fkEndereco foreign key (fkEndereco) references endereco (idEndereco),
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
 parteProcesso VARCHAR(45),
 temperatura FLOAT,
 umidade FLOAT,
 horario DATETIME DEFAULT CURRENT_TIMESTAMP,
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina(idMaquina));
 
 -- TABELA ACESSO
 CREATE TABLE ACESSO (
 fkUsuario INT,
 FOREIGN KEY (fkUsuario) references usuario (idUsuario),
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina (idMaquina),
 PRIMARY KEY (fkUsuario, fkMaquina));
 
 
 
 -- INSERTS
 
 -- DANDO INSERT NA TABELA ENDERECO
 INSERT INTO endereco VALUES
 (null, 'São Paulo', 'São Paulo', 'Centro', 'Rua A', 123, '01000-000'),
 (null, 'São Paulo', 'São Paulo', 'Bela Vista', 'Rua B', 456, '02000-000');
 
 -- DANDO INSERT NA TABELA EMPRESA
INSERT INTO empresa VALUES
(null, 'PlastiInova Soluções', 'plastinova@comercial.com', 1,2),
(null, 'EcoTermo Plastico' , 'ecotermo@comercial.com', 0,1);

-- DANDO INSERT NA TABELA USUARIO
INSERT INTO usuario VALUES
(null, 'kaua.souza@plast.nova', md5('abc123'), 'Kauã', 1, 1),
(null, 'joao.galhardo@plast.nova', md5('def456'), 'Joao', 0, 1),
(null, 'marcos.floriano@eco.termo', md5('123abc'), 'Marcos', 1, 2),
(null, 'gabriel.amaral@eco.termo', md5('456def'), 'Gabriel', 1, 2);

-- DANDO INSERT NA TABELA MAQUINAS
INSERT INTO maquina VALUES
(null, 2),
(null, 2),
(null, 1),
(null, 1);

-- DANDO INSERT NA TABELA ACESSO
INSERT INTO acesso VALUES
(1, 3),
(1, 4),
(2, 3),
(3, 1),
(3,2),
(4,1);

-- DANDO INSERT NA TABELA SENSORES
INSERT INTO sensores VALUES
(null, 'LM35', 'Reator', 153, null, default, 1),
(null, 'LM35', 'Matriz', 210.12, null, default, 1),
(null, 'LM35', 'Anel de Resfriamento', 48.52, null, default, 1),
(null, 'DHT11', null, null, 62.60, default , 1),
(null, 'LM35', 'Reator', 123, null, default, 2),
(null, 'LM35', 'Matriz', 190.42, null, default, 2),
(null, 'LM35', 'Anel de Resfriamento', 50.52, null, default, 2),
(null, 'DHT11', null, null, 40.60, default , 2),
(null, 'LM35', 'Reator', 140, null, default, 3),
(null, 'LM35', 'Matriz', 209, null, default, 3),
(null, 'LM35', 'Anel de Resfriamento', 38.52, null, default, 3),
(null, 'DHT11', null, null, 32.60, default , 3),
(null, 'LM35', 'Reator', 173.67, null, default, 4),
(null, 'LM35', 'Matriz', 156.62, null, default, 4),
(null, 'LM35', 'Anel de Resfriamento', 58.11, null, default, 4),
(null, 'DHT11', null, null, 70.60, default , 4);

 
 