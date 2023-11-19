var database = require("../../../database/db.js")

function tempoReal(idUser, fkEmpresa) {

    var instrucao = `
    SELECT * FROM maquina JOIN sensores ON idMaquina = fkMaquina
    JOIN empresa ON fkEmpresa = idEmpresa WHERE maquina.fkEmpresa = ${fkEmpresa} ORDER BY sensores.horario DESC LIMIT 4;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    tempoReal
}
