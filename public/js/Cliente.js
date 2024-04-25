// Função para carregar a lista de clientes quando a página é carregada
document.addEventListener("DOMContentLoaded", async () => {
    const clientesList = document.getElementById("clientes-list");
    // Fazer uma requisição GET para obter a lista de clientes
    const response = await fetch('/clientes');
    const clientes = await response.json();
    // Limpar a lista de clientes antes de preenchê-la novamente
    clientesList.innerHTML = '';
    // Preencher a tabela com os clientes
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>
                <button class="btn btn-primary" onclick="editarCliente('${cliente._id}')">Editar</button>
                <button class="btn btn-danger" onclick="excluirCliente('${cliente._id}')">Excluir</button>
            </td>
        `;
        clientesList.appendChild(tr);
    });
});

// Função para editar um cliente
async function editarCliente(id) {
    // Redirecionar para a página de edição do cliente com o ID do cliente
    window.location.href = `/editarCliente/${id}`;
}

// Função para excluir um cliente
async function excluirCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        // Fazer uma requisição DELETE para excluir o cliente
        const response = await fetch(`/clientes/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("Cliente excluído com sucesso!");
            // Atualizar a lista de clientes após a exclusão
            document.dispatchEvent(new Event("DOMContentLoaded"));
        } else {
            alert("Erro ao excluir cliente!");
        }
    }
}
