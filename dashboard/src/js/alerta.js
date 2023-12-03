setInterval(achaMinMax, 5000);
var dados;
function achaMinMax() {
    fetch('/supervisorBasic/erro/achaMinMax', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresaServer: sessionStorage.getItem('FK_EMPRESA'),
            idUsuarioServer: sessionStorage.getItem('ID_USUARIO'),
            acessoServer: sessionStorage.getItem('ACESSO_USUARIO')
        })
    })
        .then(
            resposta => {
                resposta.json().then(resposta => {
                    dados = resposta
                    verificaErro()
                })
            }
        )
        .catch(
            error => {
                console.error(`Erro na obtenção dos dados dos setups para verificação de erro: ${error.message}`);
            }
        )
}

function verificaErro() {
    console.log('Esta é a resposta', dados);
    for (let i = 0; i < dados.length; i++) {
        let idSensor = dados[i].idSensor;
        let min = dados[i].minimo
        let max = dados[i].maximo
        fetch('/supervisorBasic/erro/verifica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idSensorServer: idSensor
            })
        })
            .then(resposta => {
                resposta.json().then(resposta => {
                    validaMedida(resposta, max, min);
                    atualizaProgressBar(min, max, resposta);
                });
            })
            .catch(error => {
                console.error(`Erro na obtenção dos dados das medidas dos sensores erro: ${error.message}`);
            });
    }
}

function validaMedida(resposta, maximo, minimo) {
    for (let i = 0; i < resposta.length; i++) {
        let medida = resposta[i].captura;
        let idMedida = resposta[i].idCaptura
        if (medida >= maximo || medida <= minimo) {
            // Adicionar function do alerta
            fetch('/supervisorBasic/erro/validaErro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idMedidaServer: idMedida
                })
            })
                .then(resposta => {
                    console.log(resposta)
                })
                .catch(error => {
                    console.error(`Erro na alteração dos dados das medidas dos sensores para um erro / erro: ${error.message}`);
                });
        }
    }
}

function atualizaProgressBar(min, max, resposta) {
    for (let i = 0; i < resposta.length; i++) {
    var fkMaquina = resposta[i].fkMaquina;
    var captura = resposta[i].captura;
    var localizacao = resposta[i].localizacao;
    var intervalo = Number(max) - Number(min);

    var progressReator = document.getElementById(`progress_reator${fkMaquina}`);
    var progressMatriz = document.getElementById(`progress_matriz${fkMaquina}`);
    var progressAnel = document.getElementById(`progress_anel${fkMaquina}`);
    var progressUmidade = document.getElementById(`progress_umidade${fkMaquina}`);

    var tempReator = document.getElementById(`temp_reator${fkMaquina}`);
    var tempMatriz = document.getElementById(`temp_matriz${fkMaquina}`);
    var tempAnel = document.getElementById(`temp_anel${fkMaquina}`);
    var maqUmidade = document.getElementById(`umidade_maq${fkMaquina}`);

    var textoReator = document.getElementById(`porcentagem_reator_${fkMaquina}`);
    var textoMatriz = document.getElementById(`porcentagem_matriz_${fkMaquina}`);
    var textoAnel = document.getElementById(`porcentagem_anel_${fkMaquina}`);
    var textoUmidade = document.getElementById(`porcentagem_umidade_${fkMaquina}`);

    if (localizacao == 'Reator') {
        var porcentagemReator = (captura / intervalo) * 100;
        porcentagemReator = porcentagemReator.toFixed(2);
        tempReator.innerHTML = captura.toFixed(2);
        textoReator.innerHTML = `${porcentagemReator}%`;
        if (porcentagemReator>=100) {
            progressReator.style.width = `100%`;
        } else {
            progressReator.style.width = `${porcentagemReator}%`;
        }

        if (porcentagemReator>=10) {
            progressReator.style.backgroundColor = "yellow";
        }
        if (porcentagemReator>=25) {
            progressReator.style.backgroundColor = "green";
        }
        if (porcentagemReator>=75) {
            progressReator.style.backgroundColor = "yellow";
        }
        if (porcentagemReator>=90) {
            progressReator.style.backgroundColor = "red";
        }
    }

    if (localizacao == 'Matriz') {
        var porcentagemMatriz = (captura / intervalo) * 100;
        porcentagemMatriz = porcentagemMatriz.toFixed(2);
        tempMatriz.innerHTML = captura.toFixed(2);
        textoMatriz.innerHTML = `${porcentagemMatriz}%`;
        if (porcentagemMatriz>=100) {
            progressMatriz.style.width = `100%`;
        } else {
            progressMatriz.style.width = `${porcentagemMatriz}%`;
        }

        if (porcentagemMatriz>=10) {
            progressMatriz.style.backgroundColor = "yellow";
        }
        if (porcentagemMatriz>=25) {
            progressMatriz.style.backgroundColor = "green";
        }
        if (porcentagemMatriz>=75) {
            progressMatriz.style.backgroundColor = "yellow";
        }
        if (porcentagemMatriz>=90) {
            progressMatriz.style.backgroundColor = "red";
        }
    }

    if (localizacao == 'Anel de resfriamento') {
        var porcentagemAnel = (captura / intervalo) * 100;
        porcentagemAnel = porcentagemAnel.toFixed(2);
        tempAnel.innerHTML = captura.toFixed(2);
        textoAnel.innerHTML = `${porcentagemAnel}%`;
        if (porcentagemAnel>=100) {
            progressAnel.style.width = `100%`;
        } else {
            progressAnel.style.width = `${porcentagemAnel}%`;
        }

        if (porcentagemAnel>=10) {
            progressAnel.style.backgroundColor = "yellow";
        }
        if (porcentagemAnel>=25) {
            progressAnel.style.backgroundColor = "green";
        }
        if (porcentagemAnel>=75) {
            progressAnel.style.backgroundColor = "yellow";
        }
        if (porcentagemAnel>=90) {
            progressAnel.style.backgroundColor = "red";
        }
    }

    if (localizacao == 'Ambiente') {
        var porcentagemUmidade = (captura / intervalo) * 100;
        porcentagemUmidade = porcentagemUmidade.toFixed(2);
        maqUmidade.innerHTML = captura.toFixed(2);
        textoUmidade.innerHTML = `${porcentagemUmidade}%`;
        if (porcentagemUmidade>=100) {
            progressUmidade.style.width = `100%`;
        } else {
            progressUmidade.style.width = `${porcentagemUmidade}%`;
        }

        if (porcentagemUmidade>=10) {
            progressUmidade.style.backgroundColor = "yellow";
        }
        if (porcentagemUmidade>=25) {
            progressUmidade.style.backgroundColor = "green";
        }
        if (porcentagemUmidade>=75) {
            progressUmidade.style.backgroundColor = "yellow";
        }
        if (porcentagemUmidade>=90) {
            progressUmidade.style.backgroundColor = "red";
        }
    }

}
}