import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaAgenda = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get('/api/agendamentos');
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  const preencherListaAgendamentos = () => {
    const lista = [];

    for (let i = 0; i < 24; i++) {
      const hora = `${i.toString().padStart(2, '0')}:00`;
      const linha = (
        <tr key={hora}>
          <th>{hora}</th>
          {diasSemana.map((dia) => (
            <td key={`${dia}-${hora}`}>
              {agendamentos.find(agendamento => agendamento.inicio === hora && agendamento.diaSemana === dia) ? 'Agendado' : 'Disponível'}
            </td>
          ))}
        </tr>
      );
      lista.push(linha);
    }

    return lista;
  };

  return (
    <div className="container">
      <h1>Lista de Horários</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Hora</th>
            {diasSemana.map((dia, index) => (
              <th key={index}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {preencherListaAgendamentos()}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAgenda;
