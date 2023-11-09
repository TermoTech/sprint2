const express = require("express");
const path = require("path");
const app = express();

const port = 8080;

app.use("/staticSite", express.static(__dirname + "/Site Institucional/src"));
app.use("/staticDashboard", express.static(__dirname + "/dashboard/src"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port);
});

// Routes do site institucional
const indexRouter = require("./Site Institucional/src/routes/indexRouter");
const simuladorRouter = require("./Site Institucional/src/routes/simuladorRouter");
const loginRouter = require("./Site Institucional/src/routes/loginRouter");
const sobreRouter = require("./Site Institucional/src/routes/sobreRouter");

app.get("/", indexRouter);
app.get("/simulador", simuladorRouter);
app.get("/login", loginRouter);
app.get("/sobre", sobreRouter);

// Routes das dashboards
const supervisorBasicRouter = require("./dashboard/src/routes/supervisorBasicRouter");
const supervisorPremiumRouter = require("./dashboard/src/routes/supervisorPremiumRouter");
const usuarioBasicRouter = require("./dashboard/src/routes/usuarioBasicRouter");
const usuarioPremiumRouter = require("./dashboard/src/routes/usuarioPremiumRouter");

app.get("/supervisorBasic/painel", supervisorBasicRouter);
app.get("/supervisorBasic/historico", supervisorBasicRouter);
app.get("/supervisorBasic/maquinas", supervisorBasicRouter);
app.get("/supervisorBasic/usuarios", supervisorBasicRouter);

app.get("/supervisorPremium/painel", supervisorPremiumRouter);
app.get("/supervisorPremium/historico", supervisorPremiumRouter);
app.get("/supervisorPremium/maquinas", supervisorPremiumRouter);
app.get("/supervisorPremium/usuarios", supervisorPremiumRouter);

app.get("/usuarioBasic/painel", usuarioBasicRouter);
app.get("/usuarioBasic/historico", usuarioBasicRouter);
app.get("/usuarioBasic/maquinas", usuarioBasicRouter);

app.get("/usuarioPremium/painel", usuarioPremiumRouter);
app.get("/usuarioPremium/historico", usuarioPremiumRouter);
app.get("/usuarioPremium/maquinas", usuarioPremiumRouter);