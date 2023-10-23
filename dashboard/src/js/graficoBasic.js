var temperaturasMatriz = [];
var temperaturasAnelResfriamento = [];
var temperaturasReator = [];
var temperaturasUmidade = [];
var tempo = [];
var chart;
var ultimaHoraApresentada = new Date();
var indexChart = 0;

function geraDados() {
    var nomeMaquina = 'Maquina 1';
    var dadosMatriz = Math.floor(Math.random() * (300 - 150) + 150);
    var dadosAnelResfriamento = Math.floor(Math.random() * (80 - 20)+ 20);
    var dadosReator = Math.floor(Math.random() * (300 - 100) + 100);
    var dadosUmidade = Math.floor(Math.random() * (100 - 20) + 20);
    var time = new Date(ultimaHoraApresentada);
    if (indexChart >= 1) {
        time.setMinutes(time.getMinutes() + 15);
    }
    var horaComoString = time.getHours() + ':' + time.getMinutes();

    indexChart++;

    ultimaHoraApresentada = new Date(time);
    updateChart(dadosMatriz, dadosAnelResfriamento, dadosReator, dadosUmidade, horaComoString);
    updateProgress(dadosMatriz, dadosAnelResfriamento, dadosReator, dadosUmidade);
    verificaAlerta(dadosMatriz, dadosAnelResfriamento, dadosReator, dadosUmidade, horaComoString, nomeMaquina)
}

function updateProgress(dMatriz, dAnelResfriamento, dReator, dUmidade){
    progress_reator1.value = dReator;
    progress_matriz1.value = dMatriz;
    progress_anel1.value = dAnelResfriamento;
    //progress_umidade1.value = dUmidade;
    temp_reator1.innerHTML = dReator;
    temp_matriz1.innerHTML = dMatriz;
    temp_anel1.innerHTML = dAnelResfriamento;
    //umidade_maq1.innerHTML = dUmidade
}

function updateChart(dMatriz, dAnelResfriamento, dReator, dUmidade, t) {
    //Gráficos
    temperaturasMatriz.push(dMatriz);
    temperaturasAnelResfriamento.push(dAnelResfriamento);
    temperaturasReator.push(dReator);
    //temperaturasUmidade.push(dUmidade);
    tempo.push(t);
    //Ranges
    

    if (tempo.length > 10) {
        tempo.shift();
        temperaturasMatriz.shift();
        temperaturasAnelResfriamento.shift();
        temperaturasReator.shift();
       // temperaturasUmidade.shift();
    }

    if (!chart) {
        var ctx = document.getElementById('myChart');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: tempo,
                datasets: [{
                    label: 'Matriz',
                    data: temperaturasMatriz,
                    borderWidth: 1,
                    borderColor: 'red',
                    
                }, {
                    label: 'Anel de Resfriamento',
                    data: temperaturasAnelResfriamento,
                    borderWidth: 1,
                    borderColor: 'blue'
                }, {
                    label: 'Reator',
                    data: temperaturasReator,
                    borderWidth: 1,
                    borderColor: 'green'
                }//, {
                //     label: 'Umidade',
                //     data: temperaturasUmidade,
                //     borderWidth: 1,
                //     borderColor: 'orange'
                // }
            ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                      display: true,
                      text: 'Medidas Atuais',
                      fontSize: 18
                    },
                    legend: {
                      display:true,
                      position: "bottom",
                    },
          
                  },
            }
        });
    } else {
        chart.data.labels = tempo;
        chart.data.datasets[0].data = temperaturasMatriz;
        chart.data.datasets[1].data = temperaturasAnelResfriamento;
        chart.data.datasets[2].data = temperaturasReator;
        //chart.data.datasets[3].data = temperaturasUmidade;
        chart.update();
    }
}
setInterval(geraDados, 2000);

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
    var nomeMaquina = 'Maquina 2';

    var dadosMatriz2 = Math.floor(Math.random() * (300 - 150) + 150);
    var dadosAnelResfriamento2 = Math.floor(Math.random() * (80 - 20)+ 20);
    var dadosReator2 = Math.floor(Math.random() * (300 - 100) + 100);
    var dadosUmidade2 = Math.floor(Math.random() * (100 - 20) + 20);
    var time2 = new Date(ultimaHoraApresentada2);
    if (indexChart2 >= 1) {
        time2.setMinutes(time2.getMinutes() + 15);
    }
    var horaComoString2 = time2.getHours() + ':' + time2.getMinutes();

    indexChart2++;

    ultimaHoraApresentada2 = new Date(time2);
    updateChart2(dadosMatriz2, dadosAnelResfriamento2, dadosReator2, dadosUmidade2, horaComoString2);
    updateProgress2(dadosMatriz2, dadosAnelResfriamento2, dadosReator2, dadosUmidade2);
    verificaAlerta(dadosMatriz2, dadosAnelResfriamento2, dadosReator2, dadosUmidade2, horaComoString2, nomeMaquina)

}

