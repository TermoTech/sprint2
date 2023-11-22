function listaUsuarios() {
    fetch(`/supervisorBasic/usuarios/listar`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresaServer: sessionStorage.FK_EMPRESA
        }),
    })
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {
                    console.log(`Usuários encontrados com sucesso:${JSON.stringify(resposta)}`)
                    mostrarUsuarios(resposta);
                })
            } else {
                console.log('Não foi encontrado nenhum usuário.')
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos usuários: ${error.message}`);
        });
}



function criarUsuario() {
    exibir.innerHTML = ``;
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;


    fetch("/supervisorBasic/cadastrar", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            fkEmpresaServer: sessionStorage.FK_EMPRESA
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                fecharAddFunc()
                listaUsuarios()
            } else {
                throw "Houve um erro ao tentar se cadastrar!";
            }
        })

        .catch(function (resposta) {
            console.log(`#erro: ${resposta}`);
        });

    return false;
}

function listarMaquinas() {
    maquinas_empresa.innerHTML = `
    <label class="inputs_label">Responsável pela máquina:</label>
    `;
    fetch(`/supervisorBasic/usuarios/listarMaquinas`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresaServer: sessionStorage.FK_EMPRESA
        }),
    })
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {
                    console.log(`Usuários encontrados com sucesso:${JSON.stringify(resposta)}`)
                    for (
                        cont = 0;
                        cont < resposta.length;
                        cont += 1
                    ) {
                        var dados = resposta[cont];

                        maquinas_empresa.innerHTML += `
                    <label for="maquina_${dados.idMaquina}">
                        <input type="radio" name="maquinas" id="maquina_${dados.idMaquina}">
                        Maquina ${dados.idMaquina}
                    </label>
                    `;
                    }
                })
            } else {
                console.log('Não foi encontrado nenhum usuário.')
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos usuários: ${error.message}`);
        });
}

function mensagemDeErro() {
    var senha = input_senha.value;
    var senha2 = input_repetir_senha.value;

    //Mensagem de erro
    if (senha != senha2) {
        erro.style.display = "flex";
        button_criar_usuario.disabled = true;

    } else {
        erro.style.display = "none";
        button_criar_usuario.disabled = false;

    }
}

// function mostrarUsuarios(resposta){
//     for(var i = 0; i < resposta.length; i++){
//         exibir.innerHTML += `
//             <tr>
//                 <td>
//                     ${resposta[i].nome}
//                 </td>
//                 <td>
//                     ${resposta[i].email}
//                 </td>
//                 <td>
//                     Máquina: ${resposta[i].numMaquina}
//                 </td>
//                 <td>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onclick="abrirAtualFunc()">
//                         <g fill="none" stroke="currentColor" stroke-linecap="round"
//                             stroke-linejoin="round" stroke-width="2">
//                             <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
//                             <path
//                                 d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" />
//                         </g>
//                     </svg>
//                 </td>
//                 <td id="excluir">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
//                         <path fill="currentColor"
//                             d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" />
//                     </svg>
//                 </td>
//             </tr>
//         `;
//     }
// }
// listaUsuarios()