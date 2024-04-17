async function carregarDados() {
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

        const responseQuadras = await fetch('/api/quadras');
        const quadras = await responseQuadras.json();
        const quadraSelect = document.getElementById("quadra");
        quadras.forEach(quadra => {
            const option = document.createElement("option");
            option.text = quadra.nome;
            option.value = quadra._id; 
            quadraSelect.add(option);
        });

        const responseHorarios = await fetch('/api/horarios');
        const horarios = await responseHorarios.json();
        const horarioSelect = document.getElementById("horario");
        horarios.forEach(horario => {
            const option = document.createElement("option");
            option.text = horario.horario; 
            option.value = horario._id; 
            horarioSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}


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
            
        } else {
            console.error('Erro ao criar agendamento:', response.status);
            
        }
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        
    }
});


document.addEventListener("DOMContentLoaded", function() {
    carregarDados();
});
