var database = require('../../../database/db')

function listarTodasMaquinasModel(idEmpresa){
    var instrucao = `
        select * from maquina left join acesso on fkMaquina = idMaquina left join usuario on fkUsuario = idUsuario where maquina.fkEmpresa = ${idEmpresa};
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function achaMaquinaUsuario(idUsuario, idEmpresa){
    var instrucao = `
        select idMaquina from maquina left join acesso on fkMaquina = idMaquina left join usuario on fkUsuario = idUsuario where maquina.fkEmpresa = ${idEmpresa} and idUsuario = ${idUsuario};
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function listaDadosMaquina(idMaquina){
    var instrucao = `
        select * from maquina left join acesso on fkMaquina = idMaquina left join usuario on fkUsuario = idUsuario where maquina.idMaquina = ${idMaquina};
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function updateSetupModel(valoresSetup){
    var instrucao = `
        update sensores set minimo = ${valoresSetup.valorMin}, maximo = ${valoresSetup.valorMax} where idSensor = ${valoresSetup.idSensor};
    `
    console.log(instrucao)
    return database.executar(instrucao)
}

function achaProcessosModel(idMaquina){
    var instrucao = `
        select sensores.* from sensores join maquina on fkMaquina = idMaquina where idMaquina = ${idMaquina};
    `
    console.log(instrucao)
    return database.executar(instrucao)
}

module.exports = {listarTodasMaquinasModel, achaMaquinaUsuario, listaDadosMaquina, updateSetupModel, achaProcessosModel}