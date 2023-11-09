const express = require("express");
const router = express.Router();

router.get("/sobre", (req, res) => {
    res.render("siteInstitucional/sobre");
})

module.exports = router;