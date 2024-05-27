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

async function enviarReserva(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitButton');

    // Verifica se o botão já está em estado de envio
    if (submitButton.getAttribute('data-submitting') === 'true') {
        return;
    }

    // Marca o botão como em estado de envio
    submitButton.setAttribute('data-submitting', 'true');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const data = {
        clienteId: formData.get('cliente'),
        quadraId: formData.get('quadra'),
        horarioId: formData.get('horario'),
        dataReserva: formData.get('dataReserva')
    };

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
    } finally {
        // Reativa o botão após a conclusão da requisição
        submitButton.removeAttribute('data-submitting');
        submitButton.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    carregarClientes();
    carregarQuadras();
    document.getElementById('reservaForm').addEventListener('submit', enviarReserva);
});
