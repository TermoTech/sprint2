setTimeout(plotarGraficos, 1000);
setInterval(geraDados, 1000);
var listaGraficos;

function plotarGraficos() {
  var empresa = sessionStorage.FK_EMPRESA;
  var acesso = sessionStorage.ACESSO_USUARIO;
  var id = sessionStorage.ID_USUARIO;

  fetch("/supervisorPremium/listarMaquinas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fkEmpresaServer: empresa,
      acessoServer: acesso,
      idServer: id
    })
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));

        var mostrarGrafico = document.getElementById("chart_machine1");
        var barraMaquina = document.getElementById("div_chart2");
        var selectMaquinas = document.getElementById("selector_machine");

        for (
          var cont = 0;
          cont < resposta.length;
          cont += 1
        ) {
          var dados = resposta[cont];

          if (cont == 0) {
            mostrarGrafico.innerHTML = `
            <canvas id="myChart${dados.idMaquina}"></canvas>
          `;
            var cxt = document.getElementById(`myChart${dados.idMaquina}`);

            var chart = new Chart(cxt, {
              type: "line",
              data: {
                labels: [],
                datasets: [
                  {
                    label: "Matriz",
                    data: [],
                    borderWidth: 1,
                    borderColor: "red",
                  },
                  {
                    label: "Anel de Resfriamento",
                    data: [],
                    borderWidth: 1,
                    borderColor: "blue",
                  },
                  {
                    label: "Reator",
                    data: [],
                    borderWidth: 1,
                    borderColor: "green",
                  },
                  {
                    label: "Umidade",
                    data: [],
                    borderWidth: 1,
                    borderColor: "orange",
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Medidas Atuais',
                    fontSize: 18
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },

                },

              },
            });

            listaGraficos = chart;
          }

          selectMaquinas.innerHTML += `
          <option value="${dados.idMaquina}">Máquina ${dados.idMaquina}</option>
          `;

          barraMaquina.innerHTML += `
          <div class="div-maquinas-geral">

          <div class="div-maquinas-geral-titulo">
            <h1>Máquina ${dados.idMaquina}</h1>
          </div>

          <div class="div-maquinas-geral-conteudo">

            <div class="div-maquinas-geral-filho">
              <div class="div-maquinas-geral-neto">
                <h1>Reator</h1>
              </div>
              <div class="div-maquinas-geral-neto">
                <h1>Matriz</h1>
              </div>
              <div class="div-maquinas-geral-neto">
                <h1>Anel de Resfriamento</h1>
              </div>
              <div class="div-maquinas-geral-neto">
                <h1>Umidade do ar</h1>
              </div>
            </div>

            <div class="div-maquinas-geral-filho">

              <div class="div-maquinas-geral-neto">
                <progress id="progress_reator${dados.idMaquina}" class="barra-progresso" value="0" max="300" min="10"></progress>
              </div>

              <div class="div-maquinas-geral-neto">
                <progress id="progress_matriz${dados.idMaquina}" class="barra-progresso" value="0" max="300" min="15"></progress>
              </div>

              <div class="div-maquinas-geral-neto">
                <progress id="progress_anel${dados.idMaquina}" class="barra-progresso" value="0" max="100" min="20"></progress>
              </div>

              <div class="div-maquinas-geral-neto">
                <progress id="progress_umidade${dados.idMaquina}" class="barra-progresso" value="0" max="100" min="10"></progress>
              </div>

            </div>

            <div class="div-maquinas-geral-filho">
              <div class="div-maquinas-geral-neto">
                <span>Temperatura atual </span>
                <span id="temp_reator${dados.idMaquina}">00</span>°C
              </div>

              <div class="div-maquinas-geral-neto">
                <span>Temperatura atual </span>
                <span id="temp_matriz${dados.idMaquina}">00</span>°C
              </div>

              <div class="div-maquinas-geral-neto">
                <span>Temperatura atual</span>
                <span id="temp_anel${dados.idMaquina}">00</span>°C
              </div>

              <div class="div-maquinas-geral-neto">
                <span>Umidade do ar</span>
                <span id="umidade_maq${dados.idMaquina}">00</span>%
              </div>

            </div>
          </div>
        </div>
          `;
        }

      });
    }
  })
}

