const express = require("express");
const router = express.Router();
var usuarioController = require("../controllers/usuarioController");

// Rotas de backend serão feitas pelo supervisorBasic

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

router.post("/usuarios/listar", (req, res) => {
    usuarioController.listar(req, res);
})

router.post("/usuarios/listarMaquinas", (req, res) => {
    usuarioController.listarMaquinas(req, res);
})

router.put("/editar", (req, res) => {
    usuarioController.editarUser(req, res);
})

router.post("/excluir", (req, res) => {
    usuarioController.excluirUser(req, res);
})

router.post("/cadastrar", (req, res) => {
    usuarioController.cadastrar(req, res);
})

module.exports = router;