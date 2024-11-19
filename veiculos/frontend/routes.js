const express = require('express'); // importa o módulo Express para criar o servidor
const router = express.Router(); //cria um roteador para definir as rotas da aplicação

const controller = require('./controller'); // importa o controlador que contém as funções para tratar as requisições
router.get('/veiculos', controller.getVeiculos); // define uma rota GET para listar todos os veículos
router.get('/veiculos/:placa', controller.getVeiculosByPlaca); // define uma rota GET para buscar um veículo específico pela placa
router.post('/veiculos', controller.createVeiculos); // define uma rota POST para criar um novo veículo
router.put('/veiculos/:placa', controller.updateVeiculos); // define uma rota PUT para atualizar os dados de um veículo pela placa
router.delete('/veiculos/:placa', controller.deleteVeiculos); // define uma rota DELETE para remover um veículo pela placa

module.exports = router; // exporta o roteador para ser usado em outros arquivos
