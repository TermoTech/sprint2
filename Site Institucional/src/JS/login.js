function fazerLogin(){
    var senha = ipt_senha.value;
    var login = ipt_user.value;

    let datas = {
        login,
        senha
    }

    fetch("/login/entrar", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(datas),
    })
    .then((res) => {
        if (res.ok) {
            console.log("dentro do then res.ok no login")

            res.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.ACESSO_USUARIO = json.acesso;
                sessionStorage.FK_EMPRESA = json.fkEmpresa;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.PLANO_EMPRESA = json.plano;
                sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
                // verEmpresa()

                if(json.plano == 1){
                    if(json.acesso == 1){
                        //Supervisor premium
                        window.location = '/supervisorPremium/painel'
                    } else{
                        //Funcionário premium
                        window.location = '/usuarioPremim/painel'
                    }
                } else{
                    if(json.acesso == 1){
                        //Supervisor básico
                        window.location = '/supervisorPremium/painel'
                    } else{
                        //Funcionário básico
                        window.location = '/supervisorPremium/painel'
                    }
                }
            })

        } else {
            console.log("Erro ao realizar o login");
            res.text().then(text => {
                console.error(text);
            })
        }
    }).catch((error) => {
        console.log(error);
    })
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