function updateProgress2(dMatriz2, dAnelResfriamento2, dReator2, dUmidade2){
    progress_reator2.value = dReator2;
    progress_matriz2.value = dMatriz2;
    progress_anel2.value = dAnelResfriamento2;
    // progress_umidade2.value = dUmidade2;
    temp_reator2.innerHTML = dReator2;
    temp_matriz2.innerHTML = dMatriz2;
    temp_anel2.innerHTML = dAnelResfriamento2;
    // umidade_maq2.innerHTML = dUmidade2
}

function updateChart2(dMatriz2, dAnelResfriamento2, dReator2, dUmidade2, t2) {
    //Gráficos
    temperaturasMatriz2.push(dMatriz2);
    temperaturasAnelResfriamento2.push(dAnelResfriamento2);
    temperaturasReator2.push(dReator2);
    // temperaturasUmidade2.push(dUmidade2);
    tempo2.push(t2);
    //Ranges
    

    if (tempo2.length > 10) {
        tempo2.shift();
        temperaturasMatriz2.shift();
        temperaturasAnelResfriamento2.shift();
        temperaturasReator2.shift();
        // temperaturasUmidade2.shift();
    }

    if (!chart2) {
        var ctx2 = document.getElementById('myChart2');
        chart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: tempo2,
                datasets: [{
                    label: 'Matriz',
                    data: temperaturasMatriz2,
                    borderWidth: 1,
                    borderColor: 'red',
                    
                }, {
                    label: 'Anel de Resfriamento',
                    data: temperaturasAnelResfriamento2,
                    borderWidth: 1,
                    borderColor: 'blue'
                }, {
                    label: 'Reator',
                    data: temperaturasReator2,
                    borderWidth: 1,
                    borderColor: 'green'
                }//, {
                //     label: 'Umidade',
                //     data: temperaturasUmidade2,
                //     borderWidth: 1,
                //     borderColor: 'orange'
                // }
            ]},
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                      display: true,
                      text: 'Medidas Atuais',
                      fontSize: 18
                    },
                    legend: {
                      display:true,
                      position: "bottom",
                    },
          
                  },
            }
        });
    } else {
        chart2.data.labels = tempo;
        chart2.data.datasets[0].data = temperaturasMatriz2;
        chart2.data.datasets[1].data = temperaturasAnelResfriamento2;
        chart2.data.datasets[2].data = temperaturasReator2;
        // chart2.data.datasets[3].data = temperaturasUmidade2;
        chart2.update();
    }
}
setInterval(geraDados2, 2000);




var selectorMachine = document.getElementById('selector_machine');
var grafico1 = document.getElementById('myChart');
var grafico2 = document.getElementById('myChart2');

selectorMachine.addEventListener('change', function() {
  var valueSelectedMachine = selectorMachine.value;

  if (valueSelectedMachine === 'maquina1') {
    grafico1.style.display = 'block';
    grafico2.style.display = 'none';
  } else{
    grafico1.style.display = 'none';
    grafico2.style.display = 'block';
  }
});


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