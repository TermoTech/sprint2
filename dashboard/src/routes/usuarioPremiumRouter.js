const express = require("express");
const router = express.Router();

router.get("/painel", (req, res) => {
    res.render("usuarioPremium/painel");
})

router.get("/historico", (req, res) => {
    res.render("usuarioPremium/historico");
})

router.get("/maquinas", (req, res) => {
    res.render("usuarioPremium/maquinas");
})

module.exports = router;