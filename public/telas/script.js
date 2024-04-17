// Função para carregar dados da API e preencher os campos do formulário
async function carregarDados() {
    try {
        const responseClientes = await fetch('/api/clientes');
        const clientes = await responseClientes.json();
        const clienteSelect = document.getElementById("cliente");
        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.text = cliente.nome;
            option.value = cliente._id; // Armazene o ID do cliente como valor do option
            clienteSelect.add(option);
        });

        const responseQuadras = await fetch('/api/quadras');
        const quadras = await responseQuadras.json();
        const quadraSelect = document.getElementById("quadra");
        quadras.forEach(quadra => {
            const option = document.createElement("option");
            option.text = quadra.nome;
            option.value = quadra._id; // Armazene o ID da quadra como valor do option
            quadraSelect.add(option);
        });

        const responseServicos = await fetch('/api/servicos');
        const servicos = await responseServicos.json();
        const servicoSelect = document.getElementById("servico");
        servicos.forEach(servico => {
            const option = document.createElement("option");
            option.text = servico.nome;
            option.value = servico._id; // Armazene o ID do serviço como valor do option
            servicoSelect.add(option);
        });

        const responseHorarios = await fetch('/api/horarios');
        const horarios = await responseHorarios.json();
        const horarioSelect = document.getElementById("horario");
        horarios.forEach(horario => {
            const option = document.createElement("option");
            option.text = horario.horario; // Substitua "horario" pelo campo correto do seu horário
            option.value = horario._id; // Armazene o ID do horário como valor do option
            horarioSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Função para enviar os dados do formulário para o servidor ao enviar o formulário
document.getElementById('reservaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Agendamento criado com sucesso:', responseData);
            // Aqui você pode redirecionar o usuário para outra página ou fazer outra ação após o agendamento ser criado
        } else {
            console.error('Erro ao criar agendamento:', response.status);
            // Aqui você pode mostrar uma mensagem de erro para o usuário
        }
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        // Aqui você pode mostrar uma mensagem de erro para o usuário
    }
});

// Chamada da função de carregamento de dados quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
    carregarDados();
});
