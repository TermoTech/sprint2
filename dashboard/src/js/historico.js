function abrirPopUpFtr() {
  pop_up_ftr.style.display = "flex";
}

function fecharPopUpFtr() {
  pop_up_ftr.style.display = "none";
}

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    fecharPopUpFtr();
  }
});

horarios = [];
localizacoes = [];
temperaturas = [];
maquinas = [];

function mostrarHistorico() {
  tabela_historico.innerHTML = ``;

  filtrarGeral();

  for(var i=0; i<horarios.length; i++){
    tabela_historico.innerHTML += `
    <tr>
        <th>
        ${horarios[i]}
        </th>
        <th>
        ${localizacoes[i]}
        </th>
        <th>
        ${temperaturas[i]}
        </th>
        <th>
        ${maquinas[i]}
        </th>
    </tr>
    `;
  }
  fecharPopUpFtr();
}

function filtrarGeral() {
  var diaInicial = input_dia_inicio.value;
  var diaFinal = input_dia_final.value;

  var maquinaSelecionada = Number(select_maquina.value);
  var processoSelecionado = select_processo.value;

  fetch(`/supervisorPremium/filtrarGeral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inicialDia: diaInicial,
      finalDia: diaFinal,
      idMaquina: maquinaSelecionada,
      parteProcesso: processoSelecionado,
    }),
  })
    .then((respostas) => {
      if (respostas.ok) {
        return respostas.json();
      } else if (respostas.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          respostas.status
        );
      }
    })
    .then((json) => {
      console.log(JSON.stringify(json));
      sessionStorage.HORARIO_REGISTRO = json.horario;
      sessionStorage.PROCESSO_REGISTRO = json.parteProcesso;
      sessionStorage.TEMPERATURA_REGISTRO = json.temperatura;
      sessionStorage.MAQUINA_REGISTRO = json.fkMaquina;
      // verEmpresa()
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });
}


function filtarParte() {
  var diaInicial = input_dia_inicio.value;
  var diaFinal = input_dia_final.value;
  var maquinaSelecionada = Number(select_maquina.value);
  var processoSelecionado = Number(select_processo.value);

  fetch(`/supervisorPremium/filtrarGeral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inicialDia: diaInicial,
      finalDia: diaFinal,
      idMaquina: maquinaSelecionada,
      parteProcesso: processoSelecionado,
      maquinaSelecionada: maquinaSelecionada,
      processoSelecionado: processoSelecionado,
    }),
  })
    .then((respostas) => {
      if (respostas.ok) {
        return respostas.json();
      } else if (respostas.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          respostas.status
        );
      }
    })
    .then((json) => {
      console.log(JSON.stringify(json));
      for(var i=0; i<json.length; i++){
        horarios.push(json[i].horario);
        localizacoes.push(json[i].localizacao);
        temperaturas.push(json[i].temperatura);
        maquinas.push(json[i].fkMaquina);
      }
      // verEmpresa()
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });
}
