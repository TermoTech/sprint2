const serialport = require('serialport'); 
const express = require('express'); 
const mysql = require('mysql2'); 

const SERIAL_BAUD_RATE = 9600; 
const SERVIDOR_PORTA = 3000; 
const HABILITAR_OPERACAO_INSERIR = true; 
const serial = async (
    valoresDht11Umidade,
    //valoresDht11Temperatura,
    // valoresLuminosidade,
    valoresLm35Temperatura
    // valoresChave
) => {
    const poolBancoDados = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'aluno',
        password: 'sptech',
        database: 'termoTech'
    }).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O Arduino não foi encontrado em nenhuma porta serial');
    }

    const arduino = new serialport.SerialPort({
        path: portaArduino.path,
        baudRate: SERIAL_BAUD_RATE
    });
    arduino.on('open', () => {
        console.log(`A leitura do Arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        const valores = data.split(',');
        const dht11Umidade = (parseFloat(valores[0]));   // Aqui podemos manipular o valor exibido no gráfico
        //const dht11Temperatura = parseFloat(valores[1]);
        // const luminosidade = parseFloat(valores[2]);
        const lm35Temperatura = (parseFloat(valores[1]));  // Aqui podemos manipular o valor exibido no gráfico
        // const chave = parseInt(valores[4]);

        valoresDht11Umidade.push(dht11Umidade);
        //valoresDht11Temperatura.push(dht11Temperatura);
        // valoresLuminosidade.push(luminosidade);
        valoresLm35Temperatura.push(lm35Temperatura);
        // valoresChave.push(chave);

        if (HABILITAR_OPERACAO_INSERIR) {
            // Inserts na empresa 1
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Matriz', lm35Temperatura*10, 3]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Reator', lm35Temperatura*10, 3]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Anel de resfriamento', lm35Temperatura*2.5, 3]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, umidade, fkMaquina) VALUES (?, ?, ?, ?)',
                ['DHT11', 'Ambiente', dht11Umidade*0.9, 3]
            );

            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Matriz', lm35Temperatura*10, 4]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Reator', lm35Temperatura*10, 4]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Anel de resfriamento', lm35Temperatura*2.5, 4]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, umidade, fkMaquina) VALUES (?, ?, ?, ?)',
                ['DHT11', 'Ambiente', dht11Umidade*0.9, 4]
            );
        }

        if (HABILITAR_OPERACAO_INSERIR) {
            // Inserts na empresa 2
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Matriz', lm35Temperatura*10, 2]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Reator', lm35Temperatura*10, 2]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Anel de resfriamento', lm35Temperatura*2.5, 2]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, umidade, fkMaquina) VALUES (?, ?, ?, ?)',
                ['DHT11', 'Ambiente', dht11Umidade*0.9, 2]
            );
    
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Matriz', lm35Temperatura*10, 1]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Reator', lm35Temperatura*10, 1]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, temperatura, fkMaquina) VALUES (?, ?, ?, ?)',
                ['LM35', 'Anel de resfriamento', lm35Temperatura*2.5, 1]
            );
            await poolBancoDados.execute(
                'INSERT INTO sensores (tipo, parteProcesso, umidade, fkMaquina) VALUES (?, ?, ?, ?)',
                ['DHT11', 'Ambiente', dht11Umidade*0.9, 1]
            );
        }
    });

    

    arduino.on('error', (mensagem) => {
        console.error(`Erro no Arduino (Mensagem: ${mensagem}`);
    });
}

const servidor = (
    valoresDht11Umidade,
    //valoresDht11Temperatura,
    // valoresLuminosidade,
    valoresLm35Temperatura
    // valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    //app.get('/sensores/dht11/temperatura', (_, response) => {
    //    return response.json(valoresDht11Temperatura);
    //});
    // app.get('/sensores/luminosidade', (_, response) => {
    //     return response.json(valoresLuminosidade);
    // });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });
    // app.get('/sensores/chave', (_, response) => {
    //     return response.json(valoresChave);
    // });
}

(async () => {
    const valoresDht11Umidade = [];
    //const valoresDht11Temperatura = [];
    // const valoresLuminosidade = [];
    const valoresLm35Temperatura = [];
    // const valoresChave = [];
    await serial(
        valoresDht11Umidade,
        //valoresDht11Temperatura,
        // valoresLuminosidade,
        valoresLm35Temperatura
        // valoresChave
    );
    servidor(
        valoresDht11Umidade,
        //valoresDht11Temperatura,
        // valoresLuminosidade,
        valoresLm35Temperatura
        // valoresChave
    );
})();
