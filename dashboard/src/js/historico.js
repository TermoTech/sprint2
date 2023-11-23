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


errosTotais = 0;
horarios = [];
parteProcesso = [];

function calcularQuantidadeItens(lista, nome) {
  let quantidade = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === nome) {
      quantidade++;
      errosTotais++;
    }
  }
  return quantidade;
}
temperaturas = [];
maquinas = [];
umidades = [];

function mostrarHistorico() {
  tabela_historico.innerHTML = ``;

  filtrarGeral();

  setTimeout(function () {
    for (var i = 0; i < horarios.length; i++) {
      tabela_historico.innerHTML += `
    <tr>
        <th>
        ${horarios[i]}
        </th>
        <th>
        ${parteProcesso[i]}
        </th>
        <th>
        ${temperaturas[i]}
        </th>
        <th>
        ${umidades[i]}
        </th>
        <th>
        ${maquinas[i]}
        </th>
    </tr>
    `;
    }
  }, 2000);
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
      for (var i = 0; i < json.length; i++) {
        horarios.push(json[i].horario);
        parteProcesso.push(json[i].parteProcesso);
        temperaturas.push(json[i].temperatura);
        maquinas.push(json[i].fkMaquina);
      }
      // verEmpresa()
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });

  filtarParte();
}

function filtarParte() {
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
      numero_erro_matriz.innerHTML = calcularQuantidadeItens(
        parteProcesso,
        "Processo1"
      );
      numero_erro_anel.innerHTML = calcularQuantidadeItens(parteProcesso, "Processo2");
      numero_erro_reator.innerHTML = calcularQuantidadeItens(parteProcesso, "Processo3");
      numero_erro_total.innerHTML = errosTotais;
      // verEmpresa()
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });
}
