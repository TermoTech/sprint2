drop database termotech;
-- CRIANDO O BANCO DE DADOS
CREATE DATABASE termotech;
USE termotech;

-- CREATE USER 'aluno'@'localhost' IDENTIFIED BY 'sptech';
-- GRANT SELECT,INSERT, DELETE, UPDATE ON termotech.* TO 'aluno'@'localhost';
-- GRANT EXECUTE ON PROCEDURE termotech.dadosSensores TO 'aluno'@'localhost';

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
 nomeEmpresa VARCHAR(45),
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
 nivelAcesso INT,
 fkEmpresa INT,
 FOREIGN KEY (fkEmpresa) references empresa (idEmpresa),
 constraint chkAcesso check (nivelAcesso in(0, 1)));
 
 -- TABELA MÁQUINA
 CREATE TABLE maquina (
 idMaquina INT PRIMARY KEY AUTO_INCREMENT,
 numMaquina INT,
 fkEmpresa INT,
 FOREIGN KEY (fkEmpresa) references empresa(idEmpresa));

 -- TABELA SENSORES
 CREATE TABLE sensores (
 idSensor INT PRIMARY KEY AUTO_INCREMENT,
 tipo VARCHAR(45),
 localizacao VARCHAR(45),
 minimo float,
 maximo float,
 -- temperatura FLOAT,
 -- umidade FLOAT,
 -- horario DATETIME DEFAULT CURRENT_TIMESTAMP,
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina(idMaquina));
 
 -- TABELA ACESSO
 CREATE TABLE acesso (
 fkUsuario INT,
 FOREIGN KEY (fkUsuario) references usuario (idUsuario),
 fkMaquina INT,
 FOREIGN KEY (fkMaquina) references maquina (idMaquina),
 PRIMARY KEY (fkUsuario, fkMaquina));
 
CREATE TABLE captura(
	idCaptura int auto_increment,
    captura float,
    horario datetime default current_timestamp,
    erro int,
    fkSensor int,
		constraint fkMaquinaSensor foreign key (fkSensor) references sensores(idSensor),
	primary key(idCaptura, fkSensor)
);

 -- INSERTS
 
 -- DANDO INSERT NA TABELA ENDERECO
 INSERT INTO endereco VALUES
 (null, 'São Paulo', 'São Paulo', 'Centro', 'Rua A', 123, '01000-000'),
 (null, 'São Paulo', 'São Paulo', 'Bela Vista', 'Rua B', 456, '02000-000');
 
 -- DANDO INSERT NA TABELA EMPRESA
INSERT INTO empresa VALUES
(null, 'PlastiInova Soluções', 1,2),
(null, 'EcoTermo Plastico', 0,1);

-- DANDO INSERT NA TABELA USUARIO
INSERT INTO usuario VALUES
(null, 'kaua.souza@plast.nova', 'abc123', 'Kauã', 1, 1),
(null, 'joao.galhardo@plast.nova', 'def456', 'Joao', 0, 1),
(null, 'marcos.floriano@eco.termo', '123abc', 'Marcos', 1, 2),
(null, 'gabriel.amaral@eco.termo', '456def', 'Gabriel', 1, 2);

-- DANDO INSERT NA TABELA MAQUINAS
INSERT INTO maquina VALUES
(null, 1,2),
(null, 2,2),
(null, 1,1),
(null, 2,1);

-- DANDO INSERT NA TABELA ACESSO
INSERT INTO acesso VALUES
(1, 3),
(1, 4),
(2, 3),
(3, 1),
(3,2),
(4,1);

select * from usuario;

-- DANDO INSERT NA TABELA SENSORES (ANTIGA) PROVISÓRIO

-- INSERT INTO sensores VALUES
-- (null, 'LM35', 'Reator', 153, null, default, 1),
-- (null, 'LM35', 'Matriz', 210.12, null, default, 1),
-- (null, 'LM35', 'Anel de Resfriamento', 48.52, null, default, 1),
-- (null, 'DHT11', null, null, 62.60, default , 1),
-- (null, 'LM35', 'Reator', 123, null, default, 2),
-- (null, 'LM35', 'Matriz', 190.42, null, default, 2),
-- (null, 'LM35', 'Anel de Resfriamento', 50.52, null, default, 2),
-- (null, 'DHT11', null, null, 40.60, default , 2),
-- (null, 'LM35', 'Reator', 140, null, default, 3),
-- (null, 'LM35', 'Matriz', 209, null, default, 3),
-- (null, 'LM35', 'Anel de Resfriamento', 38.52, null, default, 3),
-- (null, 'DHT11', null, null, 32.60, default , 3),
-- (null, 'LM35', 'Reator', 173.67, null, default, 4),
-- (null, 'LM35', 'Matriz', 156.62, null, default, 4),
-- (null, 'LM35', 'Anel de Resfriamento', 58.11, null, default, 4),
-- (null, 'DHT11', null, null, 70.60, default , 4);

