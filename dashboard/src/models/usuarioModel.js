var database = require("../../../database/db.js")

function cadastrar(nome, email, senha) {

    var instrucao = `
        INSERT INTO usuario (email, nome, senha, acesso) VALUES ('${email}', '${nome}', '${senha}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
}
