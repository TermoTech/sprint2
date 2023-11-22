var database = require("../../../database/db.js")

function cadastrar(nome, email, senha, fkempresa) {

    var instrucao = `
        INSERT INTO usuario (email,senha, nome, nivelAcesso, fkEmpresa) VALUES ('${email}', '${senha}', '${nome}', 0, '${fkempresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarModel(fkEmpresa){
    var instrucao = `
        select * from usuario join acesso on fkUsuario = idUsuario join maquina on fkMaquina = idMaquina where nivelAcesso = 0 and usuario.fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinas(fkEmpresa){
    var instrucao = `
    SELECT * FROM maquina WHERE fkEmpresa = ${fkEmpresa}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar, listarModel, listarMaquinas
}
