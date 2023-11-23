var maquinasConfigsModel = require('../models/maquinaModel')

function exibeConfigsMaquina(req, res){
    var idEmpresa = req.body.fkEmpresaServer
    var idUser = req.body.idUsuarioServer
    var acesso = req.body.acessoServer
    if(acesso == 1){
        maquinasConfigsModel.listarTodasMaquinasModel(idEmpresa)
        .then(
            function(resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar os usuários! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    } else{
        maquinasConfigsModel.achaMaquinaUsuario(idUser, idEmpresa)
        .then(
            function(resultado){
                maquinasConfigsModel.listaDadosMaquina(resultado[0].idMaquina)
                .then(
                    function(resultado){
                        res.json(resultado)
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao dados da máquina dos usuários! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                )
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar os usuários! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = { exibeConfigsMaquina}