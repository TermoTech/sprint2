const database = require("../../../database/db");

function entrar(login, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email='${login}' AND senha='${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {entrar}