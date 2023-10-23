var nomes = [];
var emails = [];
var senhas = [];
var ListaMaquinas = [];

function chkForm(){
    if(erro.style.display == "none" && (chk_maquina1.checked || chk_maquina1.checked)){
        button_criar_usuario.disabled = false;
    }
}

function criarUsuario(){
    exibir.innerHTML = ``;
    var nomeFunc = input_nome.value;
    var email = input_email.value;
    var senha = input_senha.value;
    var maquinas = "";

    //capturar valores do check
    if(chk_maquina1.checked){ 
        var maquina1 = chk_maquina1.value;
        maquinas += `${maquina1}`;    
        
    } else if(chk_maquina2.checked){ 
        var maquina2 = chk_maquina2.value;
        maquinas += `<br>${maquina2}`;

    }  
    // if(chk_maquina3.checked){ 
    //     var maquina3 = chk_maquina3.value;
    //     maquinas += `<br>${maquina3}`;

    // }  if(chk_maquina4.checked){
    //     var maquina4 = chk_maquina4.value;
    //     maquinas += `<br>${maquina4}`;

    // }

    nomes.push(nomeFunc);
    emails.push(email);
    senhas.push(senha);
    ListaMaquinas.push(maquinas);
    var idt = 0;

    while(idt < nomes.length){

        exibir.innerHTML += `
        <tr>
            <td>
                ${nomes[idt]}
            </td>
            <td>
                ${emails[idt]}
            </td>
            <td>
                ${ListaMaquinas[idt]}
            </td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onclick="abrirAtualFunc()">
                    <g fill="none" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2">
                        <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                        <path
                            d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" />
                    </g>
                </svg>
            </td>
            <td id="excluir${idt}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onclick="excluir${idt}.parentNode.style.display = 'none'">
                    <path fill="currentColor"
                        d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" />
                </svg>
            </td>
        </tr>
        `;

        idt += 1;
    }

    popop_add_func.style.display = "none";
}

function gerarEmail(){
    var nomeFunc = input_nome.value;
    var nome = nomeFunc.split(" ");
    var ultimaPosicao = nome.length - 1;
    input_email.value = `${nome[0].toLowerCase()}.${nome[ultimaPosicao].toLowerCase()}@nomeEmpresa.termo`

}

function mensagemDeErro(){
    var senha = input_senha.value;
    var senha2 = input_repetir_senha.value;

    //Mensagem de erro
    if(senha != senha2){ 
        erro.style.display = "flex";
        
    } else {
        erro.style.display = "none";
        
    }
}