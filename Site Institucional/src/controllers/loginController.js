const model = require("../models/loginModel");

function entrar(req, res) {
    var login = req.body.login;
    var senha = req.body.senha;

    if (login == undefined) {
        res.status(400).send("O login não foi definido");
    } else if (senha == undefined) {
        res.status(400).send("A senha não foi definida");
    } else {
        model.entrar (login, senha)
        .then(
            (result) => {
                if (result) {
                    res.json({
                        id: result[0].idUsuario,
                        nome: result[0].nome,
                        acesso: result[0].acesso,
                        fkEmpresa: result[0].fkEmpresa
                    })
                } else {
                    res.status(403).send("Email e/ou senha inválidos");
                }
            }
        ).catch(
            (error) => {
                console.log(error);
                console.log("Erro ", error.sqlMessage);
                res.status(500).json(error.sqlMessage);
            }
        );
    }
}

module.exports = {entrar}