var temperaturasMatriz = [];
var temperaturasAnelResfriamento = [];
var temperaturasReator = [];
var temperaturasUmidade = [];
var tempo = [];
var ultimaHoraApresentada = new Date();
var indexChart = 0;
var nomeMaquina = ``;
var dadosMatriz = 0;
var dadosAnelResfriamento = 0;
var dadosReator = 0;
var dadosUmidade = 0;
var time = new Date(ultimaHoraApresentada);

// PUXANDO OS DADOS DO BANCO DE DADOS EM TEMPO REAL
function geraDados() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var idMaquina = Number(selectorMachine.value);

  fetch("/supervisorPremium/tempoReal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fkEmpresaServer: fkEmpresa,
      maquinaServer: idMaquina
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));
      
          var dados = resposta[0][0];
          
          var progressReator = document.getElementById(`progress_reator${dados.idDaMaquina}`);
          var progressMatriz = document.getElementById(`progress_matriz${dados.idDaMaquina}`);
          var progressAnel = document.getElementById(`progress_anel${dados.idDaMaquina}`);
          var progressUmidade = document.getElementById(`progress_umidade${dados.idDaMaquina}`);

          //reator
          progressReator.value = dados.temperaturaReator;
          //progressReator.min = dados.minReator;
          //progressReator.max = dados.maxReator;

          //Anel
          progressAnel.value = dados.temperaturaAnelResfriamento;
          //progressAnel.min = dados.maxAnel;
          //progressAnel.max = dados.minAnel;

          //Matriz
          progressMatriz.value = dados.temperaturaMatriz;
          //progressMatriz.min = dados.minMatriz;
         // progressMatriz.max = dados.maxMatriz;

          //Umidade
          progressUmidade.value = dados.umidadeMaquina;
          //progressUmidade.max = dados.maxUmidade;
          //progressUmidade.min = dados.minUmidade;
          
          var dadosMatriz = dados.temperaturaMatriz;
          var dadosAnelResfriamento = dados.temperaturasAnelResfriamento;
          var dadosReator = dados.temperaturaReator;
          var dadosUmidade = dados.umidadeMaquina;
          var time = new Date();
          var hora = time.getHours();
          var minutos = time.getMinutes();
          var tempo = `${hora}:${minutos}`;      

          listaGraficos.labels.shift();
          listaGraficos.labels.push(tempo)

          listaGraficos.datasets[0].shift();
          listaGraficos.datasets[0].push(dadosMatriz);

          listaGraficos.datasets[1].shift();
          listaGraficos.datasets[1].push(dadosAnelResfriamento);

          listaGraficos.datasets[2].shift();
          listaGraficos.datasets[2].push(dadosReator);

          listaGraficos.datasets[3].shift();
          listaGraficos.datasets[3].push(dadosUmidade);
      });
    }
  })

  if (indexChart >= 1) {
    time.setMinutes(time.getMinutes());
  }
  var horaComoString = time.getHours() + ":" + time.getMinutes();

  indexChart++;

  ultimaHoraApresentada = new Date(time);
}

function updateProgress(dMatriz, dAnelResfriamento, dReator, dUmidade) {
  progress_reator1.value = dReator;
  progress_matriz1.value = dMatriz;
  progress_anel1.value = dAnelResfriamento;
  progress_umidade1.value = dUmidade;
  temp_reator1.innerHTML = dReator;
  temp_matriz1.innerHTML = dMatriz;
  temp_anel1.innerHTML = dAnelResfriamento;
  umidade_maq1.innerHTML = dUmidade;
}

