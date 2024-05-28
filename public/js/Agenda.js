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
    const dataReserva = new Date(formData.get('dataReserva'));
    // Convertendo a data para o formato UTC
    const dataReservaUTC = dataReserva.toISOString();

    const data = {
        clienteId: formData.get('cliente'),
        quadraId: formData.get('quadra'),
        horarioId: formData.get('horario'),
        dataReserva: dataReservaUTC
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

async function editarAgendamento(id) {
    try {
        console.log(`Editando agendamento com ID: ${id}`);
        const agendamentoTRRef = document.getElementById(`agendamento-${id}`);
        const clienteElement = agendamentoTRRef.querySelector(`#edtClienteId-${id}`);
        const quadraElement = agendamentoTRRef.querySelector(`#edtQuadraId-${id}`);
        const horarioElement = agendamentoTRRef.querySelector(`#edtHorarioId-${id}`);
        const dataReservaElement = agendamentoTRRef.querySelector(`#edtDataReserva-${id}`);
        const statusElement = agendamentoTRRef.querySelector(`#edtStatus-${id}`);

        if (!clienteElement || !quadraElement || !horarioElement || !dataReservaElement || !statusElement) {
            throw new Error('Elementos não encontrados.');
        }

        clienteElement.contentEditable = true;
        quadraElement.contentEditable = true;
        horarioElement.contentEditable = true;
        dataReservaElement.innerHTML = `<input type="date" value="${dataReservaElement.innerText.trim()}">`; // Atualização para usar input de data
        statusElement.contentEditable = true;

        clienteElement.classList.add('editable');
        quadraElement.classList.add('editable');
        horarioElement.classList.add('editable');
        dataReservaElement.classList.add('editable');
        statusElement.classList.add('editable');

        const button = agendamentoTRRef.querySelector(`#edtBtn-${id}`);
        if (button) {
            button.innerText = 'Salvar';
            button.setAttribute('onclick', `salvarEdicaoAgendamento('${id}')`);
        } else {
            throw new Error('Botão não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao editar agendamento:', error);
        alert('Erro ao editar agendamento.');
    }
}

async function salvarEdicaoAgendamento(id) {
    try {
        console.log(`Salvando edição do agendamento com ID: ${id}`);
        const agendamentoTRRef = document.getElementById(`agendamento-${id}`);
        const clienteElement = agendamentoTRRef.querySelector(`#edtClienteId-${id}`);
        const quadraElement = agendamentoTRRef.querySelector(`#edtQuadraId-${id}`);
        const horarioElement = agendamentoTRRef.querySelector(`#edtHorarioId-${id}`);
        const dataReservaElement = agendamentoTRRef.querySelector(`#edtDataReserva-${id}`);
        const statusElement = agendamentoTRRef.querySelector(`#edtStatus-${id}`);

        if (!clienteElement || !quadraElement || !horarioElement || !dataReservaElement || !statusElement) {
            throw new Error('Elementos não encontrados.');
        }

        clienteElement.contentEditable = false;
        quadraElement.contentEditable = false;
        horarioElement.contentEditable = false;
        dataReservaElement.contentEditable = false;
        statusElement.contentEditable = false;

        clienteElement.classList.remove('editable');
        quadraElement.classList.remove('editable');
        horarioElement.classList.remove('editable');
        dataReservaElement.classList.remove('editable');
        statusElement.classList.remove('editable');

        const button = agendamentoTRRef.querySelector(`#edtBtn-${id}`);
        if (button) {
            button.innerText = 'Editar';
            button.setAttribute('onclick', `editarAgendamento('${id}')`);
        } else {
            throw new Error('Botão não encontrado.');
        }

        const clienteId = clienteElement.innerText.trim();
        const quadraId = quadraElement.innerText.trim();
        const horarioId = horarioElement.innerText.trim();
        const dataReserva = dataReservaElement.innerText.trim();
        const status = statusElement.innerText.trim();

        console.log('Dados do agendamento:', clienteId, quadraId, horarioId, dataReserva, status);

        const response = await fetch(`/api/agendamentos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clienteId, quadraId, horarioId, dataReserva, status })
        });

        if (response.ok) {
            alert('Agendamento salvo com sucesso!');
            carregarAgendamentos();
        } else {
            alert('Erro ao salvar agendamento!');
        }
    } catch (error) {
        console.error('Erro ao salvar edição do agendamento:', error);
        alert('Erro ao salvar edição do agendamento.');
    }
}

async function excluirAgendamento(id) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
            const response = await fetch(`/api/agendamentos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Agendamento excluído com sucesso!');
                carregarAgendamentos();
            } else {
                alert('Erro ao excluir agendamento!');
            }
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            alert('Erro ao excluir agendamento!');
        }
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
    const dataReserva = new Date(formData.get('dataReserva'));
    // Convertendo a data para o formato UTC
    const dataReservaUTC = dataReserva.toISOString();

    const data = {
        clienteId: formData.get('cliente'),
        quadraId: formData.get('quadra'),
        horarioId: formData.get('horario'),
        dataReserva: dataReservaUTC
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

async function filtrarPorData() {
    try {
        const filtroData = document.getElementById('filtroData').value;
        
        // Faça a requisição GET para buscar os agendamentos filtrados por data
        const response = await fetch(`/api/agendamentos?dataReserva=${filtroData}`);
        const agendamentos = await response.json();
        
        // Renderize os agendamentos filtrados na tabela
        const agendamentosList = document.getElementById("agendamentos-list");
        agendamentosList.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const tr = document.createElement('tr');
            tr.id = `agendamento-${agendamento._id}`;
            tr.innerHTML = `
                <td id="edtClienteId-${agendamento._id}">${agendamento.clienteId.nome}</td>
                <td id="edtQuadraId-${agendamento._id}">${agendamento.quadraId.nome}</td>
                <td id="edtHorarioId-${agendamento._id}">${agendamento.horarioId.inicio}</td>
                <td id="edtDataReserva-${agendamento._id}">${new Date(agendamento.dataReserva).toLocaleDateString()}</td>
                <td id="edtStatus-${agendamento._id}">${agendamento.status}</td>
                <td>
                    <button class="btn btn-primary" id="edtBtn-${agendamento._id}" onclick="editarAgendamento('${agendamento._id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirAgendamento('${agendamento._id}')">Excluir</button>
                </td>
            `;
            agendamentosList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao filtrar agendamentos por data:', error);
        alert('Erro ao filtrar agendamentos por data.');
    }
}

async function carregarAgendamentos() {
    try {
        const response = await fetch('/api/agendamentos');
        const agendamentos = await response.json();
        const agendamentosList = document.getElementById("agendamentos-list");

        agendamentosList.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const tr = document.createElement('tr');
            tr.id = `agendamento-${agendamento._id}`;
            tr.innerHTML = `
                <td id="edtClienteId-${agendamento._id}">${agendamento.clienteId.nome}</td>
                <td id="edtQuadraId-${agendamento._id}">${agendamento.quadraId.nome}</td>
                <td id="edtHorarioId-${agendamento._id}">${agendamento.horarioId.inicio}</td>
                <td id="edtDataReserva-${agendamento._id}">${new Date(agendamento.dataReserva).toLocaleDateString()}</td>
                <td id="edtStatus-${agendamento._id}">${agendamento.status}</td>
                <td>
                    <button class="btn btn-primary" id="edtBtn-${agendamento._id}" onclick="editarAgendamento('${agendamento._id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirAgendamento('${agendamento._id}')">Excluir</button>
                </td>
            `;
            agendamentosList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await carregarClientes();
    await carregarQuadras();
    await carregarAgendamentos(); // Nova função para carregar agendamentos

    document.getElementById('reservaForm').addEventListener('submit', enviarReserva);
});
