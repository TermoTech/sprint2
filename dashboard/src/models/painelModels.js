var database = require("../../../database/db.js");

function listarTodasMaquinasModel(idEmpresa){
    var instrucao = `
    select * from maquina where fkEmpresa = ${idEmpresa};
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function achaMaquinaUsuario(idUsuario, idEmpresa){
    var instrucao = `
    select idMaquina, numMaquina from empresa join maquina on maquina.fkEmpresa = idEmpresa left join usuario on usuario.fkEmpresa = empresa.idEmpresa where maquina.fkEmpresa = ${idEmpresa} and idUsuario = ${idUsuario}    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function tempoReal(idUser, fkEmpresa) {

    var instrucao = `CALL dadosSensores(${fkEmpresa}, ${idUser});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUmaMaquina(idDaMaquina) {

    var instrucao = `SELECT * FROM maquina WHERE idMaquina = ${idDaMaquina}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarTodasMaquinasModel, 
    achaMaquinaUsuario,
    listarUmaMaquina,
    tempoReal
}
