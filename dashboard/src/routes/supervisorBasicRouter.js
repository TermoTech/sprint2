const express = require("express");
const router = express.Router();
var usuariosModels = require("../controllers/usuarioController");

router.get("/supervisorBasic/painel", (req, res) => {
    res.render("supervisorBasic/painel");
})

router.get("/supervisorBasic/historico", (req, res) => {
    res.render("supervisorBasic/historico");
})

router.get("/supervisorBasic/maquinas", (req, res) => {
    res.render("supervisorBasic/maquinas");
})

router.get("/supervisorBasic/usuarios", (req, res) => {
    res.render("supervisorBasic/usuarios");
})

router.post("/supervisorBasic/usuarios/cadastrar", function (req, res) {
    usuariosModels.cadastrar(req, res);
});

module.exports = router;