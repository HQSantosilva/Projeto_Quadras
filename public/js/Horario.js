// Defina uma função para carregar a lista de horários
function carregarHorarios() {
    fetch('/horarios') // Rota que retorna a lista de horários (implemente no servidor)
        .then(response => response.json())
        .then(data => {
            const horariosList = document.getElementById('horarios-list');
            horariosList.innerHTML = ''; // Limpa o conteúdo anterior

            data.forEach(horario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${horario.quadraId}</td>
                    <td>${horario.dias}</td>
                    <td>${horario.inicio}</td>
                    <td>${horario.fim}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-editar" data-id="${horario._id}"
                            data-quadraid="${horario.quadraId}" data-dias="${horario.dias}"
                            data-inicio="${horario.inicio}" data-fim="${horario.fim}">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="excluirHorario('${horario._id}')">Excluir</button>
                    </td>
                `;
                horariosList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar horários:', error));
}

// Função para abrir a modal de edição com os dados do horário selecionado
function abrirModalEditar(quadraId, dias, inicio, fim) {
    $('#editarHorarioModal').on('shown.bs.modal', function () {
        document.getElementById('editQuadraId').value = quadraId;
        document.getElementById('editDias').value = dias;
        document.getElementById('editInicio').value = inicio;
        document.getElementById('editFim').value = fim;
    });

    $('#editarHorarioModal').modal('show');
}

// Função para editar um horário
function editarHorario() {
    const horarioId = document.getElementById('editHorarioId').value;
    const quadraId = document.getElementById('editQuadraId').value;
    const dias = document.getElementById('editDias').value;
    const inicio = document.getElementById('editInicio').value;
    const fim = document.getElementById('editFim').value;

    const data = {
        quadraId: quadraId,
        dias: dias,
        inicio: inicio,
        fim: fim
    };

    fetch(`/horarios/${horarioId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Atualiza a lista após a edição
            carregarHorarios();
            $('#editarHorarioModal').modal('hide'); // Fecha a modal após a edição
        } else {
            console.error('Erro ao editar horário:', response.statusText);
        }
    })
    .catch(error => console.error('Erro ao editar horário:', error));
}

// Função para excluir um horário
function excluirHorario(horarioId) {
    if (confirm('Tem certeza que deseja excluir este horário?')) {
        fetch(`/horarios/${horarioId}`, { method: 'DELETE' }) // Implemente a rota de deleção no servidor
            .then(response => {
                if (response.ok) {
                    // Atualiza a lista após exclusão
                    carregarHorarios();
                } else {
                    console.error('Erro ao excluir horário:', response.statusText);
                }
            })
            .catch(error => console.error('Erro ao excluir horário:', error));
    }
}

// Carrega os horários quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    carregarHorarios();
});
