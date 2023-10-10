CREATE DATABASE termoTech;

USE termoTech;

CREATE TABLE empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
email varchar(45)
)auto_increment=1000;

CREATE TABLE usuario (
idUsuario int primary key auto_increment,
email varchar(45),
senha varchar(45),
nome varchar(45),
acesso tinyint constraint chkAcesso check (acesso>=0 and acesso<=2),
fkEmpresa int, constraint fkEmpresa foreign key (fkEmpresa) references empresa(idEmpresa)
);

CREATE TABLE maquina (
idMaquina int primary key auto_increment,
nome varchar(45),
fkEmpresa int, constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
)auto_increment=2000;

CREATE TABLE sensorLM (
idLm int primary key auto_increment,
localizacao varchar(45),
tempMin float,
tempMax float,
fkMaquina int, constraint fkMaquina foreign key (fkMaquina) references maquina(idMaquina)
)auto_increment=3000;

CREATE TABLE registroLm (
idRegistroLm int primary key auto_increment,
temperatura float,
hora datetime default current_timestamp,
fkLm int, constraint fkLm foreign key (fkLm) references sensorLm(idLm)
)auto_increment=4000;

CREATE TABLE sensorDht (
idDht int primary key auto_increment,
localizacao varchar(45),
umidMin float,
umidMax float,
fkMaquina int, constraint fkMaq foreign key (fkMaquina) references maquina(idMaquina) 
)auto_increment=5000;

CREATE TABLE registroDht (
idRegistroDht int primary key auto_increment,
umidade float,
hora datetime default current_timestamp,
fkDht int, constraint fkDht foreign key (fkDht) references sensorDht(idDht)
)auto_increment=6000;
