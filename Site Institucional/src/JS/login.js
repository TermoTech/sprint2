function fazerLogin(){
    var user = ipt_user.value;
    var senha = ipt_senha.value;

    if(user.toUpperCase() == "CARAMICO" && senha == "ipt1234"){
        window.location = "dashboard.html";
    } else{
        mensagem_erro.style.display = "flex";
    }
}