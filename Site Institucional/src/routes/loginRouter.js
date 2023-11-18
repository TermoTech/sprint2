const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController")

router.get("/", (req, res) => {
    res.render("siteInstitucional/login");
})

router.post("/entrar", (req, res) => {
    loginController.entrar(req, res);
})

module.exports = router;