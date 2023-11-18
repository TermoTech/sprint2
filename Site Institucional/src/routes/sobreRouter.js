const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("siteInstitucional/sobre");
})

module.exports = router;