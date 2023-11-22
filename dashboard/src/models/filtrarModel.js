var database = require("../../../database/db.js");

function filtrarGeral(diaInicial, diaFinal) {
    var instrucao = `
    select horario, parteProcesso, temperatura, umidade, fkMaquina from sensores join maquina on idMaquina = fkMaquina
    where temperatura >= 1 and temperatura <= 100 and horario in ('${diaInicial} 00:00:00', '${diaFinal} 00:00:00');
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
  }

  function filtrarParte(diaInicial, diaFinal, maximo, minimo, idMaquina, parteProcesso) {
    var instrucao = `
    select horario, parteProcesso, temperatura, umidade, fkMaquina from sensores join maquina on idMaquina = fkMaquina 
    where temperatura >= ${minimo} and temperatura ${maximo} and fkMaquina = ${idMaquina} and horario >= '${diaInicial}' and horario <= '${diaFinal}' and parteProcesso = '${parteProcesso}' group by localizacao;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  module.exports = {
    filtrarGeral,
    filtrarParte
  };