function updateChart(dMatriz, dAnelResfriamento, dReator, dUmidade, t) {
  //Gráficos
  temperaturasMatriz.push(dMatriz);
  temperaturasAnelResfriamento.push(dAnelResfriamento);
  temperaturasReator.push(dReator);
  temperaturasUmidade.push(dUmidade);
  tempo.push(t);
  //Ranges

  if (tempo.length > 10) {
    tempo.shift();
    temperaturasMatriz.shift();
    temperaturasAnelResfriamento.shift();
    temperaturasReator.shift();
    temperaturasUmidade.shift();
  }

  if (!chart) {
    var ctx = document.getElementById("myChart");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: tempo,
        datasets: [
          {
            label: "Matriz",
            data: temperaturasMatriz,
            borderWidth: 1,
            borderColor: "red",
          },
          {
            label: "Anel de Resfriamento",
            data: temperaturasAnelResfriamento,
            borderWidth: 1,
            borderColor: "blue",
          },
          {
            label: "Reator",
            data: temperaturasReator,
            borderWidth: 1,
            borderColor: "green",
          },
          {
            label: "Umidade",
            data: temperaturasUmidade,
            borderWidth: 1,
            borderColor: "orange",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Medidas Atuais',
            fontSize: 18
          },
          legend: {
            display: true,
            position: "bottom",
          },

        },

      },
    });
  } else {
    chart.data.labels = tempo;
    chart.data.datasets[0].data = temperaturasMatriz;
    chart.data.datasets[1].data = temperaturasAnelResfriamento;
    chart.data.datasets[2].data = temperaturasReator;
    chart.data.datasets[3].data = temperaturasUmidade;
    chart.update();
  }
}
//setInterval(geraDados, 2000);

//Gerando dados do segundo gráfico

var temperaturasMatriz2 = [];
var temperaturasAnelResfriamento2 = [];
var temperaturasReator2 = [];
var temperaturasUmidade2 = [];
var tempo2 = [];
var chart2;
var ultimaHoraApresentada2 = new Date();
var indexChart2 = 0;

function geraDados2() {
  var nomeMaquina = "Maquina 2";

  var dadosMatriz2 = Math.floor(Math.random() * (300 - 150) + 150);
  var dadosAnelResfriamento2 = Math.floor(Math.random() * (80 - 20) + 20);
  var dadosReator2 = Math.floor(Math.random() * (300 - 100) + 100);
  var dadosUmidade2 = Math.floor(Math.random() * (100 - 20) + 20);
  var time2 = new Date(ultimaHoraApresentada2);
  if (indexChart2 >= 1) {
    time2.setMinutes(time2.getMinutes());
  }
  var horaComoString2 = time2.getHours() + ":" + time2.getMinutes();

  indexChart2++;

  ultimaHoraApresentada2 = new Date(time2);
  updateChart2(
    dadosMatriz2,
    dadosAnelResfriamento2,
    dadosReator2,
    dadosUmidade2,
    horaComoString2
  );
  updateProgress2(
    dadosMatriz2,
    dadosAnelResfriamento2,
    dadosReator2,
    dadosUmidade2
  );
  verificaAlerta(
    dadosMatriz2,
    dadosAnelResfriamento2,
    dadosReator2,
    dadosUmidade2,
    horaComoString2,
    nomeMaquina
  );
}

function updateProgress2(dMatriz2, dAnelResfriamento2, dReator2, dUmidade2) {
  progress_reator2.value = dReator2;
  progress_matriz2.value = dMatriz2;
  progress_anel2.value = dAnelResfriamento2;
  progress_umidade2.value = dUmidade2;
  temp_reator2.innerHTML = dReator2;
  temp_matriz2.innerHTML = dMatriz2;
  temp_anel2.innerHTML = dAnelResfriamento2;
  umidade_maq2.innerHTML = dUmidade2;
}

