const model = require("../models/loginModel");

function entrar(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("O email não foi definido");
    } else if (senha == undefined) {
        res.status(400).send("A senha não foi definida");
    } else {
        model.entrar (email, password)
        .then(
            (result) => {
                if (result) {
                    res.json(result);
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