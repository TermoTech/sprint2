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

function mostraProcessosController(req, res){
    var idMaquina = req.body.idMaquinaServer
    maquinasConfigsModel.achaProcessosModel(idMaquina)
    .then(
        function(resultado){
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar os processos! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function pegaMinMax(req, res){
    var fkEmpresa = req.body.fkEmpresaServer
    var idUsuario = req.body.idUsuarioServer
    var acesso = req.body.acessoServer
    if(acesso == 1){
        maquinasConfigsModel.pegaMinMaxModelTodas(fkEmpresa)
        .then(
            function(resultado){
                res.json(resultado);
                console.log('Controller:', resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar o setup de todas as máquina da empresa para o alerta! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    } else{

    }
}

function achaTemp(req, res){
    var idSensor = req.body.idSensorServer
    maquinasConfigsModel.achaTempSensor(idSensor)
    .then(
        function(resultado){
            res.json(resultado);
            console.log('Controller Acha medida do sensor:', resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao procurar a medição do sensor! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function updateCaptura(req, res){
    var idCaptura = req.body.idMedidaServer
    maquinasConfigsModel.atualizaErro(idCaptura)
    .then(
        function(resultado){
            res.json(resultado);
            console.log('Medida atualizada', resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao atualizar a medida! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = { exibeConfigsMaquina, updateSetupController, mostraProcessosController, pegaMinMax, achaTemp, updateCaptura }