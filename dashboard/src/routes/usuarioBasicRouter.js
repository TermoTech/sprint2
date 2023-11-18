const express = require("express");
const router = express.Router();

router.get("/painel", (req, res) => {
    res.render("usuarioBasic/painel");
})

router.get("/historico", (req, res) => {
    res.render("usuarioBasic/historico");
})

router.get("/maquinas", (req, res) => {
    res.render("usuarioBasic/maquinas");
})

module.exports = router;