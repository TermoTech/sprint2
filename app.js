const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 8080;

app.use("/staticSite", express.static(__dirname + "/Site Institucional/src"));
app.use("/staticDashboard", express.static(__dirname + "/dashboard/src"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port);
});

app.use(cors());

// Routes do site institucional
const indexRouter = require("./Site Institucional/src/routes/indexRouter");
const simuladorRouter = require("./Site Institucional/src/routes/simuladorRouter");
const loginRouter = require("./Site Institucional/src/routes/loginRouter");
const sobreRouter = require("./Site Institucional/src/routes/sobreRouter");

app.use("/", indexRouter);
app.use("/simulador", simuladorRouter);
app.use("/login", loginRouter);
app.use("/sobre", sobreRouter);

// Routes das dashboards
const supervisorBasicRouter = require("./dashboard/src/routes/supervisorBasicRouter");
const supervisorPremiumRouter = require("./dashboard/src/routes/supervisorPremiumRouter");
const usuarioBasicRouter = require("./dashboard/src/routes/usuarioBasicRouter");
const usuarioPremiumRouter = require("./dashboard/src/routes/usuarioPremiumRouter");

app.use("/supervisorBasic", supervisorBasicRouter);

app.use("/supervisorPremium", supervisorPremiumRouter);

app.use("/usuarioBasic", usuarioBasicRouter);

app.use("/usuarioPremium", usuarioPremiumRouter);
