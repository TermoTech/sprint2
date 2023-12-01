setTimeout(plotarGraficos, 1000);
setInterval(geraDados, 5000);
var listaGraficos;
var listaMaquinas = [];

function plotarGraficos() {
  var empresa = sessionStorage.FK_EMPRESA;
  var acesso = sessionStorage.ACESSO_USUARIO;
  var id = sessionStorage.ID_USUARIO;

  fetch("/supervisorBasic/listarMaquinas", {
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

  fetch("/supervisorBasic/tempoReal", {
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

        for (
          var i = 0;
          i < listaMaquinas.length;
          i += 1
        ) {
          var id = listaMaquinas[i];
          var progressReator = document.getElementById(`progress_reator${id}`);
          var progressMatriz = document.getElementById(`progress_matriz${id}`);
          var progressAnel = document.getElementById(`progress_anel${id}`);
  

          var tempReator = document.getElementById(`temp_reator${id}`);
          var tempMatriz = document.getElementById(`temp_matriz${id}`);
          var tempAnel = document.getElementById(`temp_anel${id}`);


          if (id == dados.idDaMaquina) {
            //reator
            progressReator.value = dados.temperaturaReator;
            //progressReator.min = dados.minReator;
            // progressReator.max = dados.maxReator;
            tempReator.innerHTML = dados.temperaturaReator;

            //Anels
            progressAnel.value = dados.temperaturaAnelResfriamento;
            //progressAnel.min = dados.maxAnel;
            // progressAnel.max = dados.minAnel;
            tempAnel.innerHTML = dados.temperaturaAnelResfriamento;

            //Matriz
            progressMatriz.value = dados.temperaturaMatriz;
            //progressMatriz.min = dados.minMatriz;
            // progressMatriz.max = dados.maxMatriz;
            tempMatriz.innerHTML = dados.temperaturaMatriz;

          } else{
            //Número random
            

            //reator
            progressReator.value = dados.temperaturaReator + 5;
            //progressReator.min = dados.minReator;
            //progressReator.max = dados.maxReator;
            tempReator.innerHTML = dados.temperaturaReator + 5;

            //Anel
            progressAnel.value = dados.temperaturaAnelResfriamento + 3;
            //progressAnel.min = dados.maxAnel;
            //progressAnel.max = dados.minAnel;
            tempAnel.innerHTML = dados.temperaturaAnelResfriamento + 3;

            //Matriz
            progressMatriz.value = dados.temperaturaMatriz - 6;
            //progressMatriz.min = dados.minMatriz;
            // progressMatriz.max = dados.maxMatriz;
            tempMatriz.innerHTML = dados.temperaturaMatriz  - 6;
          }
        }

        var dadosMatriz = dados.temperaturaMatriz;
        var dadosAnelResfriamento = dados.temperaturaAnelResfriamento;
        var dadosReator = dados.temperaturaReator;
        var time = new Date();
        var hora = time.getHours();
        var minutos = time.getMinutes();
        var tempo = `${hora}:${minutos}`;

        atualizarGrafico(dadosMatriz, dadosReator, dadosAnelResfriamento, tempo);
      });
    }
  })
}

function atualizarGrafico(dadosMatriz, dadosReator, dadosAnelResfriamento, tempo) {
  if (listaGraficos.data.labels.length == 10) listaGraficos.data.labels.shift();
  listaGraficos.data.labels.push(tempo);

  if (listaGraficos.data.datasets[0].data.length == 10) listaGraficos.data.datasets[0].data.shift();
  listaGraficos.data.datasets[0].data.push(dadosMatriz);

  if (listaGraficos.data.datasets[1].data.length == 10) listaGraficos.data.datasets[1].data.shift();
  listaGraficos.data.datasets[1].data.push(dadosAnelResfriamento);

  if (listaGraficos.data.datasets[2].data.length == 10) listaGraficos.data.datasets[2].data.shift();
  listaGraficos.data.datasets[2].data.push(dadosReator);

  listaGraficos.update();
}

var selectorMachine = document.getElementById("selector_machine");

var grafico = "";

