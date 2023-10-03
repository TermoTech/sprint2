function mudarValores1(){
    div_tudo_valores.innerHTML = `
    <div class="div-valores">
        <h1 class="valores-titulo">Nossos valores</h1>
        <div>
          <img id="seta_esquerda" class="seta-esquerda2" onclick="mudarValores2()" src="./imagens/home/setaBrancaDr.png">
          <img id="seta_direita" class="seta-direita2" src="./imagens/home/setaCinzaEsq.png">
          <br> <br>
          <div class="valor-esquerda">
            <img src="./imagens/home/iconeSeguranca.png" class="icone-valor"> <br> <br>
            <h1 class="titulo-valor">Segurança</h1> <br>
            <p class="texto-valor">As informações são armazenadas em banco de dados seguro feito pela própria TermoTech, garantindo que a integridade da empresa e dos operadores seja mantida a qualquer custo.</p>
          </div>
          <div class="valor-centro">
            <img src="./imagens/home/iconeParceria.png" class="icone-valor-parceria"> <br> <br>
            <h1 class="titulo-valor">Parceria</h1> <br>
            <p class="texto-valor">Valorizamos parcerias de longo prazo. Visamos entender as necessidades dos clientes e fornecer soluções personalizadas de acordo com o seu padrão de negócio, oferecendo sempre mais.</p>
          </div>
          <div class="valor-direita">
            <img src="./imagens/home/iconeSustentavel.png" class="icone-valor-sustentavel"> <br>
            <h1 class="titulo-valor">Sustentável</h1> <br>
            <p class="texto-valor">Nosso compromisso com a responsabilidade ambiental nos guia na busca de práticas sustentáveis e na redução de nosso impacto no meio ambiente.</p>
          </div>
        </div>
      </div>
    `;
}

function mudarValores2() {
    div_tudo_valores.innerHTML = `
    <div class="div-valores">
        <h1 class="valores-titulo">Nossos valores</h1>
        <div>
          <img id="seta_esquerda" class="seta-esquerda1" src="./imagens/home/setaCinzaEsq.png">
          <img id="seta_direita" class="seta-direita1" onclick="mudarValores1()" src="./imagens/home/setaBrancaDr.png">
          <br> <br>
          <div class="valor-esquerda">
            <img src="./imagens/home/iconeQualidade.png" class="icone-valor"> <br> <br>
            <h1 class="titulo-valor">Qualidade</h1> <br>
            <p class="texto-valor">Somos movidos pela busca incansável pela excelência. Nossos produtos são projetados e
              fabricados com os mais altos padrões de qualidade para atender e superar as expectativas de nossos
              clientes.</p>
          </div>
          <div class="valor-centro">
            <img src="./imagens/home/iconeEtica.png" class="icone-valor"> <br> <br>
            <h1 class="titulo-valor">Ética</h1> <br>
            <p class="texto-valor">Operamos com transparência, honestidade e integridade em todos os aspectos de nossos
              negócios. Mantemos nossos compromissos e promessas.</p>
          </div>
          <div class="valor-direita">
            <img src="./imagens/home/iconeInovacao.png" class="icone-valor-inovacao"> <br> <br>
            <h1 class="titulo-valor">Inovação</h1> <br>
            <p class="texto-valor">Estamos sempre buscando maneiras de melhorar nossos produtos e serviços, incluindo a
              integração IoT para monitoramento avançado, beneficiando clientes que almejam mudar a perspectiva.</p>
          </div>
        </div>
      </div>
    `;
}