-- INSERTS para teste da nova modelagem

INSERT INTO sensores VALUES
	(null, 'temperatura', 'Anel de resfriamento', null, null, 1),
	(null, 'temperatura', 'Reator', null, null, 1),
	(null, 'temperatura', 'Matriz', null, null, 1),
	(null, 'Umidade', 'Ambiente', null, null, 1),
	(null, 'temperatura', 'Anel de resfriamento', null, null, 2),
	(null, 'temperatura', 'Reator', null, null, 2),
	(null, 'temperatura', 'Matriz', null, null, 2),
    (null, 'umidade', 'ambiente', null, null, 2),
	(null, 'temperatura', 'Anel de resfriamento', null, null, 3),
	(null, 'temperatura', 'Reator', null, null, 3),
	(null, 'temperatura', 'Matriz', null, null, 3),
	(null, 'Umidade', 'Ambiente', null, null, 3),
	(null, 'temperatura', 'Anel de resfriamento', null, null, 4),
	(null, 'temperatura', 'Reator', null, null, 4),
	(null, 'temperatura', 'Matriz', null, null, 4),
	(null, 'Umidade', 'Ambiente', null, null, 4);

select * from usuario;
select * from maquina;
select * from acesso;
select * from empresa;
select * from endereco;
select * from sensores;



SELECT *
FROM sensores
RIGHT JOIN maquina ON idMaquina = fkMaquina RIGHT join captura on fkSensor = idSensor
WHERE horario BETWEEN '2023-11-09' AND '2023-11-30';

select sensores.* from sensores join maquina on fkMaquina = idMaquina where idMaquina = 3 order by idSensor;

drop table sensores;

insert into maquina (numMaquina, fkEmpresa) values 
	(3, 1);
    
insert into sensores values
	(null, 'temperatura', 'Anel de resfriamento', null, null, 5),
	(null, 'temperatura', 'Reator', null, null, 599),
	(null, 'temperatura', 'Matriz', null, null, 5),
	(null, 'Umidade', 'Ambiente', null, null, 5);

-- PROCEDURE

DELIMITER $$
CREATE PROCEDURE dadosSensores(empresa INT, maquinaUser int)
BEGIN
	DECLARE temperaturaMatriz FLOAT;
    DECLARE minMatriz int;
    DECLARE maxMatriz int;
    
    DECLARE temperaturaAnelResfriamento FLOAT;
    DECLARE minAnel int;
    DECLARE maxAnel int;
    
    DECLARE temperaturaReator FLOAT;
    DECLARE maxReator int;
    DECLARE minReator int;
    
    DECLARE umidadeMaquina FLOAT;
    DECLARE maxUmidade int;
    DECLARE minUmidade int;
    
    DECLARE idDaMaquina int;
    
    SELECT c.captura INTO temperaturaMatriz FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Matriz' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
	
    SELECT s.maximo INTO minMatriz FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Matriz' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
	SELECT s.minimo INTO maxMatriz FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Matriz' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
	SELECT c.captura INTO temperaturaAnelResfriamento FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Anel de Resfriamento' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
	SELECT s.minimo INTO minAnel FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Anel de Resfriamento' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
	SELECT s.maximo INTO maxAnel FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Anel de Resfriamento' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
	SELECT c.captura INTO temperaturaReator FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Reator' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
	SELECT s.minimo INTO minReator FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Reator' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
   	SELECT s.minimo INTO maxReator FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Reator' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
    SELECT c.captura INTO umidadeMaquina FROM sensores as s join maquina as m on s.fkMaquina = m.idMaquina join captura as c on c.fkSensor = s.idSensor
    WHERE m.fkEmpresa = empresa AND s.localizacao = 'ambiente' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
    SELECT s.minimo INTO minUmidade FROM sensores as s join maquina as m on s.fkMaquina = m.idMaquina join captura as c on c.fkSensor = s.idSensor
    WHERE m.fkEmpresa = empresa AND s.localizacao = 'ambiente' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
    SELECT s.maximo INTO maxUmidade FROM sensores as s join maquina as m on s.fkMaquina = m.idMaquina join captura as c on c.fkSensor = s.idSensor
    WHERE m.fkEmpresa = empresa AND s.localizacao = 'ambiente' AND m.idMaquina = maquinaUser ORDER BY c.horario ASC LIMIT 1;
    
    SELECT m.idMaquina INTO idDaMaquina FROM maquina as m join sensores as s
    on s.fkMaquina = m.idMaquina WHERE m.fkEmpresa = empresa AND m.idMaquina = maquinaUser limit 1;
    
    SELECT temperaturaAnelResfriamento, maxAnel, minAnel, temperaturaReator, minReator, maxReator, temperaturaMatriz, minReator, maxReator, umidadeMaquina,
    maxUmidade, minUmidade, idDaMaquina;
END$$
DELIMITER ;

select * from captura;

CALL dadosSensores(1, 4);
DROP PROCEDURE IF EXISTS dadosSensores;