selectorMachine.addEventListener("change", function () {
  var valueSelectedMachine = Number(selectorMachine.value);
  var mostrarGrafico = document.getElementById("chart_machine1");

  fetch("/supervisorBasic/listarUmaMaquina", {
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


//Logica alerta

// function verificaAlerta(tempM, tempA, tempR, umidade,hora, maquina){
//     const divAlerta = document.getElementById('div_alerta');

//     if(tempM < 300 && tempM >= 290){
//         divAlerta.style.display = 'block'

//         divAlerta.innerHTML += `
//             <div class='container-alert'>
//                 <h1>ATENÇÃO</h1>
//                 <h2>Temperatura perto <br> do limite.<br>Melhor ir verificar!!!</h2>
//                 <h5>O problema esta na ${maquina}<br><br>
//                 O registro ocorreu as ${hora}<br><br>
//                 A parte do processo perto do limite<br> é a da MATRIZ!!!<br><br>
//                 Temperatura registrada ${tempM}°C
//                 </h5>
//             </div>
//         `;
//     } else if (tempM == 300){
//         divAlerta.style.display += 'block'

//         divAlerta.innerHTML += `
//         <div class='container-alert'
//             <h1>PERIGO!!!</h1>
//             <h2>Temperatura chegou ao limite.<br>Você deve ir verificar AGORA!!!</h2>
//             <h5>O problema esta na ${maquina}<br><br>
//             O registro ocorreu as ${hora}<br><br>
//             A parte no limite é a da MATRIZ!!!<br><br>
//             Temperatura registrada ${tempM}°C
//             </h5>
//         </div>
//     `;
//     }
//     if(tempA < 80 && tempA >= 70){
//         divAlerta.style.display += 'block'

//         divAlerta.innerHTML += `
//             <div class='container-alert'>
//                 <h1>ATENÇÃO</h1>
//                 <h2>Temperatura perto <br> do limite.<br>Melhor ir verificar!!!</h2>
//                 <h5>O problema esta na ${maquina}<br><br>
//                 O registro ocorreu as ${hora}<br><br>
//                 A parte do processo perto do limite <br>é a do ANEL DE RESFRIAMENTO!!!<br><br>
//                 Temperatura registrada ${tempA}°C
//                 </h5>
//             </div>
//         `;
//     } else if (tempA == 80){
//         divAlerta.style.display = 'block'

//         divAlerta.innerHTML += `
//         <div class='container-alert'
//             <h1>PERIGO!!!</h1>
//             <h2>Temperatura chegou ao limite.<br>Você deve ir verificar AGORA!!!</h2><br>
//             <h5>O problema esta na ${maquina}<br><br>
//             O registro ocorreu as ${hora}<br><br>
//             A parte no limite é a do <br> ANEL DE RESFRIAMENTO!!!<br><br>
//             Temperatura registrada ${tempA}°C
//             </h5>
//         </div>
//     `;
//     }
//     if(tempR < 300 && tempR >= 290){
//         divAlerta.style.display = 'block'

//         divAlerta.innerHTML += `
//             <div class='container-alert'>
//                 <h1>ATENÇÃO</h1>
//                 <h2>Temperatura perto <br> do limite.<br>Melhor ir verificar!!!</h2><br>
//                 <h5>O problema esta na ${maquina}<br><br>
//                 O registro ocorreu as ${hora}<br><br>
//                 A parte do processo perto do limite <br> é a do REATOR!!<br><br>
//                 Temperatura registrada ${tempR}°C
//                 </h5>
//             </div>
//         `;
//     } else if (tempR == 300){
//         divAlerta.style.display = 'block'

//         divAlerta.innerHTML += `
//         <div class='container-alert'
//             <h1>PERIGO!!!</h1>
//             <h2>Temperatura chegou ao limite.<br>Você deve ir verificar AGORA!!!</h2><br>
//             <h5>O problema esta na ${maquina}<br><br>
//             O registro ocorreu as ${hora}<br><br>
//             A parte no limite é a do <br> REATOR!!!<br><br>
//             Temperatura registrada ${tempR}°C
//             </h5>
//         </div>
//     `;
//     }
//     // if(umidade < 100 && umidade >= 90){
//     //     divAlerta.style.display += 'block'

//     //     divAlerta.innerHTML += `
//     //         <div class='container-alert'>
//     //             <h1>ATENÇÃO</h1>
//     //             <h2>Umidade perto <br> do limite.<br>Melhor ir verificar!!!</h2><br>
//     //             <h5>O problema esta na ${maquina}<br><br>
//     //             O registro ocorreu as ${hora}<br><br>
//     //             Umidade registrada ${umidade}%.
//     //             </h5>
//     //         </div>
//     //     `;
//     // } else if (umidade == 100){
//     //     divAlerta.style.display = 'block'

//     //     divAlerta.innerHTML += `
//     //     <div class='container-alert'
//     //         <h1>PERIGO!!!</h1>
//     //         <h2>Temperatura chegou ao limite.<br>Você deve ir verificar AGORA!!!</h2>
//     //         <h5>O problema esta na ${maquina}<br>
//     //         O registro ocorreu as ${hora}<br>
//     //         Umidade registrada ${umidade}%.
//     //         </h5>
//     //     </div>
//     // `;
//     // }
//     var btnClose = document.getElementById('btn_close').addEventListener('click', () => {
//         divAlerta.style.display = 'none';
//         divAlerta.innerHTML =`
//         <button id="btn_close" class="btn-close-alert">FECHAR</button>
//         `
//     })
// }