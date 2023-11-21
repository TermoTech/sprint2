var database = require("../../../database/db.js")

function cadastrar(nome, email, senha, fkempresa) {

    var instrucao = `
        INSERT INTO usuario (email,senha, nome, nivelAcesso, fkEmpresa) VALUES ('${email}', '${senha}', '${nome}', 0, ${fkempresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarModel(fkEmpresa){
    var instrucao = `
        select * from usuario where nivelAcesso = 0 and fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar, listarModel
}
