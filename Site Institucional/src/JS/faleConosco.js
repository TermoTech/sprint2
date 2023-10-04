function abrirPopUp() {
    fale_conosco.innerHTML = `
    <div class="div-pop-up-fc">
        <br> <u class="margem-header-fc">Fale conosco</u> <img onclick="fecharPopUp()" id="quit_fc" src="imagens/quitFC.png"><br> <br> <br>
        <form>
        <span class="margem-titulos-fc">Seu email</span> <br>
        <input type="text" id="ipt_email" onchange="validarEmail()" name="email" required> <br> 
        <p id="erro" class="mensagem-erro"></p><br>
        
        <span class="margem-titulos-fc">Nome</span> <br>
        <input type="text" id="ipt_assunto" required> <br>
        <p id="erro_nome" class="mensagem-erro"></p><br> <br>
        
        <span class="margem-titulos-fc">Mensagem</span> <br>
        <textarea id="text-msg" cols="30" rows="10" required></textarea>
        <p id="erro_msg" class="mensagem-erro"></p><br>
        
        <button class="botao-enviar-fc" type="submit" id="botao_submit" disabled>
            Enviar email
        </button> 
        </form>

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