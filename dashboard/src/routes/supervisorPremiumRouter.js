const express = require("express");
const router = express.Router();

var filtrarController = require("../controllers/filtrarController")

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

module.exports = router;