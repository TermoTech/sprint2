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
            // acessoServer: sessionStorage.getItem('ACESSO_USUARIO')
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
    var popupAlerta = document.getElementById("popup_alerta");
    for (let i = 0; i < resposta.length; i++) {
        var fkMaquina = resposta[i].fkMaquina;
        var captura = resposta[i].captura;
        var localizacao = resposta[i].localizacao;
        var numMaquina = resposta[i].numMaquina;
        var tipo = resposta[i].tipo;
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
            var porcentagemReator = (captura - min) * 100 / intervalo;
            porcentagemReator = porcentagemReator.toFixed(2);
            tempReator.innerHTML = `Mínimo: ${min}°C  <br> Máximo: ${max}°C`;
            textoReator.innerHTML = `${captura}°C`;
            if (porcentagemReator >= 100) {
                progressReator.style.width = `100%`;
            } else {
                progressReator.style.width = `${porcentagemReator}%`;
            }

            if (porcentagemReator < 10) {
                progressUmidade.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == "") {
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
                }
            }

            if (porcentagemReator >= 10 && porcentagemReator < 25) {
                progressReator.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == "") {
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}°C<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
                }
            }
            if (porcentagemReator >= 25 && porcentagemReator < 75) {
                progressReator.style.backgroundColor = "green";
                if(popupAlerta.style.display != "flex"){ 
                    popupAlerta.style.display = `none`;
                    popupAlerta.innerHTML = ``;
                }
            }
            if (porcentagemReator >= 75 && porcentagemReator < 90) {
                progressReator.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == "") {
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}°C<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
                }
            }
            if (porcentagemReator >= 90) {
                progressReator.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == "") {
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA CRÍTICO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} ultrapassou a ${tipo} limite!!!<br>
                Medida Registrada: ${captura}°C<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
                }
            }
        }

        if (localizacao == 'Matriz') {
            var porcentagemMatriz = (captura - min) * 100 / intervalo;
            porcentagemMatriz = porcentagemMatriz.toFixed(2);
            tempMatriz.innerHTML = `Mínimo: ${min}  <br> Máximo: ${max}`;;
            textoMatriz.innerHTML = `${captura}°C`;
            if (porcentagemMatriz >= 100) {
                progressMatriz.style.width = `100%`;
            } else {
                progressMatriz.style.width = `${porcentagemMatriz}%`;
            }

            if (porcentagemMatriz < 10) {
                progressUmidade.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == "") {
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
                }
            }
            if (porcentagemMatriz >= 10 && porcentagemMatriz < 25) {
                progressMatriz.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex"; 
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemMatriz >= 25 && porcentagemMatriz < 75) {
                progressMatriz.style.backgroundColor = "green";
                if(popupAlerta.style.display != "flex"){ 
                    popupAlerta.style.display = `none`;
                    popupAlerta.innerHTML = ``;
                }
            }
            if (porcentagemMatriz >= 75 && porcentagemMatriz < 90) {
                progressMatriz.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemMatriz >= 90) {
                progressMatriz.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA CRÍTICO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} ultrapassou a ${tipo} limite!!!<br>
                Medida Registrada: ${captura}°C<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
    }

        if (localizacao == 'Anel de resfriamento') {
            var porcentagemAnel = (captura - min) * 100 / intervalo;
            porcentagemAnel = porcentagemAnel.toFixed(2);
            tempAnel.innerHTML = `Mínimo: ${min}  <br> Máximo: ${max}`;;
            textoAnel.innerHTML = `${captura}°C`;
            if (porcentagemAnel >= 100) {
                progressAnel.style.width = `100%`;
            } else {
                progressAnel.style.width = `${porcentagemAnel}%`;
            }

            if (porcentagemAnel < 10) {
                progressAnel.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA CRÍTICO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} ultrapassou a ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemAnel >= 10 && porcentagemAnel < 25) {
                progressAnel.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemAnel >= 25 && porcentagemAnel < 75) {
                progressAnel.style.backgroundColor = "green";
                if(popupAlerta.style.display != "flex"){ 
                    popupAlerta.style.display = `none`;
                    popupAlerta.innerHTML = ``;
                }
            }
            if (porcentagemAnel >= 75 && porcentagemAnel < 90) {
                progressAnel.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}C°<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemAnel >= 90) {
                progressAnel.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){ 
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA CRÍTICO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} ultrapassou a ${tipo} limite!!!<br>
                Medida Registrada: ${captura}°C<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
    }
        if (localizacao == 'Ambiente') {
            var porcentagemUmidade = (captura - min) * 100 / intervalo;
            porcentagemUmidade = porcentagemUmidade.toFixed(2);
            maqUmidade.innerHTML = `Mínimo: ${min}  <br> Máximo: ${max}`;;
            textoUmidade.innerHTML = `${captura}°C`;
            if (porcentagemUmidade >= 100) {
                progressUmidade.style.width = `100%`;
            } else {
                progressUmidade.style.width = `${porcentagemUmidade}%`;
            }

            if (porcentagemUmidade < 10) {
                progressUmidade.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA CRÍTICO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} ultrapassou a ${tipo} limite!!!<br>
                Medida Registrada: ${captura}%<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemUmidade >= 10 && porcentagemUmidade < 25) {
                progressUmidade.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}%<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemUmidade >= 25 && porcentagemUmidade < 75) {
                progressUmidade.style.backgroundColor = "green";
                if(popupAlerta.style.display != "flex" || popupAlerta.style.display == ""){ 
                    popupAlerta.style.display = `none`;
                    popupAlerta.innerHTML = ``;
                    
                }
            }
            if (porcentagemUmidade >= 75 && porcentagemUmidade < 90) {
                progressUmidade.style.backgroundColor = "yellow";
                if (popupAlerta.style.display == "none" || popupAlerta.style.display == ""){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card">
              <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} está chegando perto da ${tipo} limite!!!<br>
                Medida Registrada: ${captura}%<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
            if (porcentagemUmidade >= 90) {
                progressUmidade.style.backgroundColor = "red";
                if (popupAlerta.style.display == "none" ){
                    popupAlerta.style.display = "flex";
                    popupAlerta.innerHTML = `
            <div class="alert">
            <div class="head-card" style="background-color: red;">
              <h4 id='titulo_alerta'>ALERTA CRÍTICO</h4>
              <svg onclick="fecharAlerta()" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
            <div class="body-card-alert">
              <h5 id='texto_alerta'>
                A máquina ${numMaquina} ultrapassou a ${tipo} limite!!!<br>
                Medida Registrada: ${captura}%<br>
                Parte do processo: ${localizacao}
              </h5>
            </div>
          </div>
            `;
            }
        }
        }

    }
}

function fecharAlerta(){
    document.getElementById("popup_alerta").style.display = "none";
}

/* <div class="content-alert" id="popup_alerta"> 
  <div class="alert">
    <div class="head-card">
      <h4 id='titulo_alerta'>ALERTA ATENÇÃO</h4>
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>    </div>
    <div class="body-card-alert">
      <h5 id='texto_alerta'>
        A máquina x está chegando perto da xxxx limite!!!<br>
        Medida Registrada: xx°C / x%<br>
        Parte do processo: xxxxx
      </h5>
    </div>
  </div>
</div> */