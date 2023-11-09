const express = require("express");
const router = express.Router();

router.get("/supervisorPremium/painel", (req, res) => {
    res.render("supervisorPremium/painel");
})

router.get("/supervisorPremium/historico", (req, res) => {
    res.render("supervisorPremium/historico");
})

router.get("/supervisorPremium/maquinas", (req, res) => {
    res.render("supervisorPremium/maquinas");
})

router.get("/supervisorPremium/usuarios", (req, res) => {
    res.render("supervisorPremium/usuarios");
})

module.exports = router;