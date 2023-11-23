DROP DATABASE IF EXISTS termotech;

-- CRIANDO O BANCO DE DADOS
CREATE DATABASE termotech;
USE termotech;

-- CRIANDO A TABELA ENDEREÇO
CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(45),
    cidade VARCHAR(45),
    bairro VARCHAR(45),
    rua VARCHAR(45),
    numero INT,
    cep CHAR(9)
);

-- Inserção na tabela ENDEREÇO
INSERT INTO endereco (estado, cidade, bairro, rua, numero, cep) 
VALUES 
    ('São Paulo', 'São Paulo', 'Vila Mariana', 'Rua ABC', 123, '04101-001'),
    ('Rio de Janeiro', 'Rio de Janeiro', 'Copacabana', 'Avenida XYZ', 456, '22040-000'),
    ('Minas Gerais', 'Belo Horizonte', 'Funcionários', 'Praça 123', 789, '30130-110');

-- TABELA EMPRESA
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(45),
    emailEmpresa VARCHAR(45),
    plano INT,
    fkEndereco INT,
    CONSTRAINT fkEndereco FOREIGN KEY (fkEndereco) REFERENCES endereco (idEndereco),
    CONSTRAINT chkPlano CHECK (plano IN (0, 1))
);

-- Inserção na tabela EMPRESA
INSERT INTO empresa (nomeEmpresa, emailEmpresa, plano, fkEndereco)
VALUES 
    ('Empresa A', 'empresaA@example.com', 1, 1),
    ('Empresa B', 'empresaB@example.com', 0, 2),
    ('Empresa C', 'empresaC@example.com', 1, 3);

-- TABELA USUÁRIO
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45),
    senha VARCHAR(45), 
    nome VARCHAR(45),
    nivelAcesso INT,
    fkEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
    CONSTRAINT chkAcesso CHECK (nivelAcesso IN (0, 1))
);

-- Inserção na tabela USUÁRIO
INSERT INTO usuario (email, senha, nome, nivelAcesso, fkEmpresa)
VALUES 
    ('usuario1@example.com', 'senha123', 'Usuário 1', 1, 1),
    ('usuario2@example.com', 'senha456', 'Usuário 2', 0, 2),
    ('usuario3@example.com', 'senha789', 'Usuário 3', 1, 3);

-- TABELA MÁQUINA
CREATE TABLE maquina (
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT,
    numMaquina INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Inserção na tabela MÁQUINA
INSERT INTO maquina (fkEmpresa, numMaquina) VALUES (1, 1);
INSERT INTO maquina (fkEmpresa, numMaquina) VALUES (2, 2);
INSERT INTO maquina (fkEmpresa, numMaquina) VALUES (3, 1);

-- TABELA SENSORES
CREATE TABLE sensores (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45),
    parteProcesso VARCHAR(45),
    temperatura FLOAT,
    umidade FLOAT,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkMaquina INT,
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina)
);

SELECT * FROM sensores;
-- Inserção na tabela SENSORES
INSERT INTO sensores (tipo, parteProcesso, temperatura, umidade, horario, fkMaquina) 
VALUES ('Tipo1', 'Processo1', 23.4, 45.6, STR_TO_DATE('01,5,2023','%d,%m,%Y'), 1);

INSERT INTO sensores (tipo, parteProcesso, temperatura, umidade, horario, fkMaquina) 
VALUES ('Tipo2', 'Processo2', 24.5, 46.7, STR_TO_DATE('15,6,2023','%d,%m,%Y'), 2);

INSERT INTO sensores (tipo, parteProcesso, temperatura, umidade, horario, fkMaquina) 
VALUES ('Tipo3', 'Processo3', 25.6, 47.8, STR_TO_DATE('30,7,2023','%d,%m,%Y'), 1);

SELECT horario, parteProcesso, temperatura, umidade, fkMaquina 
FROM sensores 
JOIN maquina ON idMaquina = fkMaquina
WHERE horario BETWEEN '2023-01-01 00:00:00' AND '2023-11-22 00:00:00';
-- TABELA ACESSO
CREATE TABLE acesso (
    fkUsuario INT,
    fkMaquina INT,
    PRIMARY KEY (fkUsuario, fkMaquina),
    FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario),
    FOREIGN KEY (fkMaquina) REFERENCES maquina (idMaquina)
);


select horario, parteProcesso, temperatura, umidade, fkMaquina from sensores join maquina on idMaquina = fkMaquina
    where temperatura >= 1 and temperatura <= 100 and horario in ('2023-01-01 00:00:00', '2023-11-22 00:00:00');
-- Inserção na tabela ACESSO
INSERT INTO acesso (fkUsuario, fkMaquina)
VALUES (1, 1);
INSERT INTO acesso (fkUsuario, fkMaquina)
VALUES (2, 2);
INSERT INTO acesso (fkUsuario, fkMaquina)
VALUES (3, 1);

