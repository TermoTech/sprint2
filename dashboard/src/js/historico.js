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

var ateMes = 1;
while (ateMes <= 12) {
    select_ate_mes.innerHTML += `
        <option value="${ateMes}">${ateMes}</option>`;

    ateMes++;
}

botao_filtrar.addEventListener("mouseover", function () {
    if(select_ate_dia.value!=`dia` && 
    select_de_dia.value!=`dia` &&
    ipt_intervalo_de.value!=`` &&
    ipt_intervalo_ate.value!=`` &&
    ipt_intervalo_capturas.value!=``) {
        botao_filtrar.disabled = false;
    } else {
        botao_filtrar.disabled = true;
    }
});

function mostrarHistorico() {
    tabela_historico.innerHTML = ``;

    tabela_historico.innerHTML += `
    <tr>
        <th>
        24/10/2023
        </th>
        <th>
        09:00
        </th>
        <th>
        Matriz
        </th>
        <th>
        265
        </th>
        <th>
        1
        </th>
    </tr>
    <tr>
        <th>
        24/10/2023
        </th>
        <th>
        09:10
        </th>
        <th>
        Matriz
        </th>
        <th>
        262
        </th>
        <th>
        1
        </th>
    </tr>
    <tr>
        <th>
        24/10/2023
        </th>
        <th>
        09:20
        </th>
        <th>
        Matriz
        </th>
        <th>
        261
        </th>
        <th>
        1
        </th>
    </tr>
    `;
}