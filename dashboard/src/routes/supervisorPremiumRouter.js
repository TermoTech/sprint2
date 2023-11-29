const express = require("express");
const router = express.Router();

var filtrarController = require("../controllers/filtrarController")
var painelController = require("../controllers/painelController")

router.get("/painel", (req, res) => {
    res.render("supervisorPremium/painel");
})

router.get("/historico", (req, res) => {
    res.render("supervisorPremium/historico");
})

router.get("/maquinas", (req, res) => {
    res.render("supervisorPremium/maquinas");
})

router.get("/usuarios", (req, res) => {
    res.render("supervisorPremium/usuarios");
})

router.post("/filtrarGeral", (req, res) => {
    filtrarController.filtrarGeral(req, res);
})

router.post("/tempoReal", (req, res) => {
    painelController.tempoReal(req, res);
})

router.post("/listarMaquinas", (req, res) => {
    painelController.exibeConfigsMaquina(req, res);
});

router.post("/listarUmaMaquina", (req, res) => {
    painelController.listarUmaMaquina(req, res);
});


module.exports = router;