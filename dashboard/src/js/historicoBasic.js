function abrirPopUpFtr() {
    pop_up_ftr.style.display = "flex";
}

function fecharPopUpFtr() {
    pop_up_ftr.style.display = "none";
}

document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        fecharPopUpFtr()
    }
})

// Carregando os selects de inicio do intervalo
select_de_mes.addEventListener("change", function () {
    select_de_dia.innerHTML = "<option value=`dia`>Dia</option>";
    var deDia = 1;
    var deDiaMax = 1;
    while (deDia <= deDiaMax) {
        var max = Number(select_de_mes.value);
        if (max == 1 || max == 3 || max == 5 || max == 7 || max == 8 || max == 10 || max == 12) {
            deDiaMax = 31
        } else if (max == 2) {
            deDiaMax = 28
        } else {
            deDiaMax = 30
        }

        if (select_de_mes.value != `mês`) {
            select_de_dia.innerHTML += `
        <option value="${deDia}">${deDia}</option>`;
        } else {
            select_de_dia.innerHTML = "<option value=`dia`>Dia</option>";
        }

        deDia++;
    }
});

var deMes = 1;
while (deMes <= 12) {
    select_de_mes.innerHTML += `
        <option value="${deMes}">${deMes}</option>`;

    deMes++;
}

// Carregando os selects de fim do intervalo
select_ate_mes.addEventListener("change", function () {
    select_ate_dia.innerHTML = "<option value=`dia`>Dia</option>";

    var ateDia = 1;
    var ateDiaMax = 1;
    while (ateDia <= ateDiaMax) {
        var max = Number(select_ate_mes.value);
        if (max == 1 || max == 3 || max == 5 || max == 7 || max == 8 || max == 10 || max == 12) {
            ateDiaMax = 31
        } else if (max == 2) {
            ateDiaMax = 28
        } else {
            ateDiaMax = 30
        }

        if (select_ate_mes.value != `mês`) {
            select_ate_dia.innerHTML += `
        <option value="${ateDia}">${ateDia}</option>`;
        } else {
            select_ate_dia.innerHTML = "<option value=dia>Dia</option>";
        }

        ateDia++;
    }
});

// Aqui carrego o select de mês
var ateMes = 1;
while (ateMes <= 12) {
    select_ate_mes.innerHTML += `
        <option value="${ateMes}">${ateMes}</option>`;

    ateMes++;
}

// Aqui crio a função para exibir o histórico filtrado e também faço as validações de preenchimento
function mostrarHistorico() {
    tabela_historico.innerHTML = ``;
    
    var diaInicial = Number(select_de_dia.value);
    var diaFinal = Number(select_ate_dia.value);
    var mesInicial = Number(select_de_mes.value);
    var mesFinal = Number(select_ate_mes.value);
    var diaAtual = diaInicial;
    var mesAtual = mesInicial;

    var maquinaSelecionada = Number(select_maquina.value);
    var processoSelecionado = Number(select_processo.value);
    
    if (isNaN(diaInicial) ||
        isNaN(diaFinal)
        ) {
        erro_filtrar.style.display = "flex";
    } else if (diaInicial>diaFinal && mesFinal<=mesInicial || (mesFinal<mesInicial)) {
        erro_filtrar.style.display = "flex";
    }
     else {
        erro_filtrar.style.display = "none";
    while (mesAtual <= mesFinal) {
        var quantidadeRegistrosDia = Math.floor(Math.random() * (4));
        var contadorRegistros = 1;
        while (contadorRegistros<=quantidadeRegistrosDia) {
            var tempMin = Math.random() * (100 - 80) + 80;
            tempMin = tempMin.toFixed(2);
        
            var tempMax = Math.random() * (300 - 260) + 260;
            tempMax = tempMax.toFixed(2);

            var hora = Math.floor(Math.random() * (24));
            var minutos = Math.floor(Math.random() * (60));

            if (hora<10) {
                hora = "0" + hora;
            }
            if (minutos<10) {
                minutos = "0" + minutos;
            }
            
            var temperatura = [tempMin, tempMax];
            
            if (processoSelecionado==0) {
            var parteProcesso = [`Matriz`, `Reator`, `Anel de resfriamento`];
            } else if (processoSelecionado==1) {
                var parteProcesso = ["Matriz"]
            } else if (processoSelecionado==2) {
                var parteProcesso = ["Reator"]
            } else {
                var parteProcesso = ["Anel de resfriamento"]
            }
            
            if (maquinaSelecionada==0){
            var maquina = ["1", "2"];
            } else if (maquinaSelecionada==1){
                var maquina = ["1"]
            } else {
                var maquina = ["2"]
            }

            
            var indiceTemp = Math.floor(Math.random() * temperatura.length);
            var indiceParte = Math.floor(Math.random() * parteProcesso.length);
            var indiceMaquina = Math.floor(Math.random() * maquina.length);

        tabela_historico.innerHTML += `
    <tr>
        <th>
        ${diaAtual}/${mesAtual}/2023
        </th>
        <th>
        ${hora}:${minutos}
        </th>
        <th>
        ${parteProcesso[indiceParte]}
        </th>
        <th>
        ${temperatura[indiceTemp]}
        </th>
        <th>
        ${maquina[indiceMaquina]}
        </th>
    </tr>
    `;

        contadorRegistros++;
        }

        if ((mesAtual == 1|| mesAtual == 3|| mesAtual == 5|| mesAtual == 7|| mesAtual == 8|| mesAtual == 10|| mesAtual == 12) && diaAtual == 31) {
            diaAtual = 1;
            mesAtual++;
        } else if (mesAtual == 2 && diaAtual == 28) {
            diaAtual = 1
            mesAtual++;
        } else if ((mesAtual == 4 || mesAtual == 6 || mesAtual == 9 || mesAtual == 11) && diaAtual == 30) {
            diaAtual = 1
            mesAtual++;
        } else {
            diaAtual++;
        }

        if (mesAtual == mesFinal && diaAtual>diaFinal) {
            break;
        }
    }
    fecharPopUpFtr()
}
}