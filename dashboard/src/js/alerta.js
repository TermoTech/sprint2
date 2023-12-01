var dados 

setInterval(() => {
    fetch('/supervisorBasic/erro/achaMinMax', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresaServer: sessionStorage.getItem('FK_EMPRESA'),
            idUsuarioServer:sessionStorage.getItem('ID_USUARIO') ,
            acessoServer: sessionStorage.getItem('ACESSO_USUARIO')
        })
    })
    .then(
        resposta => {
            resposta.json().then( resposta => {
                dados = resposta
                console.log(resposta)
                verificaErro()
            })
        }
    )
    .catch(
        error => {
            console.error(`Erro na obtenção dos dados dos setups para verificação de erro: ${error.message}`);
        }
    )
}, 5000);

function verificaErro() {
    console.log('Esta é a resposta', dados);
    for (let i = 0; i < dados.length; i++) {
        let idSensor = dados[i].idSensor;
        let min = dados[i].minimo
        let max = dados[i].maximo
        fetch('/supervisorBasic/erro/verifica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idSensorServer: idSensor
            })
        })
        .then(resposta => {
            resposta.json().then(resposta => {
                console.log('Medidas do sensor ', idSensor, ':', resposta);
                validaMedida(resposta, max, min);
            });
        })
        .catch(error => {
            console.error(`Erro na obtenção dos dados das medidas dos sensores erro: ${error.message}`);
        });
    }
}

function validaMedida(resposta, maximo, minimo){
    for(var i = 0; i < resposta.length; i++){
        let medida = resposta[i].captura;
        let idMedida = resposta[i].idCaptura
        if(medida >= maximo || medida <= minimo){
            fetch('/supervisorBasic/erro/validaErro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idMedidaServer: idMedida
                })
            })
            .then(resposta => {
                resposta.json().then(resposta => {
                    console.log(resposta)
                });
            })
            .catch(error => {
                console.error(`Erro na alteração dos dados das medidas dos sensores para um erro / erro: ${error.message}`);
            });
        }
    }
}