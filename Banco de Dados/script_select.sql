-- TODOS OS SELECT TODOS
SELECT * FROM usuario;
SELECT * FROM maquina;
SELECT * FROM sensores;
SELECT * FROM empresa;

-- SELECT COM OS DADOS DO USUARIO
SELECT * FROM usuario JOIN empresa ON fkEmpresa = idEmpresa;
SELECT * FROM usuario JOIN usuario_maquina ON idUsuario = fkUsuario;
SELECT * FROM usuario;

-- SELECT COM OS DADOS DA EMPRESA
SELECT * FROM empresa JOIN usuario ON idEmpresa = fkEmpresa;
SELECT * FROM empresa JOIN maquina ON idEmpresa = fkEmpresa;
SELECT * FROM empresa;


