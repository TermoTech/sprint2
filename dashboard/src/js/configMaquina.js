fetch(`/supervisorBasic/maquinas/listar`, {
    method: 'POST',
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({
        fkEmpresaServer: sessionStorage.FK_EMPRESA,
        idUsuarioServer: sessionStorage.ID_USUARIO,
        acessoServer: sessionStorage.ACESSO_USUARIO
    }),
})
    .then(resposta => {
        if (resposta.status == 200) {
            resposta.json().then(resposta => {
                console.log(`Máquinas encontradas com sucesso:${JSON.stringify(resposta)}`)
                exibeMaquinas(resposta)
            })
        } else {
            console.log('Não foi encontrado nenhuma máquina.')
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados das máquinas: ${error.message}`);
});

function exibeMaquinas(resposta){
    for(var i = 0; i < resposta.length; i++){
        var divMaquina = document.getElementById(`div_user${resposta[i].idMaquina}`);
        if (!divMaquina){
            section_details.innerHTML += `
                <details class="maq-details" style="margin-top: 2%;">
                    <summary><h1>Máquina ${resposta[i].numMaquina}</h1><img src="/staticDashboard/img/imagensPaineis/Vetor Maquina.png" alt="Vetor Maquinas"></summary>
                    <div class="column-text">
                      Configuração dos sensores:
                    </div>
                    <div class="maquinas">
                      <div class="maquinas-sensores">
                        <div class="card-sensor">
                          <h6>Matriz</h6>
                          <div class="circle-stats"></div>
                        </div>
                        <div class="card-sensor">
                          <h6>Anel</h6>
                          <div class="circle-stats"></div>
                        </div>
                        <div class="card-sensor">
                            <h6>Reator</h6>
                            <div class="circle-stats"></div>
                        </div>
                        <div class="card-sensor">
                          <h6>Umidade</h6>
                          <div class="circle-stats"></div>
                        </div>
                      </div>
                      <div class="maq-inp-temp" id="div_interval_temp">
                            <table class="info-temp-table">
                              <tr>
                                <th></th>
                                <th>MATRIZ</th>
                                <th>REATOR</th>
                                <th>ANEL DE RESFRIAMENTO</th>
                                <th>UMIDADE</th>
                              </tr>
                              <tr>
                                <td>MÁX</td>
                                <td id="td_max_matriz">300°C</td>
                                <td id="td_max_reator">300°C</td>
                                <td id="td_max_anel">80°C</td>
                                <td id="td_max_umidade">50%</td>
                              </tr>
                              <tr>
                                <td>MÍNN</td>
                                <td id="td_min_matriz">150°C</td>
                                <td id="td_min_reator">100°C</td>
                                <td id="td_min_anel">20°C</td>
                                <td id="td_min_umidade">20%</td>
                              </tr>
                            </table>
                            <div onclick="trocar()" class="div-pen">
                              <img  src="/staticDashboard/img/imagensPaineis/Vetor lapis.png" alt="">
                            </div>
                      </div>
                    </div>
                    <div class="user-maq" id="div_user${resposta[i].idMaquina}">
                        <div class="title-func">
                            <h6>Nome</h6>
                            <h6>Status</h6>
                            <h6>E-mail</h6>
                        </div>
                    </div>
                </details>
            `;
        }
        geraDivUsuarios(document.getElementById(`div_user${resposta[i].idMaquina}`), resposta[i]);
    }
}

function geraDivUsuarios(div, usuario) {
    var acesso = 'Funcionário'
    if(usuario.nome != null){
        if(usuario.nivelAcesso == 1) acesso = 'Supervisor'
        div.innerHTML += `
            <div class="func-info">
                <img src="/staticDashboard/img/imagensPaineis/Vetor usuario.png" alt="">
                <h6>${usuario.nome}</h6>
                <h6>${acesso}</h6>
                <h6>${usuario.email}</h6>
            </div>
        `;
    }
}

function trocar(){
    div_interval_temp.innerHTML = '';
    div_interval_temp.innerHTML = `
        <div class="update-interval">
            <h6>Temperatura Matriz</h6><br>
            <h6>Max</h6>
            <input type="number" id="input_temp_max_matriz"><br>
            <h6>Min</h6>
            <input type="number" id="input_temp_min_matriz">
        </div>
        <div class="update-interval">
          <h6>Temperatura Reator</h6><br>
          <h6>Max</h6>
          <input type="number" id="input_temp_max_reator"><br>
          <h6>Min</h6>
          <input type="number" id="input_temp_min_reator">
        </div>
        <div class="update-interval">
          <h6>Temperatura Anel</h6><br>
          <h6>Max</h6>
          <input type="number" id="input_temp_max_anel"><br>
          <h6>Min</h6>
          <input type="number" id="input_temp_min_anel">
        </div>
        <div class="update-interval">
          <h6>Umidade</h6><br>
          <h6>Max</h6>
          <input type="number" id="input_temp_max_umidade"><br>
          <h6>Min</h6>
          <input type="number" id="input_temp_min_umidade">
        </div>
        <div class="div-btns"> 
          <button onclick="save()">Salvar</button>
        </div>
    `;
  }
  function save(){
    var tempMinMatriz = Number(input_temp_min_matriz.value)
    var tempMaxMatriz = Number(input_temp_max_matriz.value)
    var tempMinReator = Number(input_temp_min_reator.value)
    var tempMaxReator = Number(input_temp_max_reator.value)
    var tempMinAnel = Number(input_temp_min_anel.value)
    var tempMaxAnel = Number(input_temp_max_anel.value)
    var minUmidade = Number(input_temp_min_umidade.value)
    var maxUmidade = Number(input_temp_max_umidade.value)

    if(tempMaxMatriz == '' || tempMinMatriz == '' || tempMaxAnel == '' || tempMaxReator == '' || tempMinAnel == '' || tempMinReator == '' || maxUmidade == '' || minUmidade == ''){
        input_temp_max_matriz.placeholder = 'Insira um valor';
        input_temp_min_matriz.placeholder = 'Insira um valor';
        input_temp_min_reator.placeholder = 'Insira um valor';
        input_temp_max_reator.placeholder = 'Insira um valor';
        input_temp_min_anel.placeholder = 'Insira um valor';
        input_temp_max_anel.placeholder = 'Insira um valor';
        input_temp_min_umidade.placeholder = 'Insira um valor';
        input_temp_max_umidade.placeholder = 'Insira um valor';

    } else if(tempMaxMatriz <= tempMinMatriz || tempMaxReator <= tempMinReator || tempMaxAnel <= tempMinAnel || maxUmidade <= minUmidade){
        input_temp_max_matriz.placeholder = '';
        input_temp_min_matriz.value = '';
        input_temp_min_reator.value = '';
        input_temp_max_reator.value = '';
        input_temp_min_anel.value = '';
        input_temp_max_anel.value = '';
        input_temp_min_umidade.value = '';
        input_temp_max_umidade.value = '';

        input_temp_max_matriz.placeholder = 'Intervalo inválido';
        input_temp_min_matriz.placeholder = 'Intervalo inválido';
        input_temp_min_reator.placeholder = 'Intervalo inválido';
        input_temp_max_reator.placeholder = 'Intervalo inválido';
        input_temp_min_anel.placeholder = 'Intervalo inválido';
        input_temp_max_anel.placeholder = 'Intervalo inválido';
        input_temp_min_umidade.placeholder = 'Intervalo inválido';
        input_temp_max_umidade.placeholder = 'Intervalo inválido';
    } else{
        div_interval_temp.innerHTML = "";
        div_interval_temp.innerHTML = `
            <table class="info-temp-table">
              <tr>
                <th></th>
                <th>MATRIZ</th>
                <th>REATOR</th>
                <th>ANEL DE RESFRIAMENTO</th>
                <th>UMIDADE</th>
              </tr>
              <tr>
                <td>MAX</td>
                <td id="td_max_matriz">${tempMaxMatriz}°C</td>
                <td id="td_max_reator">${tempMaxReator}°C</td>
                <td id="td_max_anel">${tempMaxAnel}°C</td>
                <td id="td_max_umidade">${maxUmidade}%</td>
              </tr>
              <tr>
                <td>MIN</td>
                <td id="td_min_matriz">${tempMinMatriz}°C</td>
                <td id="td_min_reator">${tempMinReator}°C</td>
                <td id="td_min_anel">${tempMinAnel}°C</td>
                <td id="td_min_umidade">${minUmidade}%</td>
              </tr>
            </table>
            <div class="div-pen">
              <img onclick="trocar()" src="/staticDashboard/img/imagensPaineis/Vetor lapis.png" alt="">
            </div>
        `;
    }

}
function trocar2(){
    div_interval_temp2.innerHTML = '';
    div_interval_temp2.innerHTML = `
        <div class="update-interval">
            <h6>Temperatura Matriz</h6><br>
            <h6>Max</h6>
            <input type="number" id="input_temp_max_matriz2"><br>
            <h6>Min</h6>
            <input type="number" id="input_temp_min_matriz2">
        </div>
        <div class="update-interval">
          <h6>Temperatura Reator</h6><br>
          <h6>Max</h6>
          <input type="number" id="input_temp_max_reator2"><br>
          <h6>Min</h6>
          <input type="number" id="input_temp_min_reator2">
        </div>
        <div class="update-interval">
          <h6>Temperatura Anel</h6><br>
          <h6>Max</h6>
          <input type="number" id="input_temp_max_anel2"><br>
          <h6>Min</h6>
          <input type="number" id="input_temp_min_anel2">
        </div>
        <div class="update-interval">
          <h6>Umidade</h6><br>
          <h6>Max</h6>
          <input type="number" id="input_temp_max_umidade2"><br>
          <h6>Min</h6>
          <input type="number" id="input_temp_min_umidade2">
        </div>
        <div class="div-btns"> 
          <button onclick="save2()">Salvar</button>
        </div>
    `;
  }
  function save2(){
    var tempMinMatriz2 = Number(input_temp_min_matriz2.value)
    var tempMaxMatriz2 = Number(input_temp_max_matriz2.value)
    var tempMinReator2 = Number(input_temp_min_reator2.value)
    var tempMaxReator2 = Number(input_temp_max_reator2.value)
    var tempMinAnel2 = Number(input_temp_min_anel2.value)
    var tempMaxAnel2 = Number(input_temp_max_anel2.value)
    var minUmidade2 = Number(input_temp_min_umidade2.value)
    var maxUmidade2 = Number(input_temp_max_umidade2.value)

    if(tempMaxMatriz2 == '' || tempMinMatriz2 == '' || tempMaxAnel2 == '' || tempMaxReator2 == '' || tempMinAnel2 == '' || tempMinReator2 == '' || maxUmidade2 == '' || minUmidade2 == ''){
        input_temp_max_matriz2.placeholder = 'Insira um valor';
        input_temp_min_matriz2.placeholder = 'Insira um valor';
        input_temp_min_reator2.placeholder = 'Insira um valor';
        input_temp_max_reator2.placeholder = 'Insira um valor';
        input_temp_min_anel2.placeholder = 'Insira um valor';
        input_temp_max_anel2.placeholder = 'Insira um valor';
        input_temp_min_umidade2.placeholder = 'Insira um valor';
        input_temp_max_umidade2.placeholder = 'Insira um valor';

    } else if(tempMaxMatriz2 <= tempMinMatriz2 || tempMaxReator2 <= tempMinReator2 || tempMaxAnel2 <= tempMinAnel2 || maxUmidade2 <= minUmidade2){
        input_temp_max_matriz2.placeholder = '';
        input_temp_min_matriz2.value = '';
        input_temp_min_reator2.value = '';
        input_temp_max_reator2.value = '';
        input_temp_min_anel2.value = '';
        input_temp_max_anel2.value = '';
        input_temp_min_umidade2.value = '';
        input_temp_max_umidade2.value = '';

        input_temp_max_matriz2.placeholder = 'Intervalo inválido';
        input_temp_min_matriz2.placeholder = 'Intervalo inválido';
        input_temp_min_reator2.placeholder = 'Intervalo inválido';
        input_temp_max_reator2.placeholder = 'Intervalo inválido';
        input_temp_min_anel2.placeholder = 'Intervalo inválido';
        input_temp_max_anel2.placeholder = 'Intervalo inválido';
        input_temp_min_umidade2.placeholder = 'Intervalo inválido';
        input_temp_max_umidade2.placeholder = 'Intervalo inválido';
    } else{
        div_interval_temp2.innerHTML = "";
        div_interval_temp2.innerHTML = `
            <table class="info-temp-table">
              <tr>
                <th></th>
                <th>MATRIZ</th>
                <th>REATOR</th>
                <th>ANEL DE RESFRIAMENTO</th>
                <th>UMIDADE</th>
              </tr>
              <tr>
                <td>MAX</td>
                <td id="td_max_matriz2">${tempMaxMatriz2}°C</td>
                <td id="td_max_reator2">${tempMaxReator2}°C</td>
                <td id="td_max_anel2">${tempMaxAnel2}°C</td>
                <td id="td_max_umidade2">${maxUmidade2}%</td>
              </tr>
              <tr>
                <td>MIN</td>
                <td id="td_min_matriz2">${tempMinMatriz2}°C</td>
                <td id="td_min_reator2">${tempMinReator2}°C</td>
                <td id="td_min_anel2">${tempMinAnel2}°C</td>
                <td id="td_min_umidade2">${minUmidade2}%</td>
              </tr>
            </table>
            <div class="div-pen">
              <img onclick="trocar2()" src="/staticDashboard/img/imagensPaineis/Vetor lapis.png" alt="">
            </div>
        `;
    }

}