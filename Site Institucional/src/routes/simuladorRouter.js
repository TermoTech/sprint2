const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("siteInstitucional/simulador");
})

module.exports = router;