const database = require("../../../database/db");

function entrar(email, senha) {
    var instrucao = `
        SELECT email, senha, acesso FROM usuario WHERE email=${email} AND senha=${senha}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {entrar}