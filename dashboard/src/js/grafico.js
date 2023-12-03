setTimeout(plotarGraficos, 1000);
setInterval(geraDados, 5000);
var listaGraficos;
var listaMaquinas = [];

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
          listaMaquinas.push(dados.idMaquina);

          if (cont == 0) {
            mostrarGrafico.innerHTML = `
            <canvas id="myChart${dados.idMaquina}" height="200"></canvas>
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
          <option value="${dados.idMaquina}">Máquina ${dados.numMaquina}</option>
          `;

          barraMaquina.innerHTML += `
          <div class="div-maquinas-geral">

          <div class="div-maquinas-geral-titulo">
            <h1>Máquina ${dados.numMaquina}</h1>
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
              <div class="progress">
              <p class="porcentagem" id="porcentagem_reator_${dados.idMaquina}">0%</p>
                <div id="progress_reator${dados.idMaquina}" class="barra-progresso">
                </div>
                </div>
              </div>

              <div class="div-maquinas-geral-neto">
                <div class="progress">
                <p class="porcentagem" id="porcentagem_matriz_${dados.idMaquina}">0%</p>
                 <div id="progress_matriz${dados.idMaquina}" class="barra-progresso">
                 </div>
                </div>
              </div>

              <div class="div-maquinas-geral-neto">
              <div class="progress">
              <p class="porcentagem" id="porcentagem_anel_${dados.idMaquina}">0%</p>
              <div id="progress_anel${dados.idMaquina}" class="barra-progresso">
              </div>
              </div>
              </div>

              <div class="div-maquinas-geral-neto">
                <div class="progress">
                <p class="porcentagem" id="porcentagem_umidade_${dados.idMaquina}">0%</p>
                  <div id="progress_umidade${dados.idMaquina}" class="barra-progresso">
                  </div>
                </div>
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

        // for (
        //   var i = 0;
        //   i < listaMaquinas.length;
        //   i += 1
        // ) {
        //   console.log(dados);
        //   var id = listaMaquinas[i];
        //   var progressReator = document.getElementById(`progress_reator${id}`);
        //   var progressMatriz = document.getElementById(`progress_matriz${id}`);
        //   var progressAnel = document.getElementById(`progress_anel${id}`);
        //   var progressUmidade = document.getElementById(`progress_umidade${id}`);

        //   var tempReator = document.getElementById(`temp_reator${id}`);
        //   var tempMatriz = document.getElementById(`temp_matriz${id}`);
        //   var tempAnel = document.getElementById(`temp_anel${id}`);
        //   var maqUmidade = document.getElementById(`umidade_maq${id}`);

        //   if (id == dados.idDaMaquina) {
        //     //reator
        //     progressReator.value = dados.temperaturaReator;
        //     //progressReator.min = dados.minReator;
        //     //progressReator.max = dados.maxReator;
        //     tempReator.innerHTML = dados.temperaturaReator;

        //     //Anels
        //     progressAnel.value = dados.temperaturaAnelResfriamento;
        //     //progressAnel.min = dados.maxAnel;
        //     //progressAnel.max = dados.minAnel;
        //     tempAnel.innerHTML = dados.temperaturaAnelResfriamento;

        //     //Matriz
        //     progressMatriz.value = dados.temperaturaMatriz;
        //     //progressMatriz.min = dados.minMatriz;
        //     // progressMatriz.max = dados.maxMatriz;
        //     tempMatriz.innerHTML = dados.temperaturaMatriz;

        //     //Umidade
        //     progressUmidade.value = dados.umidadeMaquina;
        //     //progressUmidade.max = dados.maxUmidade;
        //     //progressUmidade.min = dados.minUmidade;
        //     maqUmidade.innerHTML = dados.umidadeMaquina;
        //   } else{
        //     //Número random
            

        //     //reator
        //     progressReator.value = dados.temperaturaReator + 5;
        //     //progressReator.min = dados.minReator;
        //     //progressReator.max = dados.maxReator;
        //     tempReator.innerHTML = dados.temperaturaReator + 5;

        //     //Anel
        //     progressAnel.value = dados.temperaturaAnelResfriamento + 3;
        //     //progressAnel.min = dados.maxAnel;
        //     //progressAnel.max = dados.minAnel;
        //     tempAnel.innerHTML = dados.temperaturaAnelResfriamento + 3;

        //     //Matriz
        //     progressMatriz.value = dados.temperaturaMatriz - 6;
        //     //progressMatriz.min = dados.minMatriz;
        //     // progressMatriz.max = dados.maxMatriz;
        //     tempMatriz.innerHTML = dados.temperaturaMatriz  - 6;

        //     //Umidade
        //     progressUmidade.value = dados.umidadeMaquina + 2;
        //     //progressUmidade.max = dados.maxUmidade;
        //     //progressUmidade.min = dados.minUmidade;
        //     maqUmidade.innerHTML = dados.umidadeMaquina + 2;
        //   }
        // }

        var dadosMatriz = dados.temperaturaMatriz;
        var dadosAnelResfriamento = dados.temperaturaAnelResfriamento;
        var dadosReator = dados.temperaturaReator;
        var dadosUmidade = dados.umidadeMaquina;
        var time = new Date();
        var hora = time.getHours();
        var minutos = time.getMinutes();
        var tempo = `${hora}:${minutos}`;

        atualizarGrafico(dadosMatriz, dadosReator, dadosAnelResfriamento, dadosUmidade, tempo);
      });
    }
  })
}

function atualizarGrafico(dadosMatriz, dadosReator, dadosAnelResfriamento, dadosUmidade, tempo) {
  if (listaGraficos.data.labels.length == 10) listaGraficos.data.labels.shift();
  listaGraficos.data.labels.push(tempo);

  if (listaGraficos.data.datasets[0].data.length == 10) listaGraficos.data.datasets[0].data.shift();
  listaGraficos.data.datasets[0].data.push(dadosMatriz);

  if (listaGraficos.data.datasets[1].data.length == 10) listaGraficos.data.datasets[1].data.shift();
  listaGraficos.data.datasets[1].data.push(dadosAnelResfriamento);

  if (listaGraficos.data.datasets[2].data.length == 10) listaGraficos.data.datasets[2].data.shift();
  listaGraficos.data.datasets[2].data.push(dadosReator);

  if (listaGraficos.data.datasets[3].data.length == 10) listaGraficos.data.datasets[3].data.shift();
  listaGraficos.data.datasets[3].data.push(dadosUmidade);

  listaGraficos.update();
}

var selectorMachine = document.getElementById("selector_machine");

var grafico = "";

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
          <canvas id="myChart${valueSelectedMachine}" height="200"></canvas>
        `;

        var cxt = document.getElementById(`myChart${valueSelectedMachine}`);

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

