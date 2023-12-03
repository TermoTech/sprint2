function abrirAddFunc(){
    popop_add_func.style.display = "flex";
    titulo_atualizar.innerHTML = 'Adicionar Funcionários';
    button_criar_usuario.innerHTML = `Criar Usuário`;
    input_nome.value = ``;
    erro.style.display = 'none'
    input_email.value = ``;
    input_senha.value = ``;
    input_repetir_senha.value = ``;
    achaMaquina(checkbox_div)
}

// function achaMaquina(div){
//     fetch(`/supervisorBasic/usuarios/listarMaquinas`, {
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//             fkEmpresaServer: sessionStorage.FK_EMPRESA
//         }),
//     })
//     .then(resultado => {
//         if (resultado.status == 200) {
//             resultado.json().then(resultado => {
//                 console.log(`Máquinas encontrados com sucesso:${JSON.stringify(resultado)}`)
//                 geraCheckBox(resultado, div)
//             })
//         } else {
//             console.log('Não foi encontrado nenhuma máquina.')
//         }
//     })
//     .catch(function (error) {
//         console.error(`Erro na obtenção das máquinas: ${error.message}`);
//     });
// }

// function geraCheckBox(resultado, div){
//     div.innerHTML = '<label for="Maquina_usuario" class="inputs_label">Responsável pela máquina:</label>'
//     for(var i = 0; i < resultado.length; i++){
//         div.innerHTML += `
//         <div style="display: flex; justify-content: center;">
//         <input onchange="verificaInput(${resultado[i].idMaquina})" type="checkbox" id="chk_maquina${resultado[i].idMaquina}" value="${resultado[i].numMaquina}">
//         <label for="chk_maquina1">Máquina ${resultado[i].numMaquina}</label>
//         </div>
//         `;
//     }
// }

// var maquina = 0; 

// function verificaInput( idMaquina){
//     maquina = idMaquina;
// }

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
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            fkEmpresaServer: sessionStorage.FK_EMPRESA,
            // maquinaServer: maquina
          }),
        })
          .then(function (resposta) {
              console.log("resposta: ", resposta);
    
              if (resposta.ok) {
                    fecharAddFunc()
                    window.location.reload()
              } else{
                  throw "Houve um erro ao tentar se cadastrar!";
              }
          })
    
          .catch(function (resposta){
              console.log(`#erro: ${resposta}`);
          });
    
          return false;
        }
      
function mensagemDeErro(){
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

function mostrarUsuarios(resposta){
    for(var i = 0; i < resposta.length; i++){
        exibir.innerHTML += `
            <tr>
                <td>
                    ${resposta[i].nome}
                </td>
                <td>
                    ${resposta[i].email}
                </td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onclick="abrirAtualFunc(${resposta[i].idUsuario}, '${resposta[i].nome}', '${resposta[i].email}', '${resposta[i].senha}')">
                        <g fill="none" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2">
                            <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                            <path
                                d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" />
                        </g>
                    </svg>
                </td>
                <td id="excluir" onclick="excluir(${resposta[i].idUsuario})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                        <path fill="currentColor"
                            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" />
                    </svg>
                </td>
            </tr>
        `;
    }
}
listaUsuarios()

function abrirAtualFunc(id, nome, email, senha){
    div_container.innerHTML += `
        <div id="popop_update_func${id}" style="display: none; background-color: #0000004d; backdrop-filter: blur(2px); position: fixed; width: 100%; height: 100%; justify-content: center; align-items: center;">
            <div id="inputs_dados">
                
                <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 70%; cursor: pointer;" width="32" height="32" viewBox="0 0 32 32" onclick="fecharUpdateFunc(popop_update_func${id})"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"/><path fill="currentColor" d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>

                <h3 style="color: black; font-size: 30px;" id="titulo_atualizar">Editar Funcionários</h3>
                
                <br><br>

                <div class="inputs_style">
                    <label for="nome_do_usuario" class="inputs_label">Nome:</label>
                    <input type="text" id="input_nome${id}" class="inputs_campos" value="${nome}">
                </div>
                <div class="inputs_style">
                    <label for="nome_email" class="inputs_label">E-mail:</label>
                    <input type="text" id="input_email${id}" class="inputs_campos" value="${email}">
                </div>
                <div class="inputs_style">
                    <label for="nome_senha" class="inputs_label">Senha:</label>
                    <input type="password" id="input_senha${id}" value="${senha}" class="inputs_campos">
                </div>
                <div class="inputs_style">
                    <label for="input_repetir_senha" class="inputs_label" >Repetir Senha:</label>
                    <input type="password" id="input_repetir_senha" class="inputs_campos" value="${senha}">
                </div>

                <div id="erro" class="inputs_style" style="display: none; height: 5px;">    
                    <p style="color: red;">
                        Senha incorreta!
                    </p>
                </div>

                <button id="button_update_usuario">Editar Usuário</button>
                </div>
        </div>
    `;
    // achaMaquina(document.getElementById(`div_maquinas${id}`), id)
    var popUpUpdate = document.getElementById(`popop_update_func${id}`)
    popUpUpdate.style.display = "flex";

    button_update_usuario.addEventListener('click', function () {
        var nomeUser = document.getElementById(`input_nome${id}`).value
        var emailUser = document.getElementById(`input_email${id}`).value
        var senhaUser = document.getElementById(`input_senha${id}`).value
        updateUsuario(id, nomeUser, emailUser, senhaUser);
        fecharUpdateFunc(popUpUpdate)
    });
}

function fecharUpdateFunc(popup){
    popup.style.display = "none";
    popup.remove()
}

function fecharAddFunc(){
    popop_add_func.style.display = "none";
}

function updateUsuario(id, nome, email, senha) {
    console.log(id, nome, email, senha)
    fetch(`/supervisorBasic/editar`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser: id,
            nomeServer: nome,
            emailServer: email,
            senhaUpdateServer: senha,
            // idMaquinaServer: maquina
            // maquinaServer: maquina
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Edição realizada com sucesso", resposta);
            setTimeout(() => {
                exibir.innerHTML = ``;
                listaUsuarios();                
            }, 1000);
        } else {
            throw new Error(`Erro na edição. Status: ${resposta.status}, ${resposta.statusText}`);
        }
    }).catch(function (erro) {
        console.error(`#ERRO: ${erro.message}`);
    });
    return false;
}

function excluir(id){
    fetch('/supervisorBasic/excluir', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUserServer: id
        })
    }).then(function(resposta){
        if(resposta.ok){
            console.log(resposta)
            setTimeout(() => {
                exibir.innerHTML = ``;
                listaUsuarios();                
            }, 1000);
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar apagar a conta! Código da resposta: " + resposta.status);
        }
    }).catch(function(resposta){
        console.log(`#ERRO: ${resposta}`);
    })
}