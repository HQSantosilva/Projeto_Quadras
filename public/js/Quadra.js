// Defina uma função para carregar a lista de quadras
document.addEventListener("DOMContentLoaded", async () => {
    const quadrasList = document.getElementById("quadras-list");
    // Fazer uma requisição GET para obter a lista de clientes
    const response = await fetch('/quadras');
    const quadras = await response.json();
    // Limpar a lista de clientes antes de preenchê-la novamente
    quadrasList.innerHTML = '';
    // Preencher a tabela com os clientes
    quadras.forEach(quadra => {
        const tr = document.createElement('tr');
        tr.id = `quadra-${quadra._id}`
        tr.innerHTML = `
            <td id="edtNome">${quadra.nome}</td>
            <td id="edtFoto"><img src="${quadra.foto}" alt="${quadra.nome}" style="max-width: 100px;"></td>
            <td id="edtDescricao">${quadra.descricao}</td>
            <td id="edtTipo">${quadra.tipo}</td>
            <td>
                <button class="btn btn-sm btn-primary" id="edtBtn" onclick="editarQuadra('${quadra._id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="excluirQuadra('${quadra._id}')">Excluir</button>
            </td>
        `;
        quadrasList.appendChild(tr);

    })
});
// Função para editar uma quadra
async function editarQuadra(id){
    try{
        console.log(`Editando quadra com o ID: ${id}`);
        const quadraTRRef = document.getElementById(`quadra-${id}`);
        //Obter os elementos da linha da quacra
        const nomeElement = quadraTRRef.querySelector('#edtNome');
        const fotoElement = quadraTRRef.querySelector('#edtFoto');
        const descricaoElement = quadraTRRef.querySelector('#edtDescricao');
        const tipoElement = quadraTRRef.querySelector('#edtTipo');
        
        console.log('Elementos: ', nomeElement, fotoElement, descricaoElement, tipoElement);

        if(!nomeElement || !fotoElement || !descricaoElement || !tipoElement) {
            throw new Error('Elementos não encontrados.');
        }

        nomeElement.contentEditable = true;
        fotoElement.contentEditable = true;
        descricaoElement.contentEditable = true;
        tipoElement.contentEditable = true;

        console.log('Campos tornados editáveis.');

        nomeElement.classList.add('editable');
        fotoElement.classList.add('editable');
        descricaoElement.classList.add('editable');
        tipoElement.classList.add('editable');

        const button = quadraTRRef.querySelector('#edtBtn');
        if (button) {
            button.innerText = 'Salvar';
            button.setAttribute('onclick', `salvarEdicao('${id}')`);
        } else{
            throw new Error('Botão não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao editar quadra:', error);
        alert('Erro ao editar quadra.');
    }
}

async function salvarEdicao(id) {
    try {
        console.log(`Salvando edição da quadra com ID: ${id}`);
        const quadraTRRef = document.getElementById(`quadra-${id}`);
        // Obter os elementos da linha do cliente
        const nomeElement = quadraTRRef.querySelector('#edtNome');
        const fotoElement = quadraTRRef.querySelector('#edtFoto');
        const descricaoElement = quadraTRRef.querySelector('#edtDescricao');
        const tipoElement = quadraTRRef.querySelector('#edtTipo');

        console.log('Elementos: ', nomeElement, fotoElement, descricaoElement, tipoElement);

        if(!nomeElement || !fotoElement || !descricaoElement || !tipoElement) {
            throw new Error('Elementos não encontrados.');
        }

        nomeElement.contentEditable = true;
        fotoElement.contentEditable = true;
        descricaoElement.contentEditable = true;
        tipoElement.contentEditable = true;

        console.log('Campos tornados não editáveis.');

        nomeElement.classList.remove('editable');
        fotoElement.classList.remove('editable');
        descricaoElement.classList.remove('editable');
        tipoElement.classList.remove('editable');

        const button = quadraTRRef.querySelector('#edtBtn');
        if (button) {
            button.innerText = 'Editar';
            button.setAttribute('onclick', `editarQuadra('${id}')`);
        } else {
            throw new Error('Botão não encontrado.');
        }

        const nome = nomeElement.innerText;
        const foto = fotoElement.innerText;
        const descricao = descricaoElement.innerText;
        const tipo = tipoElement.innerText;

        console.log('Dados do cliente:', nome, foto, descricao, tipo);

        const response = await fetch(`/quadras/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, foto, descricao, tipo})
        });

        if (response.ok) {
            alert("Quadra salva com sucesso!");
        } else {
            alert("Erro ao salvar quadra!");
        }
    } catch (error) {
        console.error('Erro ao salvar edição da quadra:', error);
        alert('Erro ao salvar edição da quadra.');
    }
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

