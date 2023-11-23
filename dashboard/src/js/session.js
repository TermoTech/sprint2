var nome = sessionStorage.NOME_USUARIO;

function validarSessao(){
    if(nome == null){
        window.location="/login";
    }
}

function sairConta(){
    sessionStorage.clear();
    window.location = "/login";
}