function fazerLogin(){
    var user = ipt_user.value;
    var senha = ipt_senha.value;

    var users = ['caramico.herreira@basic.admin', 'caramico.herreira@premium.admin', 'caramico.herreira@basic.funcionario', 'caramico.herreira@premium.funcionario'];

    var senhas = ['ipt1230', 'ipt1231', 'ipt1232', 'ipt1233'];
    if(user == users[0] && senha == senhas[0]){
        window.location = "../../../dashboard/supervisorBasic/dashboard.html"; 
    
    } else if(user == users[1] && senha == senhas[1]){
        window.location = "../../../dashboard/supervisorPremium/dashboard.html"; 
    
    } else if(user == users[2] && senha == senhas[2]){
        window.location = "../../../dashboard/usuarioPremium/dashboard.html"; 
    
    } else if(user == users[3] && senha == senhas[3]){
        window.location = "../../../dashboard/usuarioBasic/painel.html"; 
    
    } else{
         mensagem_erro.style.display = "flex";
    }
}

var cont0 = 0;

function slideImagens(){

    cont0 += 1;

    if(cont0 == 1){ 
        slides_imagem.style.backgroundImage = `url("https://maispolimeros.com.br/wp-content/uploads/2019/09/processo-de-injecao-870x510.jpg")`;

    }
    if(cont0 == 2){ 
        slides_imagem.style.backgroundImage = `url("https://eplax.com.br/blog/wp-content/uploads/2020/12/AdobeStock_287551852-scaled.jpeg")`;
    
    }
    if(cont0 == 3){ 
        slides_imagem.style.backgroundImage = `url("https://www.an-tech.ind.br/wp-content/uploads/2020/05/banner_antech3-1-1.jpg")`;
        cont0 = 0;
    }
}

setInterval(slideImagens, 5000)