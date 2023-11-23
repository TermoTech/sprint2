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

module.exports = {listarTodasMaquinasModel, achaMaquinaUsuario, listaDadosMaquina}