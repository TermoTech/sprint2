function abrirPopUp() {
    fale_conosco.innerHTML = `
    <div class="div-fora">
    <div class="div-pop-up-fc">
        <br> <u class="margem-header-fc">Fale conosco</u> <svg onclick="fecharPopUp()" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 58%; cursor: pointer;" width="32" height="32" viewBox="0 0 32 32" onclick="fecharAddFunc()"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"/><path fill="currentColor" d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg><br> <br> <br>
        <form>
            
    <iframe width='100%' height='100%'
    src='https://app.pipefy.com/public/form/6SxShe4n?embedded=true'
    frameborder='0'></iframe>
            </form>
    </div>
    </div>
        `;

}

function validarEmail() {
    var email = ipt_email.value;
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]+$/.test(email)) {
        erro.innerHTML = ``;
        botao_submit.disabled = false;
    } else {
        erro.innerHTML = `Email inválido!`;
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