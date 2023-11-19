var painelModels = require("../models/painelModels");

function tempoReal(req,res) {
    var idUser = req.body.idUserServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    

    painelModels.tempoReal(idUser, fkEmpresa).then((resultado) => {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).json([]);
        }
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });

   
}


module.exports = {
  tempoReal
}