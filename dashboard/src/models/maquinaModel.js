var database = require('../../../database/db')

function listarTodasMaquinasModel(idEmpresa){
    var instrucao = `
        select usuario.*, maquina.* from empresa join maquina on maquina.fkEmpresa = idEmpresa left join usuario on usuario.fkEmpresa = idEmpresa where maquina.fkEmpresa = ${idEmpresa};
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function listaDadosMaquina(idMaquina){
    var instrucao = `
        select * from empresa join maquina on maquina.fkEmpresa = idEmpresa join usuario on usuario.fkEmpresa = idEmpresa where maquina.idMaquina = ${idMaquina};
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

function pegaMinMaxModelTodas(fkEmpresa){
    var instrucao = `
        select idSensor, minimo, maximo from sensores join maquina on fkMaquina = idMaquina join empresa on fkEmpresa = idEmpresa where idEmpresa = ${fkEmpresa};
    `
    // console.log(instrucao)
    return database.executar(instrucao)
}

function achaTempSensor(idSensor){
    var instrucao = `
    select c.*, s.*, m.numMaquina from captura as c join sensores as s on c.fkSensor = s.idSensor join maquina as m on s.fkMaquina = m.idMaquina where s.idSensor = ${idSensor} order by c.horario desc limit 1;
    `
    // console.log(instrucao)
    return database.executar(instrucao)
}

function atualizaErro(idCaptura){
    var instrucao = `
        update captura set erro = 1 where idCaptura = ${idCaptura};
    `
    // console.log(instrucao)
    return database.executar(instrucao)
}

module.exports = {listarTodasMaquinasModel, listaDadosMaquina, updateSetupModel, achaProcessosModel, pegaMinMaxModelTodas, achaTempSensor, atualizaErro}