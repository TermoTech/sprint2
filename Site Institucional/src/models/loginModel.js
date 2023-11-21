const database = require("../../../database/db");

// SELECT * FROM usuario WHERE email='${login}' AND senha='${senha}';
function entrar(login, senha) {
    var instrucao = `
        SELECT usuario.nome, usuario.idUsuario, usuario.fkEmpresa, usuario.nivelAcesso, acesso.fkMaquina, acesso.fkUsuario, maquina.idMaquina, empresa.nomeEmpresa, empresa.plano FROM usuario
            JOIN ACESSO ON idUsuario = fkUsuario JOIN maquina ON fkMaquina = idMaquina JOIN empresa ON usuario.fkEmpresa = idEmpresa
            WHERE usuario.email = '${login}' AND usuario.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {entrar}