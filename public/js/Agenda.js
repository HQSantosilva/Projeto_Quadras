async function carregarQuadras() {
    try {
        const responseQuadras = await fetch('http://localhost:3000/quadras');
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
        const responseClientes = await fetch('http://localhost:3000/api/clientes');
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
        const dataReserva = document.getElementById("dataReserva").value;
        
        if (!quadraId || !dataReserva) {
            return;
        }
        
        const diasSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
        const diaSemana = diasSemana[new Date(dataReserva).getDay() + 1];
        
        const responseHorarios = await fetch(`http://localhost:3000/api/horarios`);
        const horarios = await responseHorarios.json();

        const responseReservas = await fetch(`http://localhost:3000/api/dadosAgendaData?dataSelecionada=${dataReserva}`);
        const reservas = await responseReservas.json();

        const horarioSelect = document.getElementById("horario");
        horarioSelect.innerHTML = '<option value="" disabled selected>Escolha um horário</option>';

        // Filtra os horários disponíveis para o dia da semana e pela quadra selecionada
        const horariosFiltrados = horarios.filter(horario => horario.dias.includes(diaSemana) && horario.quadraId === quadraId);
        
        // Verifica quais horários estão ocupados
        const horariosOcupados = reservas
            .filter(reserva => reserva.status === 'Ativo')
            .map(reserva => ({
                inicio: reserva.horarioInicio,
                fim: reserva.horarioFim
            }));

        // Remove os horários ocupados da lista de horários filtrados
        const horariosDisponiveis = horariosFiltrados.filter(horario => {
            return !horariosOcupados.some(ocupado => 
                ocupado.inicio === horario.inicio && ocupado.fim === horario.fim
            );
        });

        horariosDisponiveis.forEach(horario => {
            const option = document.createElement("option");
            option.text = `${horario.inicio}:00 - ${horario.fim}:00`;
            option.value = horario._id;
            horarioSelect.add(option);
        });

        if (horariosDisponiveis.length === 0) {
            const option = document.createElement("option");
            option.text = "Nenhum horário disponível";
            option.value = "";
            horarioSelect.add(option);
        }
    } catch (error) {
        console.error('Erro ao carregar horários:', error);
    }
}

document.getElementById('reservaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        clienteId: formData.get('cliente'),
        quadraId: formData.get('quadra'),
        horarioId: formData.get('horario'),
        dataReserva: formData.get('dataReserva')
    };

    try {
        const response = await fetch('http://localhost:3000/agenda', {
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

document.addEventListener("DOMContentLoaded", function () {
    carregarClientes();
    carregarQuadras();

    // Adiciona um listener para a data de reserva
    const dataReserva = document.getElementById("dataReserva");
    dataReserva.addEventListener('change', carregarHorarios);
});
