var filtrarModel = require("../models/filtrarModel");

function filtrarGeral(req, res) {
  var diaInicial = req.body.inicialDia;
  var diaFinal = req.body.finalDia;
  var maquina = req.body.idMaquina;
  var parteProcesso = req.body.parteProcesso;

  filtrarModel
    .filtrarGeral(diaInicial, diaFinal)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  filtrarGeral,
};
