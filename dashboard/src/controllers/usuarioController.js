var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var idMaquina = req.body.maquinaServer;
    console.log(nome);
    usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
        .then(
            function (resultado) {
                usuarioModel.achaIdUsuario(email, senha, fkEmpresa)
                    .then(function(resultado){
                        usuarioModel.criaAcessoUsuario(resultado[0].idUsuario, idMaquina)
                        res.json(resultado)
                    }).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao achar o id! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    )
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listar(req, res){
    var fkEmpresa = req.body.fkEmpresaServer
    usuarioModel.listarModel(fkEmpresa) //Depois é necessário adicionar os parâmetros após o login estar funcionando
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
}

function editarUser(req, res){
    var idUsuario = req.body.idUser
    var nome = req.body.nomeServer
    var email = req.body.emailServer
    var senha = req.body.senhaUpdateServer
    var maquina = req.body.idMaquinaServer 
    usuarioModel.editarUsuarioModel(idUsuario, nome, email, senha)
        .then(resultado => {
            usuarioModel.editarAcessoUserModel(idUsuario, maquina)
            res.json(resultado);
        })
        .catch(erro => {
            console.error('Erro ao editar o usuário:', erro);
            console.error('Detalhes do erro SQL:', erro.sqlMessage);
            res.status(500).json({ error: 'Erro ao editar o usuário.' });
        });
}

function excluirUser(req, res){
    var idUsuario = req.body.idUserServer;
    usuarioModel.excluirAcessoModel(idUsuario)
        .then(resultado =>{
            usuarioModel.excluirUsuarioModel(idUsuario)
            res.json(resultado);
        })
        .catch(erro => {
            console.error('Erro ao excluir o usuário:', erro);
            console.error('Detalhes do erro SQL:', erro.sqlMessage);
            res.status(500).json({ error: 'Erro ao excluir o usuário.' });
        });
}

module.exports = {
    cadastrar, listar, editarUser, excluirUser
}

