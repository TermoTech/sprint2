-- DANDO INSERT NA TABELA EMPRESA
INSERT INTO empresa VALUES
(null, 'PlastiInova Soluções', 'plastinova@comercial.com', 1),
(null, 'EcoTermo Plastico' , 'ecotermo@comercial.com', 0);

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

-- DANDO INSERT NA TABELA USUARIOW_MAQUINA
INSERT INTO usuario_maquina VALUES
(1, 3),
(1, 4),
(2, 3),
(3, 1),
(3,2),
(4,1);