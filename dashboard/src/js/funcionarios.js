


function criarUsuario(){
    exibir.innerHTML = ``;
    var nome = input_nome.value;
    var email = input_email.value;
    var senha = input_senha.value;

    fetch("/supervisorBasic/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          nomeServer: nome,
          emailServer: email,
          senhaServer: senha,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
            cardErro.style.display = "block";
  
            mensagem_erro.innerHTML =
              "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
  
            setTimeout(() => {
              window.location = "login.html";
            }, "2000");
  
            limparFormulario();
            finalizarAguardar();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
          finalizarAguardar();
        });
  
      popop_add_func.style.display = "none";
      return false;
    }
      




function mensagemDeErro(){
    var senha = input_senha.value;
    var senha2 = input_repetir_senha.value;

    //Mensagem de erro
    if(senha != senha2){ 
        erro.style.display = "flex";
        button_criar_usuario.disabled = true;

    } else {
        erro.style.display = "none";
        button_criar_usuario.disabled = false;

    }
}