function updateChart2(dMatriz2, dAnelResfriamento2, dReator2, dUmidade2, t2) {
  //Gráficos
  temperaturasMatriz2.push(dMatriz2);
  temperaturasAnelResfriamento2.push(dAnelResfriamento2);
  temperaturasReator2.push(dReator2);
  temperaturasUmidade2.push(dUmidade2);
  tempo2.push(t2);
  //Ranges

  if (tempo2.length > 10) {
    tempo2.shift();
    temperaturasMatriz2.shift();
    temperaturasAnelResfriamento2.shift();
    temperaturasReator2.shift();
    temperaturasUmidade2.shift();
  }

  if (!chart2) {
    var ctx2 = document.getElementById("myChart2");
    chart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: tempo2,
        datasets: [
          {
            label: "Matriz",
            data: temperaturasMatriz2,
            borderWidth: 1,
            borderColor: "red",
          },
          {
            label: "Anel de Resfriamento",
            data: temperaturasAnelResfriamento2,
            borderWidth: 1,
            borderColor: "blue",
          },
          {
            label: "Reator",
            data: temperaturasReator2,
            borderWidth: 1,
            borderColor: "green",
          },
          {
            label: "Umidade",
            data: temperaturasUmidade2,
            borderWidth: 1,
            borderColor: "orange",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Medidas Atuais',
            fontSize: 180
          },
          legend: {
            display: true,
            position: "bottom",
          },

        },
      },
    });
  } else {
    chart2.data.labels = tempo;
    chart2.data.datasets[0].data = temperaturasMatriz2;
    chart2.data.datasets[1].data = temperaturasAnelResfriamento2;
    chart2.data.datasets[2].data = temperaturasReator2;
    chart2.data.datasets[3].data = temperaturasUmidade2;
    chart2.update();
  }
}
//setInterval(geraDados2, 2000);

var selectorMachine = document.getElementById("selector_machine");

var grafico ="";

selectorMachine.addEventListener("change", function () {
  var valueSelectedMachine = Number(selectorMachine.value);
  var mostrarGrafico = document.getElementById("chart_machine1");
  
  fetch("/supervisorPremium/listarUmaMaquina", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idMaquina: valueSelectedMachine
    })
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));
        mostrarGrafico.innerHTML = `
          <canvas id="myChart${valueSelectedMachine}"></canvas>
        `;

        var cxt = document.getElementById(`myChart${valueSelectedMachine}`);

            chart = new Chart(cxt, {
              type: "line",
              data: {
                labels: "tem",
                datasets: [
                  {
                    label: "Matriz",
                    data: [220, 330, 110],
                    borderWidth: 1,
                    borderColor: "red",
                  },
                  {
                    label: "Anel de Resfriamento",
                    data: [220, 330, 110],
                    borderWidth: 1,
                    borderColor: "blue",
                  },
                  {
                    label: "Reator",
                    data: [220, 330, 110],
                    borderWidth: 1,
                    borderColor: "green",
                  },
                  {
                    label: "Umidade",
                    data: [220, 330, 110],
                    borderWidth: 1,
                    borderColor: "orange",
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Medidas Atuais',
                    fontSize: 18
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },

                },

              },
            });
            listaGraficos = chart;
    });
  }
});
})

const divAlerta = document.getElementById("div_alerta");

function alerta() {
  alert("Alerta!", "Temperatura em ");
}

// function alertaSwal() {
//   swal("Atencao", "Temperatura atual XX", "info");
// }
function alertaDiv() {

  divAlerta.style.display = "block";

  divAlerta.innerHTML += `
        <div class='container-alert'
            <h1>PERIGO!!!</h1>
            <h2>Temperatura chegou ao limite.<br>Você deve ir verificar AGORA!!!</h2>
            <h5>O problema esta na MaquinaXX<br><br>
            O registro ocorreu as 00:00<br><br>
            A parte no limite é a da MATRIZ!!!<br><br>
            Temperatura registrada XX°C
            </h5>
        </div>
    `;

  var btnClose = document
    .getElementById("btn_close")
    .addEventListener("click", () => {
      divAlerta.style.display = "none";
      divAlerta.innerHTML = ``;
    });
}

