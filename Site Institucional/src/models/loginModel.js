const database = require("../../../database/db");

// SELECT * FROM usuario WHERE email='${login}' AND senha='${senha}';
function entrar(login, senha) {
    var instrucao = `
    SELECT usuario.nome, usuario.idUsuario, usuario.fkEmpresa, usuario.nivelAcesso, maquina.idMaquina, empresa.nomeEmpresa, empresa.plano
	FROM empresa JOIN usuario ON usuario.fkEmpresa = idEmpresa JOIN maquina on maquina.fkEmpresa = idEmpresa
        WHERE usuario.email = '${login}' AND usuario.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {entrar}