function fazerLogin(){
    var user = ipt_user.value;
    var senha = ipt_senha.value;

    let users = ['caramico.herreira@basic.admin', 'caramico.herreira@premium.admin', 'caramico.herreira@basic.funcionaria', 'caramico.herreira@premium.funcionaria'];

    let senhas = ['ipt1230', 'ipt1231', 'ipt1232', 'ipt1233'];
    if(users.indexOf(user) >= 0 && senha == senhas[0]){
            window.location = "../../../dashboard/supervisor/dashboard.html"; 
        
    } if(users.indexOf(user) >= 0 && senha == senhas[1]){
        window.location = "../../../dashboard/supervisor/dashboard.html"; 
    
    } if(users.indexOf(user) >= 0 && senha == senhas[2]){
        window.location = "../../../dashboard/supervisor/dashboard.html"; 
    
    } if(users.indexOf(user) >= 0 && senha == senhas[3]){
        window.location = "../../../dashboard/supervisor/dashboard.html"; 
    
    } else{
         mensagem_erro.style.display = "flex";
    }

    // if(user.toUpperCase() == "CARAMICO" && senha == "ipt1234"){
    //     window.location = "dashboard.html";
    // } else{
    //     mensagem_erro.style.display = "flex";
    // }
}