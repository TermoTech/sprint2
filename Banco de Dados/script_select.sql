-- TODOS OS SELECT TODOS
SELECT * FROM usuario;
SELECT * FROM maquina;
SELECT * FROM sensores;
SELECT * FROM empresa;

-- SELECT COM OS DADOS DA EMPRESA
SELECT * FROM empresa JOIN usuario ON idEmpresa = fkEmpresa;
SELECT * FROM empresa JOIN maquina ON idEmpresa = fkEmpresa;
SELECT * FROM empresa;

-- SELECT COM OS DADOS DO USUARIO
SELECT * FROM usuario JOIN empresa ON fkEmpresa = idEmpresa;
SELECT * FROM usuario JOIN usuario_maquina ON idUsuario = fkUsuario;
SELECT * FROM usuario;

-- SELECT COM OS DADOS DA MÁQUINA
SELECT * FROM maquina JOIN empresa ON fkEmpresa = idEmpresa;
SELECT * FROM maquina JOIN usuario_maquina ON idMaquina = fkMaquina;
SELECT * FROM maquina;

-- SELECT DA RELAÇÃO N/M
SELECT * FROM usuario_maquina JOIN usuario ON fkUsuario = idUsuario JOIN maquina ON fkMaquina = idMaquina;
SELECT * FROM usuario_maquina;

-- SELECT COM OS DADOS DOS SENSORES
SELECT * FROM sensores JOIN maquina ON fkMaquina = idMaquina;
SELECT * FROM sensores;

