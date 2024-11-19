const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o pacote CORS

const app = express();

// Habilita CORS para todas as origens
app.use(cors());  // Ou você pode usar app.use(cors({ origin: 'http://localhost:5173' })) para limitar a origem

// Usando body-parser para entender o corpo das requisições em JSON
app.use(bodyParser.json());

// Array que armazena os veículos
const veiculos = [];

// Rota para obter todos os veículos
app.get('/veiculos', (req, res) => {
    // Retorna todos os veículos como resposta em formato JSON
    res.json(veiculos);
});

// Rota para obter um veículo específico por placa
app.get('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Extrai a placa da URL
    const veiculo = veiculos.find(v => v.placa === placa); // Procura o veículo com a placa correspondente
    if (veiculo) {
         // Se o veículo for encontrado, retorna os dados dele
        res.json(veiculo);
    } else {
        // Se não encontrar, retorna erro 404 (não encontrado)
        res.status(404).json({ message: 'Veículo não encontrado.' });
    }
});

// Rota para cadastrar um novo veículo
app.post('/veiculos', (req, res) => {
    const { placa, marca, modelo, ano } = req.body;
    const veiculo = { placa, marca, modelo, ano };
    veiculos.push(veiculo);
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' });
});

// Rota para atualizar as informações de um veículo
app.put('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Extrai a placa da URL
    const { marca, modelo, ano } = req.body; // Extrai os dados do corpo da requisição
    const veiculo = veiculos.find(v => v.placa === placa); // Procura o veículo pelo número da placa
    if (veiculo) {
        // Se o veículo for encontrado, atualiza as informações
        veiculo.marca = marca || veiculo.marca;
        veiculo.modelo = modelo || veiculo.modelo;
        veiculo.ano = ano || veiculo.ano;
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' });
    } else {
        // Se não encontrar o veículo, retorna erro 404
        res.status(404).json({ message: 'Veículo não encontrado.' });
    }
});

// Rota para excluir um veículo
app.delete('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Extrai a placa da URL
    const veiculoIndex = veiculos.findIndex(v => v.placa === placa);  // Procura o índice do veículo pela placa
    if (veiculoIndex !== -1) {
        // Se o veículo for encontrado, remove ele do array
        veiculos.splice(veiculoIndex, 1);
        res.json({ message: 'Veículo excluído com sucesso.' });
    } else {
        // Se o veículo não for encontrado, retorna erro 404
        res.status(404).json({ message: 'Veículo não encontrado.' });
    }
});

const port = 3000;
app.listen(port, () => {
    // Mensagem de confirmação no console quando o servidor iniciar
    console.log(`Servidor rodando em http://localhost:${port}`);
});