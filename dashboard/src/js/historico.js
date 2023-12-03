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


var errosTotais = 0;
horarios = [];
var parteProcesso = [];
var dia = [];

function calcularQuantidadeItens(lista, nome) {
  var quantidade = 0;

  lista.forEach(item => {
    if (item === nome) {
      quantidade++;
      errosTotais++;
    }
  });

  return quantidade;
}

var temperaturas = [];
var maquinas = [];
var umidades = [];

function mostrarHistorico() {
  if (sessionStorage.PLANO_EMPRESA == 0) {
    errosTotais = 0;

    tabela_historico.innerHTML = ``;
    horarios = [];
    parteProcesso = [];
    temperaturas = [];
    maquinas = [];
    umidades = [];
    dia = [];

    filtrarGeral();

    setTimeout(function () {
      for (var i = 0; i < horarios.length; i++) {
        if (parteProcesso[i] != "Ambiente") {
          tabela_historico.innerHTML += `
    <tr>
        <th>
        ${dia[i]}
        </th>
        <th>
        ${horarios[i]}
        </th>
        <th>
        ${parteProcesso[i]}
        </th>
        <th>
        ${temperaturas[i].toFixed(2)}
        </th>
        <th>
        ${maquinas[i]}
        </th>
    </tr>
    `;
        }
      }
      numero_erro_matriz.innerHTML = calcularQuantidadeItens(parteProcesso, "Matriz");
      numero_erro_anel.innerHTML = calcularQuantidadeItens(parteProcesso, "Anel de resfriamento");
      numero_erro_reator.innerHTML = calcularQuantidadeItens(parteProcesso, "Reator");
      numero_erro_total.innerHTML = errosTotais;
    }, 1000);
    fecharPopUpFtr();
  }else{
    errosTotais = 0;

    tabela_historico.innerHTML = ``;
    horarios = [];
    parteProcesso = [];
    temperaturas = [];
    maquinas = [];
    umidades = [];
    dia = [];

    filtrarGeral();

    setTimeout(function () {
      for (var i = 0; i < horarios.length; i++) {
          tabela_historico.innerHTML += `
    <tr>
        <th>
        ${dia[i]}
        </th>
        <th>
        ${horarios[i]}
        </th>
        <th>
        ${parteProcesso[i]}
        </th>
        <th>
        ${temperaturas[i].toFixed(2)}
        </th>
        <th>
        ${maquinas[i]}
        </th>
    </tr>
    `;
      }
      numero_erro_matriz.innerHTML = calcularQuantidadeItens(parteProcesso, "Matriz");
      numero_erro_anel.innerHTML = calcularQuantidadeItens(parteProcesso, "Anel de resfriamento");
      numero_erro_reator.innerHTML = calcularQuantidadeItens(parteProcesso, "Reator");
      numero_erro_total.innerHTML = errosTotais;
    }, 1000);
    fecharPopUpFtr();
  }
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
      for (var i = 0; i < json.length; i++) {
        dia.push(json[i].dia)
        horarios.push(json[i].horario);
        parteProcesso.push(json[i].parteProcesso);
        temperaturas.push(json[i].temperatura);
        maquinas.push(json[i].maquina);
      }
      // verEmpresa()
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });

}

// function filtarParte() {
//   var diaInicial = input_dia_inicio.value;
//   var diaFinal = input_dia_final.value;
//   var maquinaSelecionada = Number(select_maquina.value);
//   var processoSelecionado = select_processo.value;

//   fetch(`/supervisorPremium/filtrarGeral`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inicialDia: diaInicial,
//       finalDia: diaFinal,
//       idMaquina: maquinaSelecionada,
//       parteProcesso: processoSelecionado,
//     }),
//   })
//     .then((respostas) => {
//       if (respostas.ok) {
//         return respostas.json();
//       } else if (respostas.status == 404) {
//         window.alert("Deu 404!");
//       } else {
//         throw (
//           "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
//           respostas.status
//         );
//       }
//     })
//     .then((json) => {
//       console.log(JSON.stringify(json));
// numero_erro_matriz.innerHTML = calcularQuantidadeItens(
//   parteProcesso,
//   "Processo1"
// );
// numero_erro_anel.innerHTML = calcularQuantidadeItens(parteProcesso, "Processo2");
// numero_erro_reator.innerHTML = calcularQuantidadeItens(parteProcesso, "Processo3");
// numero_erro_total.innerHTML = errosTotais;
//       // verEmpresa()
//     })
//     .catch(function (resposta) {
//       console.log(`#ERRO: ${resposta}`);
//       // finalizarAguardar();
//     });
// }
