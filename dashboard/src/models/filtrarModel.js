var database = ("../../../database/db.js");

function filtrarGeral(diaInicial, mesInicial, diaFinal, mesFinal, idMaquina, parteProcesso) {
    var instrucao = `
    select horario, localizacao, temperatura, fkMaquina from sensores join maquina on idMaquina = fkMaquina
    where temperatura >= 1 and temperatura <= 100 and horario in ('2023-${mesInicial}-${diaInicial} 00:00:00', '2023-${mesFinal}-${diaFinal} 00:00:00') and fkMaquina = ${idMaquina} and localizacao = ${parteProcesso};
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  function filtrarParte(maximo, minimo, idMaquina) {
    var instrucao = `
    select localizacao, count(temperatura) from sensores join maquina on idMaquina = fkMaquina 
    where temperatura >= ${minimo} and temperatura ${maximo} and fkMaquina = ${idMaquina} group by localizacao;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  module.exports = {
    filtrarGeral,
    filtrarParte
  };