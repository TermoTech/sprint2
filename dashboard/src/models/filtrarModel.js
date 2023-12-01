var database = require("../../../database/db.js");

function filtrarGeral(diaInicial, diaFinal, parteProcesso) {

  if(parteProcesso == "todas"){

    var instrucao = `select DATE_FORMAT(c.horario, '%d-%m-%y') as dia, TIME(c.horario) as horario, sensores.parteProcesso as parteProcesso, c.captura as temperatura, sensores.fkMaquina as maquina FROM captura as c
    JOIN sensores ON c.fkSensor = sensores.idSensor
    JOIN maquina ON sensores.fkMaquina = maquina.idMaquina
    where c.horario BETWEEN '${diaInicial}' and '${diaFinal}';
        `;
  } else {

  var instrucao = `
  select DATE_FORMAT(c.horario, '%d-%m-%y') as dia, TIME(c.horario) as horario, sensores.parteProcesso as parteProcesso, c.captura as temperatura, sensores.fkMaquina as maquina FROM captura as c
  JOIN sensores ON c.fkSensor = sensores.idSensor
  JOIN maquina ON sensores.fkMaquina = maquina.idMaquina  
  where c.erro = 1 and c.horario BETWEEN '${diaInicial}' and '${diaFinal}' and sensores.parteProcesso = '${parteProcesso}';
      `;
  }
  console.log("Executando a instrução SQL: \n" + instrucao);

  return database.executar(instrucao);
}

// function filtrarParte(
//   diaInicial,
//   diaFinal,
//   parteProcesso
// ) {
//   var instrucao = `
//   select parteProcesso, count(temperatura) as countTemp from sensores where horario between '${diaInicial}' and '${diaFinal}' group by ${parteProcesso};
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);
// }

module.exports = {
  filtrarGeral,
  // filtrarParte,
};
