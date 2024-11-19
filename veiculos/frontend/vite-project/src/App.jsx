import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [veiculos, setVeiculos] = useState([]); // Lista de veículos
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Controla se estamos editando ou criando

  useEffect(() => {
    // Carrega os veículos ao montar o componente
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/veiculos');
      setVeiculos(response.data); // atualiza a lista de veículos com os dados da API
    } catch (error) {
      console.error(error); // exibe erro no console caso ocorra algum problema na requisição
    }
  };

  const handleInputChange = e => {
    // atualiza o estado do formulário sempre que o usuário digitar algo
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateVeiculos = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/veiculos', formData); // envia os dados para criar um novo veículo
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      }); // limpa o formulário após a criação
      fetchVeiculos(); // atualiza a lista de veículos
    } catch (error) {
      console.error(error); // exibe erro no console caso ocorra algum problema na requisição
    }
  };

  const handleUpdateVeiculos = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData);  // envia os dados para atualizar o veículo
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      }); // limpa o formulário após a atualização
      setIsEditing(false); // desabilita o modo de edição
      fetchVeiculos(); // atualiza a lista de veículos
    } catch (error) {
      console.error(error); // exibe erro no console caso ocorra algum problema na requisição
    }
  };

  const handleDeleteVeiculos = async placa => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`); // envia a requisição para excluir o veículo
      fetchVeiculos(); // atualiza a lista de veículos após a exclusão
    } catch (error) {
      console.error(error); // exibe erro no console caso ocorra algum problema na requisição
    }
  };

  const handleEditVeiculo = veiculo => {
    // preenche o formulário com os dados do veículo selecionado para edição
    setFormData({
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano
    });
    setIsEditing(true); // ativa o modo de edição
  };

  return (
    <div>
      <h1>Veículos</h1>
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}>
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita a placa durante a edição
          />
        </label> 
         {/*campo de entrada para a placa do veículo */}
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
          />
        </label>
         {/*campo de entrada para a marca do veículo */}
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
          />
        </label>
         {/*campo de entrada para o modelo do veículo */}
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </label>
         {/*campo de entrada para o ano do veículo */}
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button> 
        {/*botão que altera o texto conforme o modo de edição (cadastrar ou atualizar) */}
      </form>

      <ul>
        {/* Mapeia a lista de veículos para exibir um item para cada um */}
        {veiculos.map(veiculo => (
          <li key={veiculo.placa}>
            {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano}
            <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button>
            <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;