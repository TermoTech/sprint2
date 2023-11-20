function criarUsuario(){
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
        senhaServer: senhaVar
      }),
  })
      .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
              window.location = "/login";
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
    if(senha != senha2){ 
        erro.style.display = "flex";
        button_criar_usuario.disabled = true;

    } else {
        erro.style.display = "none";
        button_criar_usuario.disabled = false;

    }
}