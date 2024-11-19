const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');


const app = express();  //cria uma instância do servidor Express.
    app.use(bodyParser.json()); //habilita o servidor para interpretar requisições com dados no formato JSON,
    //permitindo que o req.body seja preenchido automaticamente com o JSON enviado pelo cliente.
    app.use(cors()); //permite que o servidor aceite requisições de outros domínios, resolvendo problemas de
    // política de segurança que restringem chamadas de APIs entre diferentes origens (Cross-Origin Resource Sharing).
    app.use('/', routes);
//O middleware app.use('/', routes); faz com que todas as requisições à rota raiz (/) sejam tratadas pelo módulo routes.
    const port = 3000;
    //define a porta em que o servidor vai escutar.
    app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    //faz o servidor iniciar a escuta na porta 3000 e imprime no console uma mensagem indicando que o servidor está em execução no endereço
});




