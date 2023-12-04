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
                      <div class="maq-inp-temp" id="div_interval_temp${resposta[i].idMaquina}">
                            <table class="info-temp-table">
                              <tr id="nameProcess${resposta[i].idMaquina}">
                                <th></th>
                              </tr>
                              <tr id="maxProcess${resposta[i].idMaquina}">
                                <td>MÁX</td>
                              </tr>
                              <tr id="minProcess${resposta[i].idMaquina}">
                                <td>MÍN</td>
                              </tr>
                            </table>
                            <div onclick="trocar(${resposta[i].idMaquina}, div_interval_temp${resposta[i].idMaquina})" class="div-pen">
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
                    <div class="analytics">
                      <h5>ANÁLISE DE ALERTAS</h5>
                      <table class="analytics-table" id="table_analytics${resposta[i].idMaquina}">
                        <tr>
                          <th></th>
                          <th class='critico'>ALERTA CRÍTICO(MÍN)</th>
                          <th class='alerta'>ALERTA (ATENÇÃO)</th>
                          <th class='ideal'>IDEAL</th>
                          <th class='alerta'>ALERTA (ATENÇÃO)</th>
                          <th class='critico'>ALERTA CRÍTICO(MÁX)</th>
                        </tr>
                      </table>
                    </div>
                </details>
            `;
            insereTabela(resposta[i].idMaquina)
          }
          geraDivUsuarios(document.getElementById(`div_user${resposta[i].idMaquina}`), resposta[i]);
    }
}

function insereTabela(idMaquina){
  fetch('/supervisorBasic/maquinas/mostraConfigsMaquina', {
    method: 'POST',
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({
        idMaquinaServer: idMaquina
    }),
  })
  .then(
    resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
            console.log(`Processos encontrados com sucesso:${JSON.stringify(resposta)}`)
            exibirProcessos(resposta);
        })
      } else {
          console.log('Não foi encontrado nenhum processo.')
      }
    }
  )
  function exibirProcessos(resposta) {
    console.log("Exibindo processos:", resposta);
    var tableAnalytics = document.getElementById(`table_analytics${idMaquina}`);
    var nomes = document.getElementById(`nameProcess${idMaquina}`);
    var max = document.getElementById(`maxProcess${idMaquina}`);
    var min = document.getElementById(`minProcess${idMaquina}`);
  
    for (var i = 0; i < resposta.length; i++) {
      console.log("Processo:", resposta[i]);
      if(sessionStorage.getItem('PLANO_EMPRESA') == 0){
        if(resposta[i].localizacao == 'Ambiente' || resposta[i].localizacao == 'ambiente'){
          break
        }
      }

      nomes.innerHTML += `<th>${resposta[i].localizacao}</th>`;
      if(resposta[i].localizacao == 'Ambiente' || resposta[i].localizacao == 'ambiente'){
        max.innerHTML += `<td id="td_max_matriz">${resposta[i].maximo}%</td>`;
        min.innerHTML += `<td id="td_min_matriz">${resposta[i].minimo}%</td>`;
      } else{
        max.innerHTML += `<td id="td_max_matriz">${resposta[i].maximo}°C</td>`;
        min.innerHTML += `<td id="td_min_matriz">${resposta[i].minimo}°C</td>`;
      }

      var intervalo = resposta[i].maximo - resposta[i].minimo;
      var newRow = `
        <tr>
          <th>${resposta[i].localizacao}</th>
          <td class='critico'>${resposta[i].minimo + intervalo * 0.1}°</td>
          <td class='alerta'>${resposta[i].minimo + intervalo * 0.25}°</td>
          <td class='ideal'>maior que ${resposta[i].minimo + intervalo * 0.25}° e menor que ${resposta[i].maximo - intervalo * 0.25}°</td>
          <td class='alerta'>${resposta[i].maximo - intervalo * 0.25}°</td>
          <td class='critico'>${resposta[i].maximo - intervalo * 0.1}°</td>
        </tr>
      `;
      tableAnalytics.innerHTML += newRow;
    }
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

function trocar(idMaquina, div) {
  div.innerHTML = '';

  fetch('/supervisorBasic/maquinas/mostraConfigsMaquina', {
      method: 'POST',
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify({
          idMaquinaServer: idMaquina
      }),
  })
  .then(resposta => {
      if (resposta.status == 200) {
          resposta.json().then(resposta => {
              console.log(`Setups encontrados com sucesso:${JSON.stringify(resposta)}`)
              exibirSetups(resposta, idMaquina, div);
          })
      } else {
          console.log('Não foi encontrado nenhum setup.')
      }
  })
  .catch(function (error) {
      console.error(`Erro na obtenção dos dados dos setups: ${error.message}`);
  });
}

function exibirSetups(resposta, idMaquina, div) {
  var listaIdSensor = [];

  for (var i = 0; i < resposta.length; i++) {
    if(sessionStorage.getItem('PLANO_EMPRESA') == 0){
      if(resposta[i].localizacao == 'Ambiente' || resposta[i].localizacao == 'ambiente'){
        break
      }
    }
      div.innerHTML += `
          <div class="update-interval">
              <h6>${resposta[i].localizacao}</h6><br>
              <h6>Max</h6>
              <input type="number" id="input_temp_max_matriz${resposta[i].idSensor}" value="${resposta[i].maximo}"><br>
              <h6>Min</h6>
              <input type="number" id="input_temp_min_matriz${resposta[i].idSensor}" value="${resposta[i].minimo}">
          </div>
      `;
      listaIdSensor.push(resposta[i].idSensor);
  }

  div.innerHTML += `
      <div class="div-btns" onclick="save(${idMaquina}, ${JSON.stringify(listaIdSensor)})"> 
          <button >Salvar</button>
      </div>
  `;
}

function save(idMaquina, listaIdSensor) {
  var erros = 0
  var listaValores = [];
  var inputsInvalidos = [];

  for (var i = 0; i < listaIdSensor.length; i++) {
      var inputMax = document.getElementById(`input_temp_max_matriz${listaIdSensor[i]}`);
      var inputMin = document.getElementById(`input_temp_min_matriz${listaIdSensor[i]}`);

      var valorMax = Number(inputMax.value);
      var valorMin = Number(inputMin.value);

      listaValores.push({
          idMaquina: idMaquina,
          idSensor: listaIdSensor[i],
          valorMax: valorMax,
          valorMin: valorMin
      });

      if (valorMax <= valorMin) {
          inputsInvalidos.push({ inputMax, inputMin });
          erros++
      }
  }

  for (var i = 0; i < inputsInvalidos.length; i++) {
      inputsInvalidos[i].inputMax.value = '';
      inputsInvalidos[i].inputMin.value = '';
      inputsInvalidos[i].inputMax.placeholder = 'Valor inválido';
      inputsInvalidos[i].inputMin.placeholder = 'Valor inválido';
  }
  if(erros == 0){
    fetch('/supervisorBasic/maquinas/updateSetup', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
          listaSetupsServer: listaValores
      })
    })
    .then(
      resposta => {
        if(resposta.status == 200){
          resposta.json().then(resposta => {
            console.log(`Setups editados com sucesso:${JSON.stringify(resposta)}`)
            if(sessionStorage.PLANO_EMPRESA == 1){
              if(sessionStorage.ACESSO_USUARIO == 1){
                  window.location = '/supervisorPremium/maquinas'
              } else{
                  window.location = '/usuarioPremium/maquinas'
              }
          } else{
              if(sessionStorage.ACESSO_USUARIO == 1){
                  window.location = '/supervisorBasic/maquinas'
              } else{
                  window.location = '/usuarioBasic/maquinas'
              }
          }
          })
        }
      }
    )
  }
}