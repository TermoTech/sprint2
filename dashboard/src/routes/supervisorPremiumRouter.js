const express = require("express");
const router = express.Router();

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

module.exports = router;