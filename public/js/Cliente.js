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
        tr.id = `cliente-${cliente._id}`;
        tr.innerHTML = `
            <td id="edtNome">${cliente.nome}</td>
            <td id="edtEmail">${cliente.email}</td>
            <td id="edtTelefone">${cliente.telefone}</td>
            <td>
                <button class="btn btn-primary" id="edtBtn" onclick="editarCliente('${cliente._id}')">Editar</button>
                <button class="btn btn-danger" onclick="excluirCliente('${cliente._id}')">Excluir</button>
            </td>
        `;
        clientesList.appendChild(tr);
    });
});
 
async function editarCliente(id) {
    try {
        console.log(`Editando cliente com ID: ${id}`);
        const clienteTRRef = document.getElementById(`cliente-${id}`);
        // Obter os elementos da linha do cliente
        const nomeElement = clienteTRRef.querySelector('#edtNome');
        const emailElement = clienteTRRef.querySelector('#edtEmail');
        const telefoneElement = clienteTRRef.querySelector('#edtTelefone');

        console.log('Elementos:', nomeElement, emailElement, telefoneElement);

        if (!nomeElement || !emailElement || !telefoneElement) {
            throw new Error('Elementos não encontrados.');
        }

        nomeElement.contentEditable = true;
        emailElement.contentEditable = true;
        telefoneElement.contentEditable = true;

        console.log('Campos tornados editáveis.');
        
        nomeElement.classList.add('editable');
        emailElement.classList.add('editable');
        telefoneElement.classList.add('editable');
        
        const button = clienteTRRef.querySelector('#edtBtn');
        if (button) {
            button.innerText = 'Salvar';
            button.setAttribute('onclick', `salvarEdicao('${id}')`);
        } else {
            throw new Error('Botão não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao editar cliente:', error);
        alert('Erro ao editar cliente.');
    }
}

async function excluirCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        const response = await fetch(`/clientes/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("Cliente excluído com sucesso!");
            document.dispatchEvent(new Event("DOMContentLoaded"));
        } else {
            alert("Erro ao excluir cliente!");
        }
    }
}

async function salvarEdicao(id){
    try {
        console.log(`Salvando edição do cliente com ID: ${id}`);
        const clienteTRRef = document.getElementById(`cliente-${id}`);
        // Obter os elementos da linha do cliente
        const nomeElement = clienteTRRef.querySelector('#edtNome');
        const emailElement = clienteTRRef.querySelector('#edtEmail');
        const telefoneElement = clienteTRRef.querySelector('#edtTelefone');

        console.log('Elementos:', nomeElement, emailElement, telefoneElement);

        if (!nomeElement || !emailElement || !telefoneElement) {
            throw new Error('Elementos não encontrados.');
        }

        nomeElement.contentEditable = false;
        emailElement.contentEditable = false;
        telefoneElement.contentEditable = false;

        console.log('Campos tornados não editáveis.');
        
        nomeElement.classList.remove('editable');
        emailElement.classList.remove('editable');
        telefoneElement.classList.remove('editable');
        
        const button = clienteTRRef.querySelector('#edtBtn');
        if (button) {
            button.innerText = 'Editar';
            button.setAttribute('onclick', `editarCliente('${id}')`);
        } else {
            throw new Error('Botão não encontrado.');
        }

        const nome = nomeElement.innerText;
        const email = emailElement.innerText;
        const telefone = telefoneElement.innerText;

        console.log('Dados do cliente:', nome, email, telefone);

        const response = await fetch(`/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, telefone })
        });

        if (response.ok) {
            alert("Cliente salvo com sucesso!");
        } else {
            alert("Erro ao salvar cliente!");
        }
    } catch (error) {
        console.error('Erro ao salvar edição do cliente:', error);
        alert('Erro ao salvar edição do cliente.');
    }
}