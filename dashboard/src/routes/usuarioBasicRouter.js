const express = require("express");
const router = express.Router();

router.get("/usuarioBasic/painel", (req, res) => {
    res.render("usuarioBasic/painel");
})

router.get("/usuarioBasic/historico", (req, res) => {
    res.render("usuarioBasic/historico");
})

router.get("/usuarioBasic/maquinas", (req, res) => {
    res.render("usuarioBasic/maquinas");
})

module.exports = router;