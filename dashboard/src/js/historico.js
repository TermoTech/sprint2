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

function mostrarHistorico() {
  tabela_historico.innerHTML = ``;

  filtrarGeral();

  tabela_historico.innerHTML += `
    <tr>
        <th>
        ${sessionStorage.HORARIO_REGISTRO}
        </th>
        <th>
        ${sessionStorage.LOCALIZACAO_REGISTRO}
        </th>
        <th>
        ${sessionStorage.TEMPERATURA_REGISTRO}
        </th>
        <th>
        ${sessionStorage.MAQUINA_REGISTRO}
        </th>
    </tr>
    `;
  fecharPopUpFtr();
}

function filtrarGeral() {
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

  fetch(`/filtrarGeral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inicilDia: diaInicial,
      finalDia: diaFinal,
      idMaquina: maquinaSelecionada,
      parteProcesso: processoSelecionado,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log(
          "Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!"
        );
        // window.location = "/dashboard/mural.html";
        // limparFormulario();
        // finalizarAguardar();
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });
}
