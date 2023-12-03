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

-- INSERTS para teste da nova modelagem

INSERT INTO sensores VALUES
	(1, 'temperatura', 'Anel de resfriamento', null, null, 1),
	(2, 'temperatura', 'Reator', null, null, 1),
	(3, 'temperatura', 'Matriz', null, null, 1),
	(4, 'Umidade', 'Ambiente', null, null, 1),
	(5, 'temperatura', 'Anel de resfriamento', null, null, 2),
	(6, 'temperatura', 'Reator', null, null, 2),
	(7, 'temperatura', 'Matriz', null, null, 2),
    (8, 'umidade', 'ambiente', null, null, 2),
	(9, 'temperatura', 'Anel de resfriamento', null, null, 3),
	(10, 'temperatura', 'Reator', null, null, 3),
	(11, 'temperatura', 'Matriz', null, null, 3),
	(12, 'Umidade', 'Ambiente', null, null, 3),
	(13, 'temperatura', 'Anel de resfriamento', null, null, 4),
	(14, 'temperatura', 'Reator', null, null, 4),
	(15, 'temperatura', 'Matriz', null, null, 4),
	(16, 'Umidade', 'Ambiente', null, null, 4);

-- Inserts atuais da captura

INSERT INTO captura (idCaptura, captura, horario, erro, fkSensor) VALUES
(1, 72.1, '2023-11-27 16:26:44', 1, 1),
(2, 72.1, '2023-11-27 16:26:44', 1, 1),
(3, 70.875, '2023-11-27 16:26:44', 0, 1),
(4, 70.875, '2023-11-27 16:26:44', 0, 1),
(5, 72.1, '2023-11-27 16:26:44', 0, 1),
(6, 72.1, '2023-11-27 16:26:44', 0, 1),
(7, 70.875, '2023-11-27 16:26:44', 0, 1),
(8, 70.875, '2023-11-27 16:26:44', 0, 1),
(9, 288.4, '2023-11-27 16:26:44', 0, 2),
(10, 288.4, '2023-11-27 16:26:44', 0, 2),
(11, 283.5, '2023-11-27 16:26:44', 0, 2),
(12, 283.5, '2023-11-27 16:26:44', 0, 2),
(13, 288.4, '2023-11-27 16:26:44', 0, 2),
(14, 70.875, '2023-11-27 16:26:44', 0, 1),
(15, 70.875, '2023-11-27 16:26:44', 0, 1),
(16, 288.4, '2023-11-27 16:26:44', 0, 2),
(17, 283.5, '2023-11-27 16:26:44', 0, 2),
(18, 283.5, '2023-11-27 16:26:44', 1, 2),
(19, 288.4, '2023-11-27 16:26:44', 0, 3),
(20, 288.4, '2023-11-27 16:26:44', 0, 3),
(21, 70.875, '2023-11-27 16:26:44', 0, 1),
(22, 283.5, '2023-11-27 16:26:44', 0, 3),
(23, 283.5, '2023-11-27 16:26:44', 0, 3),
(24, 288.4, '2023-11-27 16:26:44', 0, 3),
(25, 283.5, '2023-11-27 16:26:44', 0, 2),
(26, 288.4, '2023-11-27 16:26:44', 0, 3),
(27, 283.5, '2023-11-27 16:26:44', 0, 2),
(28, 283.5, '2023-11-27 16:26:44', 0, 3),
(29, 283.5, '2023-11-27 16:26:44', 1, 3),
(30, 0, '2023-11-27 16:26:44', 0, 4),
(31, 283.5, '2023-11-27 16:26:44', 0, 2),
(32, 60.3, '2023-11-27 16:26:44', 0, 4),
(33, 60.3, '2023-11-27 16:26:44', 0, 4),
(34, 60.3, '2023-11-27 16:26:44', 0, 4),
(35, 60.3, '2023-11-27 16:26:44', 0, 4),
(36, 283.5, '2023-11-27 16:26:44', 0, 3),
(37, 60.3, '2023-11-27 16:26:44', 0, 4),
(38, 60.3, '2023-11-27 16:26:44', 1, 4),
(39, 283.5, '2023-11-27 16:26:44', 0, 3),
(40, 60.3, '2023-11-27 16:26:44', 0, 4),
(41, 72.1, '2023-11-27 16:26:44', 0, 5),
(42, 70.875, '2023-11-27 16:26:44', 0, 5),
(43, 283.5, '2023-11-27 16:26:44', 0, 3),
(44, 72.1, '2023-11-27 16:26:44', 0, 5),
(45, 72.1, '2023-11-27 16:26:44', 0, 5),
(46, 72.1, '2023-11-27 16:26:44', 0, 5),
(47, 60.3, '2023-11-27 16:26:44', 1, 4),
(48, 70.875, '2023-11-27 16:26:44', 0, 5),
(49, 60.3, '2023-11-27 16:26:44', 0, 4),
(50, 70.875, '2023-11-27 16:26:44', 0, 5),
(51, 288.4, '2023-11-27 16:26:44', 0, 6),
(52, 283.5, '2023-11-27 16:26:44', 0, 6),
(53, 70.875, '2023-11-27 16:26:44', 0, 5),
(54, 60.3, '2023-11-27 16:26:44', 0, 4),
(55, 288.4, '2023-11-27 16:26:44', 1, 6),
(56, 70.875, '2023-11-27 16:26:44', 0, 5),
(57, 70.875, '2023-11-27 16:26:44', 0, 5),
(58, 283.5, '2023-11-27 16:26:44', 0, 6),
(59, 288.4, '2023-11-27 16:26:44', 0, 6),
(60, 288.4, '2023-11-27 16:26:44', 0, 6),
(61, 283.5, '2023-11-27 16:26:44', 0, 6),
(62, 283.5, '2023-11-27 16:26:44', 1, 7),
(63, 283.5, '2023-11-27 16:26:44', 0, 6),
(64, 288.4, '2023-11-27 16:26:44', 0, 7),
(65, 283.5, '2023-11-27 16:26:44', 0, 6),
(66, 283.5, '2023-11-27 16:26:44', 0, 7),
(67, 283.5, '2023-11-27 16:26:44', 0, 6),
(68, 288.4, '2023-11-27 16:26:44', 1, 7),
(69, 70.875, '2023-11-27 16:26:44', 0, 5),
(70, 283.5, '2023-11-27 16:26:44', 0, 7),
(71, 288.4, '2023-11-27 16:26:44', 0, 7),
(72, 288.4, '2023-11-27 16:26:44', 0, 7),
(73, 60.3, '2023-11-27 16:26:44', 0, 8),
(74, 0, '2023-11-27 16:26:44', 0, 8),
(75, 283.5, '2023-11-27 16:26:44', 1, 7),
(76, 283.5, '2023-11-27 16:26:44', 0, 7),
(77, 283.5, '2023-11-27 16:26:44', 0, 7),
(78, 283.5, '2023-11-27 16:26:44', 0, 6),
(79, 60.3, '2023-11-27 16:26:44', 0, 8),
(80, 60.3, '2023-11-27 16:26:44', 0, 8),
(81, 60.3, '2023-11-27 16:26:44', 0, 8),
(82, 60.3, '2023-11-27 16:26:44', 0, 8),
(83, 60.3, '2023-11-27 16:26:44', 0, 8),
(84, 60.3, '2023-11-27 16:26:44', 0, 8),
(85, 72.1, '2023-11-27 16:26:44', 0, 9);

