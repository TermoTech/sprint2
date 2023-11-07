const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.use("/staticSite", express.static(__dirname + "/Site Institucional/src"));
app.use("/staticDashboard", express.static(__dirname + "/dashboard/src"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port);
});

const indexRouter = require("./Site Institucional/src/routes/indexRouter");
const simuladorRouter = require("./Site Institucional/src/routes/simuladorRouter");


app.get("/", indexRouter);
app.get("/simulador", simuladorRouter);