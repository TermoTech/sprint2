function abrirPopUp() {
    fale_conosco.innerHTML = `
    <div class="div-fora">
        <div class="div-pop-up-fc">
            <br> <u class="margem-header-fc">Fale conosco</u> <img onclick="fecharPopUp()" id="quit_fc" src="/staticDashboard/img/quitFC.png"><br> <br> <br>
            <form>
            <iframe width='560' height='580'
            src='https://app.pipefy.com/public/form/r3m6BSX6?embedded=true'
            frameborder='0'></iframe>
            </form>
        </div>
    </div>
        `;

}

function validarEmail() {
    var email = ipt_email.value;
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]+$/.test(email)) {
        erro_fale_conosco.innerHTML = ``;
        botao_submit.disabled = false;
    } else {
        erro_fale_conosco.innerHTML = `Email inválido!`;
    }
}


function fecharPopUp() {
    fale_conosco.innerHTML = "";
}

document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        fecharPopUp()
    }
})

function mensagemEnviada() {
    alert("sucesso")
}