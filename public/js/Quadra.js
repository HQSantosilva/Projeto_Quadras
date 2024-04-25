// Defina uma função para carregar a lista de quadras
function carregarQuadras() {
    fetch('/quadras') // Rota que retorna a lista de quadras (implemente no servidor)
        .then(response => response.json())
        .then(data => {
            const quadrasList = document.getElementById('quadras-list');
            quadrasList.innerHTML = ''; // Limpa o conteúdo anterior

            data.forEach(quadra => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${quadra.nome}</td>
                    <td><img src="${quadra.foto}" alt="${quadra.nome}" style="max-width: 100px;"></td>
                    <td>${quadra.descricao}</td>
                    <td>${quadra.tipo}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="abrirModalEditar('${quadra._id}', '${quadra.nome}', '${quadra.foto}', '${quadra.descricao}', '${quadra.tipo}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="excluirQuadra('${quadra._id}')">Excluir</button>
                    </td>
                `;
                quadrasList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar quadras:', error));
}

// Função para abrir a modal de edição com os dados da quadra selecionada
// Altere a função abrirModalEditar para que ela seja acionada quando o modal é exibido
function abrirModalEditar(quadraId, quadraNome, quadraFoto, quadraDescricao, quadraTipo) {
    $('#editarQuadraModal').on('shown.bs.modal', function () {
        document.getElementById('editQuadraId').value = quadraId;
        document.getElementById('editNomeQuadra').value = quadraNome;
        document.getElementById('editFotoQuadra').value = quadraFoto;
        document.getElementById('editDescricaoQuadra').value = quadraDescricao;
        document.getElementById('editTipoQuadra').value = quadraTipo;
    });

    $('#editarQuadraModal').modal('show');
}


// Função para editar uma quadra
function editarQuadra() {
    const quadraId = document.getElementById('editQuadraId').value;
    const nome = document.getElementById('editNomeQuadra').value;
    const foto = document.getElementById('editFotoQuadra').value;
    const descricao = document.getElementById('editDescricaoQuadra').value;
    const tipo = document.getElementById('editTipoQuadra').value;

    const data = {
        nome: nome,
        foto: foto,
        descricao: descricao,
        tipo: tipo
    };

    fetch(`/quadras/${quadraId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Atualiza a lista após a edição
            carregarQuadras();
            $('#editarQuadraModal').modal('hide'); // Fecha a modal após a edição
        } else {
            console.error('Erro ao editar quadra:', response.statusText);
        }
    })
    .catch(error => console.error('Erro ao editar quadra:', error));
}

// Função para excluir uma quadra
function excluirQuadra(quadraId) {
    if (confirm('Tem certeza que deseja excluir esta quadra?')) {
        fetch(`/quadras/${quadraId}`, { method: 'DELETE' }) // Implemente a rota de deleção no servidor
            .then(response => {
                if (response.ok) {
                    // Atualiza a lista após exclusão
                    carregarQuadras();
                } else {
                    console.error('Erro ao excluir quadra:', response.statusText);
                }
            })
            .catch(error => console.error('Erro ao excluir quadra:', error));
    }
}

// Carrega as quadras quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    carregarQuadras();
});
