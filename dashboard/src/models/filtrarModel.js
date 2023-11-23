var database = require("../../../database/db.js");

function filtrarGeral(diaInicial, diaFinal) {
  var instrucao = `
    SELECT horario, parteProcesso, temperatura, umidade, fkMaquina 
FROM sensores 
JOIN maquina ON idMaquina = fkMaquina
WHERE horario BETWEEN '${diaInicial}' AND '${diaFinal}';
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);

  return database.executar(instrucao);
}

function filtrarParte(
  diaInicial,
  diaFinal,
  maximo,
  minimo,
  idMaquina,
  parteProcesso
) {
  var instrucao = `
    select horario, parteProcesso, temperatura, umidade, fkMaquina from sensores join maquina on idMaquina = fkMaquina 
    where temperatura >= ${minimo} and temperatura ${maximo} and fkMaquina = ${idMaquina} and horario >= '${diaInicial}' and horario <= '${diaFinal}' and parteProcesso = '${parteProcesso}' group by localizacao;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  filtrarGeral,
  filtrarParte,
};
