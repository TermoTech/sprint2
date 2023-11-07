function fazerLogin(){
    var user = ipt_user.value;
    var senha = ipt_senha.value;

    var users = ['fernanda.caramico@basic.admin', 'fernanda.caramico@premium.admin', 'fernanda.caramico@basic.funcionario', 'fernanda.caramico@premium.funcionario'];

    var senhas = ['ipt1230', 'ipt1231', 'ipt1232', 'ipt1233'];
    if(user == users[0] && senha == senhas[0]){
        window.location = "/supervisorBasic/painel"; 
    
    } else if(user == users[1] && senha == senhas[1]){
        window.location = "/supervisorPremium/painel"; 
    
    } else if(user == users[2] && senha == senhas[2]){
        window.location = "/usuarioBasic/painel"; 
    } else if(user == users[3] && senha == senhas[3]){
        window.location = "/usuarioPremium/painel"; 
    } else{
         mensagem_erro.style.display = "flex";
    }
}

var cont0 = 0;

function slideImagens(){

    cont0 += 1;

    if(cont0 == 1){ 
        slides_imagem.style.backgroundImage = `url("/staticSite/imagens/imgSlide1.jpeg")`;

    } else if(cont0 == 2){ 
        slides_imagem.style.backgroundImage = `url("/staticSite/imagens/imgSlide2.jpeg")`;
    
    } else if(cont0 == 3){ 
        slides_imagem.style.backgroundImage = `url("/staticSite/imagens/imgSlide3.jpeg")`;
    
    } else if(cont0 == 4){ 
        slides_imagem.style.backgroundImage = `url("/staticSite/imagens/imgSlide0.jpeg")`;
        cont0 = 0;
    }
}

setInterval(slideImagens, 5000)