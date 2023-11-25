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
                            "\nHouve um erro ao listar os dados da máquina dos usuários! Erro: ",
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

function setupMaquinasController(req, res){
    var idMaquina = req.body.idMaquinaServer
    maquinasConfigsModel.achaSetupModel(idMaquina)
    .then(
        function(resultado){
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar o setup! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function updateSetupController(req, res){
    var listaValores = req.body.listaSetupsServer
    for(var i = 0; i < listaValores.length; i++){
        maquinasConfigsModel.updateSetupModel(listaValores[i])
        .then(
            function(resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao editar o setup! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = { exibeConfigsMaquina, setupMaquinasController, updateSetupController }