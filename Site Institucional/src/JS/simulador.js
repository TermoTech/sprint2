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

        div_table.style.display= "flex";
        td1.innerHTML = `${(prodMin*7).toFixed(2)}kg`;
        td2.innerHTML = `R$${(ganhoMin*7).toFixed(2)}`;
        td3.innerHTML = `${(prodMin*15).toFixed(2)}kg`;
        td4.innerHTML = `R$${(ganhoMin*15).toFixed(2)}`;
        td5.innerHTML = `${(prodMin*30).toFixed(2)}kg`;
        td6.innerHTML = `R$${(ganhoMin*30).toFixed(2)}`;
        td7.innerHTML = `${(prodMin*90).toFixed(2)}kg`;
        td8.innerHTML = `R$${(ganhoMin*90).toFixed(2)}`;
    }
};