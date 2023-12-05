const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080 ;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


// Aqui configuramos as pastas de onde serão servidos os arquivos estáticos tanto do site quanto da dashboard.
// Como criamos duas pastas diferentes para os arquivos, foi necessário configurar cada um com um caminho diferente.
// Para linkar um arquivo como CSS ou JS do site, basta digitar "/staticSite" e o caminho para o arquivo dentro da pasta src do site,
// para linkar um arquivo como CSS ou JS da dashboard, basta digitar "/staticDashboard" e o caminho para o arquivo dentro da pasta src da dashboard.
app.use("/staticSite", express.static(__dirname + "/Site Institucional/src"));
app.use("/staticDashboard", express.static(__dirname + "/dashboard/src"));


// Aqui configuramos a view engine para rendenizar arquivos html da pasta views
// isso faz com que não fique aparecendo aquele .html na url do site
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/views"));

// Aqui fazemos o servidor setar 
app.listen(PORTA, () => {
    console.log("Servidor iniciado na porta " + PORTA);
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