// //Logica alerta

// function verificaAlerta(tempM, tempA, tempR, umidade, hora, maquina) {
//   const divAlerta = document.getElementById("div_alerta");
//   if (tempM < 300 && tempM >= 290) {
//     // swal é o mesmo que o alert, mas com uma estilização
//     // para usar é do mesmo jeito, chama a tag swal e informa o que quer exibir
//     // alguns parametros diferentes:
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempM}°C
//         Registro: ${hora}
//         `,
//       "info"
//     );
//   } else if (tempM == 300) {
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempM}°C
//         Registro: ${hora}
//         `,
//       "error"
//     );
//   }
//   if (tempA < 80 && tempA >= 70) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempA}°C
//           Registro: ${hora}
//           `,
//       "info"
//     );
//   } else if (tempA == 80) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempA}°C
//           Registro: ${hora}
//           `,
//       "error"
//     );
//   }
//   if (tempR < 300 && tempR >= 290) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempR}°C
//         Registro: ${hora}
//         `,
//       "info"
//     );
//   } else if (tempR == 300) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempM}°C
//           Registro: ${hora}
//           `,
//       "error"
//     );
//   }
//   if (umidade < 100 && umidade >= 90) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A Umidade da sala esta  em ${umidade}%
//           Registro: ${hora}
//           `,
//       "info"
//     );
//   } else if (umidade == 100) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A Umidade da sala esta  em ${umidade}%
//           Registro: ${hora}
//           `,
//       "error"
//     );
//   }
//   var btnClose = document
//     .getElementById("btn_close")
//     .addEventListener("click", () => {
//       divAlerta.style.display = "none";
//       divAlerta.innerHTML = `
//         <button id="btn_close" class="btn-close-alert">FECHAR</button>
//         `;
//     });
//   if (tempM < 161 || tempM > 197) {
//     // swal é o mesmo que o alert, mas com uma estilização
//     // para usar é do mesmo jeito, chama a tag swal e informa o que quer exibir
//     // alguns parametros diferentes:
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempM}°C
//         Registro: ${hora}
//         `,
//       "info"
//     );
//   } else if (tempM < 162 || tempM >= 198) {
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempM}°C
//         Registro: ${hora}
//         `,
//       "error"
//     );
//   }
//   if (tempA < 17 || tempA > 26) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempA}°C
//           Registro: ${hora}
//           `,
//       "info"
//     );
//   } else if (tempA < 18 || tempA > 27) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempA}°C
//           Registro: ${hora}
//           `,
//       "error"
//     );
//   }
//   if (tempR < 142 || tempR > 242) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempR}°C
//         Registro: ${hora}
//         `,
//       "info"
//     );
//   } else if (tempR < 144 || tempR > 243) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A temperatura da ${maquina} esta  em ${tempM}°C
//           Registro: ${hora}
//           `,
//       "error"
//     );
//   }
//   if (umidade < 0 || umidade > 44) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A Umidade da sala esta  em ${umidade}%
//           Registro: ${hora}
//           `,
//       "info"
//     );
//   } else if (umidade > 45) {
//     // swal("Titulo" , "texto/paragrafo", "icone")
//     swal(
//       "Atenção",
//       `A Umidade da sala esta  em ${umidade}%
//           Registro: ${hora}
//           `,
//       "error"
//     );
//   }
//   var btnClose = document
//     .getElementById("btn_close")
//     .addEventListener("click", () => {
//       divAlerta.style.display = "none";
//       divAlerta.innerHTML = `
//         <button id="btn_close" class="btn-close-alert">FECHAR</button>
//         `;
//     });
// }

