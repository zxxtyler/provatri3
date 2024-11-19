const veiculos = []; // Declara um array vazio chamado 'veiculos' que armazenará dados de veículos
function getVeiculos(req, res) { // Define a função 'getVeiculos' que lida com requisições para obter a lista de veículos
    // Envia uma resposta em formato JSON contendo o array 'veiculos' ao cliente
res.json(veiculos);
}


function getVeiculosByPlaca(req, res) {// Define a função 'getVeiculosByPlaca' que lida com requisições para obter um veículo específico pela placa
     // Extrai o parâmetro 'placa' da URL da requisição
const { placa } = req.params;
const veiculos = veiculos.find(v => v.placa === placa); // Procura no array 'veiculos' por um veículo que tenha a placa correspondente
 // Verifica se o veículo foi encontrado
    if (veiculos) {
        // Se encontrado, envia o veículo como resposta em formato JSON
    res.json(veiculos);
    } else {
        // Se não encontrado, envia uma resposta de erro 404 com uma mensagem de 'Veículo não encontrado'
    res.status(404).json({ message: 'Veículo não encontrado.' });
    }
}
function createVeiculos(req, res) { // Define a função 'createVeiculos' que lida com requisições para criar um novo veículo
// Extrai os dados do veículo (placa, marca, modelo e ano) do corpo da requisição (req.body)
const { placa, marca, modelo, ano } = req.body;


const veiculos = { placa, marca, modelo, ano }; // Cria um objeto 'veiculos' com os dados recebidos
    veiculos.push(veiculos);   // Tenta adicionar o novo veículo ao array de veículos (mas o código está errado aqui)
        // Retorna uma resposta com status 201 (Criado) e uma mensagem de sucesso
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' });
}


function updateVeiculos(req, res) { const { placa } = req.params;  // Extrai a 'placa' do parâmetro da URL da requisição
    const { marca, modelo, ano } = req.body;     // Extrai os dados 'marca', 'modelo' e 'ano' do corpo da requisição (req.body)
    const veiculos = veiculos.find(v => v.placa === placa);     // Busca o veículo no array de veículos pelo parâmetro 'placa'
    if (veiculos) {
         // Atualiza as propriedades do veículo com os novos valores, se fornecidos
        // Caso não tenha sido fornecido algum valor, mantém o valor atual
        veiculos.marca = marca || veiculos.marca;
        veiculos.modelo = modelo || veiculos.modelo;
        veiculos.ano = ano || veiculos.ano;
                // Envia uma resposta de sucesso com a mensagem de que as informações foram atualizadas
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' });
        } else {
                    // Se o veículo não for encontrado, envia uma resposta de erro 404
        res.status(404).json({ message: 'Veículo não encontrado.' });
        }
}


function deleteVeiculos(req, res) { // Define a função 'deleteVeiculos' que lida com requisições para excluir um veículo específico
    const { placa } = req.params;
        // Extrai a 'placa' do parâmetro da URL da requisição
    const veiculosIndex = veiculos.findIndex(v => v.placa === placa);
        // Verifica se o veículo foi encontrado (índice diferente de -1)
        if (veiculosIndex !== -1) {
                    // Se encontrado, remove o veículo do array usando o método 'splice'
            veiculos.splice(veiculosIndex, 1);
        res.json({ message: 'Veículo excluído com sucesso.' });   // Envia uma resposta de sucesso informando que o veículo foi excluído
        } else {
        res.status(404).json({ message: 'Veículo não encontrado.' });
}
}
// Exporta as funções para que possam ser usadas em outras partes do código


module.exports = { getVeiculos, getVeiculosByPlaca, createVeiculos, updateVeiculos, deleteVeiculos};



