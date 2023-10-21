function abrirPopUp() {
    fale_conosco.innerHTML = `
    <div class="div-fora">
    <div class="div-pop-up-fc">
        <br> <u class="margem-header-fc">Fale conosco</u> <img onclick="fecharPopUp()" id="quit_fc" src="../src/img/quitFC.png"><br> <br> <br>
        <form>
        <span class="margem-titulos-fc">Seu email</span> <br>
        <input type="text" id="ipt_email" onchange="validarEmail()" name="email" required> <br> 
        <p id="erro_fale_conosco" class="mensagem-erro-pop-up"></p><br>
        
        <span class="margem-titulos-fc">Nome</span> <br>
        <input type="text" id="ipt_nome" required> <br>
        <p id="erro_nome" class="mensagem-erro-pop-up"></p><br> 

        <span class="margem-titulos-fc">Assunto</span> <br>
        <select id="select_assunto" class="select-assunto">
        <option value="1">Adionar uma nova máquina</option>
        <option value="2">Mudança de plano</option>
        <option value="3">Suporte técnico</option>
        <option value="4">Outro</option>
        </select> <br> 
        
        <span class="margem-titulos-fc">Mensagem</span> <br>
        <textarea id="text-msg" cols="30" rows="10" required></textarea>
        <p id="erro_msg" class="mensagem-erro"></p><br>
        
        <button class="botao-enviar-fc" type="submit" id="botao_submit" disabled>
            Enviar email
        </button> 
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