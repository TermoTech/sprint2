const express = require("express");
const router = express.Router();

router.get("/usuarioPremium/painel", (req, res) => {
    res.render("usuarioPremium/painel");
})

router.get("/usuarioPremium/historico", (req, res) => {
    res.render("usuarioPremium/historico");
})

router.get("/usuarioPremium/maquinas", (req, res) => {
    res.render("usuarioPremium/maquinas");
})

module.exports = router;