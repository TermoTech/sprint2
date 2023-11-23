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
  parteProcesso
) {
  var instrucao = `
  select parteProcesso, count(temperatura) as countTemp from sensores where horario between '${diaInicial}' and '${diaFinal}' group by ${parteProcesso};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  filtrarGeral,
  filtrarParte,
};
