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
                        <button class="btn btn-sm btn-primary" onclick="editarQuadra('${quadra.id}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="excluirQuadra('${quadra.id}')">Excluir</button>
                    </td>
                `;
                quadrasList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar quadras:', error));
}

// Função para editar uma quadra
function editarQuadra(quadraId) {
    // Implemente a lógica de redirecionamento para a página de edição
    // Exemplo: window.location.href = `/editarQuadra/${quadraId}`;
    console.log('Editar quadra com ID:', quadraId);
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
