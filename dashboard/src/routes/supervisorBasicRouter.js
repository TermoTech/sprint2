const express = require("express");
const router = express.Router();

var usuarioController = require("../controllers/usuarioController");
var maquinaConfigController = require("../controllers/maquinasController");
var painelController = require("../controllers/painelController");

// Rotas de backend serão feitas pelo supervisorBasic ---------------------------------------

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

// Rotas para funções da tela de criar funcionários------------------------------------------

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

// Rotas para funções da tela de máquinas---------------------------------------------------------

router.post("/maquinas/listar", (req, res) => {
    maquinaConfigController.exibeConfigsMaquina(req, res)
})

router.post("/maquinas/updateSetup", (req, res) => {
    maquinaConfigController.updateSetupController(req, res)
})

router.post("/maquinas/mostraConfigsMaquina", (req, res) => {
    maquinaConfigController.mostraProcessosController(req, res)
})


//Rotas para a função da tela painel---------------------------------------------------------------
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