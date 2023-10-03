function calcula(){
    var qtdKg = Number(input_kg.value);
    var qtdReais = Number(input_hora.value);

    var inputKg = input_kg;
    var inputReais = input_hora;

    var correspondencia = /[0-9]/;

    var validacaoReais = '';
    var validcaoKg = '';

    if(qtdReais == '' || !correspondencia.test(qtdReais)){
        inputReais.value = '';
        inputReais.placeholder = 'Informe valores válidos!';
    } else validacaoReais = 'valido'
    if(qtdKg == '' || !correspondencia.test(qtdKg)){
        inputKg.value = '';
        inputKg.placeholder = 'Informe valores válidos!';
    } else validcaoKg = 'valido'

    if(validacaoReais == 'valido' && validcaoKg == 'valido'){
        var prodMin = qtdReais/60;
        var ganhoMin = prodMin*qtdKg;

        section_content.innerHTML += `
        <div class="values-result" id="div_table">
            <div class="table-res">
                <h1 class="table-title">Simulação de perdas</h1>
                <table class="table-results">
                    <tr>
                        <th>Tempo em temperatura inadequada</th>
                        <th>Perda em <b><u>KG</u></b></th>
                        <th>Perda em <b><u>R$</u></b></th>
                    </tr>
                    <tr>
                        <td>7 minutos</td>
                        <td>${(prodMin*7).toFixed(2)}kg</td>
                        <td>R$${(ganhoMin*7).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>15 minutos</td>
                        <td>${(prodMin*15).toFixed(2)}kg</td>
                        <td>R$${(ganhoMin*15).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>30 minutos</td>
                        <td>${(prodMin*30).toFixed(2)}kg</td>
                        <td>R$${(ganhoMin*30).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>1 hora e 30 minutos</td>
                        <td>${(prodMin*90).toFixed(2)}kg</td>
                        <td>R$${(ganhoMin*90).toFixed(2)}</td>
                    </tr>
                </table>
            </div>
            <h4 class="txt-finance">
                Como podemos perceber, em minutos de desatenção você pode ter uma perda considerável.
                Quer mesmo depender do fator humano?
            </h4>
            <button class="btn-chamada" onclick="abrirPopUp()">NÃO!!!</button>
        </div>
        `
    }
};