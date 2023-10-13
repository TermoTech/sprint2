var temperaturasMatriz = [];
var temperaturasAnelResfriamento = [];
var temperaturasReator = [];
var temperaturasUmidade = [];
var tempo = [];
var chart;
var ultimaHoraApresentada = new Date();
var indexChart = 0;

function geraDados() {
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
    updateProgress(dadosMatriz, dadosAnelResfriamento, dadosReator);

    if (hist.children.length >= 4) {
        hist.removeChild(hist.lastElementChild);
    }

    hist.innerHTML = `
        <div>
            Temperatura (Matriz): ${dadosMatriz}°C Hora: ${horaComoString}<br>
            Temperatura (Anel de resfriamento): ${dadosAnelResfriamento}°C Hora: ${horaComoString}<br>
            Temperatura (Reator): ${dadosReator}°C Hora: ${horaComoString}<br>
            Temperatura (Umidade): ${dadosUmidade}% Hora: ${horaComoString}<br>
            <br>
        </div>
    ` + hist.innerHTML;
}

function updateProgress(dMatriz, dAnelResfriamento, dReator,){
    progress_reator1.value = dReator;
    progress_matriz1.value = dMatriz;
    progress_anel1.value = dAnelResfriamento;
    temp_reator1.innerHTML = dReator;
    temp_matriz1.innerHTML = dMatriz;
    temp_anel1.innerHTML = dAnelResfriamento;
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
                    label: 'Núcleo',
                    data: temperaturasReator,
                    borderWidth: 1,
                    borderColor: 'green'
                }, {
                    label: 'Umidade',
                    data: temperaturasUmidade,
                    borderWidth: 1,
                    borderColor: 'orange'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
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
setInterval(geraDados, 2000);
