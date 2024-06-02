async function carregarQuadras() {
    try {
        const responseQuadras = await fetch('/api/quadras');
        const quadras = await responseQuadras.json();
        const quadraSelect = document.getElementById("quadra");
        quadras.forEach(quadra => {
            const option = document.createElement("option");
            option.text = quadra.nome;
            option.value = quadra._id;
            quadraSelect.add(option);
        });

        // Adiciona um listener para quando a quadra for selecionada
        quadraSelect.addEventListener('change', carregarHorarios);
    } catch (error) {
        console.error('Erro ao carregar quadras:', error);
    }
}

async function carregarClientes() {
    try {
        const responseClientes = await fetch('/api/clientes');
        const clientes = await responseClientes.json();
        const clienteSelect = document.getElementById("cliente");
        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.text = cliente.nome;
            option.value = cliente._id;
            clienteSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar clientes:', error);
    }
}

async function carregarHorarios() {
    try {
        const quadraSelect = document.getElementById("quadra");
        const quadraId = quadraSelect.value;

        const responseHorarios = await fetch(`/api/horarios?quadraId=${quadraId}`);
        const horarios = await responseHorarios.json();
        const horarioSelect = document.getElementById("horario");
        horarioSelect.innerHTML = ''; // Limpar as opções atuais

        horarios.forEach(horario => {
            const option = document.createElement("option");
            option.text = horario.inicio;
            option.value = horario._id;
            horarioSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar horários:', error);
    }
}

document.getElementById('reservaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    data['clienteId'] = formData.get('cliente');
    data['quadraId'] = formData.get('quadra');
    data['horarioId'] = formData.get('horario');
    data['dataReserva'] = formData.get('dataReserva');

    try {
        const response = await fetch('/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Agendamento criado com sucesso!');
        } else {
            console.error('Erro ao criar agendamento:', response.status);
        }
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    carregarClientes();
    carregarQuadras();
});
