var database = require("../../../database/db.js")

function tempoReal(idUser, fkEmpresa) {

    var instrucao = `CALL dadosSensores(${fkEmpresa}, ${idUser});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    tempoReal
}
