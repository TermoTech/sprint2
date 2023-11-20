const express = require("express");
const router = express.Router();
var usuarioController = require("../controllers/usuarioController");

router.get("/painel", (req, res) => {
    res.render("supervisorBasic/painel");
})

router.get("/historico", (req, res) => {
    res.render("supervisorBasic/historico");
})

router.get("/maquinas", (req, res) => {
    res.render("supervisorBasic/maquinas");
})

router.get("/usuarios", (req, res) => {
    res.render("supervisorBasic/usuarios");
})

router.post("/cadastrar", (req, res) => {
    usuarioController.cadastrar(req, res);
})

module.exports = router;