INSERT INTO captura (idCaptura, captura, horario, erro, fkSensor) VALUES
(86, 72.1, '2023-11-27 16:26:44', 0, 1),
(87, 70.875, '2023-11-27 16:26:44', 0, 2),
(88, 288.4, '2023-11-27 16:26:44', 0, 3),
(89, 283.5, '2023-11-27 16:26:44', 0, 4),
(90, 60.3, '2023-11-27 16:26:44', 0, 5),
(91, 72.1, '2023-11-27 16:26:44', 0, 6),
(92, 70.875, '2023-11-27 16:26:44', 0, 7),
(93, 288.4, '2023-11-27 16:26:44', 0, 8),
(94, 283.5, '2023-11-27 16:26:44', 0, 9);

select * from usuario;
select * from maquina;
select * from empresa;
select * from endereco;
select * from sensores;

SELECT *
FROM sensores
RIGHT JOIN maquina ON idMaquina = fkMaquina RIGHT join captura on fkSensor = idSensor
WHERE horario BETWEEN '2023-11-09' AND '2023-11-30';

select sensores.* from sensores join maquina on fkMaquina = idMaquina where idMaquina = 3 order by idSensor;

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
    WHERE s.localizacao = 'Matriz' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
	
    SELECT s.minimo INTO minMatriz FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Matriz' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
	SELECT s.maximo INTO maxMatriz FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Matriz' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
	SELECT c.captura INTO temperaturaAnelResfriamento FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Anel de Resfriamento' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
	SELECT s.minimo INTO minAnel FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Anel de Resfriamento' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
	SELECT s.maximo INTO maxAnel FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Anel de Resfriamento' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
	SELECT c.captura INTO temperaturaReator FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Reator' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
	SELECT s.minimo INTO minReator FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Reator' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
   	SELECT s.maximo INTO maxReator FROM sensores as s JOIN maquina as m ON s.fkMaquina = m.idMaquina JOIN captura as c on c.fkSensor = s.idSensor
    WHERE s.localizacao = 'Reator' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
    SELECT c.captura INTO umidadeMaquina FROM sensores as s join maquina as m on s.fkMaquina = m.idMaquina join captura as c on c.fkSensor = s.idSensor
    WHERE m.fkEmpresa = empresa AND s.localizacao = 'ambiente' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
    SELECT s.minimo INTO minUmidade FROM sensores as s join maquina as m on s.fkMaquina = m.idMaquina join captura as c on c.fkSensor = s.idSensor
    WHERE m.fkEmpresa = empresa AND s.localizacao = 'ambiente' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
    SELECT s.maximo INTO maxUmidade FROM sensores as s join maquina as m on s.fkMaquina = m.idMaquina join captura as c on c.fkSensor = s.idSensor
    WHERE m.fkEmpresa = empresa AND s.localizacao = 'ambiente' AND m.idMaquina = maquinaUser ORDER BY c.horario DESC LIMIT 1;
    
    SELECT m.idMaquina INTO idDaMaquina FROM maquina as m join sensores as s
    on s.fkMaquina = m.idMaquina WHERE m.fkEmpresa = empresa AND m.idMaquina = maquinaUser limit 1;
    
    SELECT temperaturaAnelResfriamento, maxAnel, minAnel, temperaturaReator, minReator, maxReator, temperaturaMatriz, minMatriz, maxMatriz, umidadeMaquina,
    maxUmidade, minUmidade, idDaMaquina;
END$$
DELIMITER ;

select * from captura;

CALL dadosSensores(1, 4);
DROP PROCEDURE IF EXISTS dadosSensores;

SELECT usuario.nome, usuario.idUsuario, usuario.fkEmpresa, usuario.nivelAcesso, maquina.idMaquina, empresa.nomeEmpresa, empresa.plano
	FROM empresa JOIN usuario ON usuario.fkEmpresa = idEmpresa JOIN maquina on maquina.fkEmpresa = idEmpresa;
    
select idMaquina, numMaquina from empresa join maquina on maquina.fkEmpresa = idEmpresa left join usuario on usuario.fkEmpresa = empresa.idEmpresa where maquina.fkEmpresa = 1;
select * from empresa join maquina on maquina.fkEmpresa = idEmpresa join usuario on usuario.fkEmpresa = idEmpresa where maquina.idMaquina = 4;