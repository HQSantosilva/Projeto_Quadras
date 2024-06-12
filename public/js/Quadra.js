// Defina uma função para carregar a lista de quadras
document.addEventListener("DOMContentLoaded", async () => {
    const quadrasList = document.getElementById("quadras-list");
    // Fazer uma requisição GET para obter a lista de clientes
    const response = await fetch('http://localhost:3000/quadras');
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
                <button class="btn btn-sm btn-primary editarQuadraBtn" data-quadra-id="${quadra._id}">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="excluirQuadra('${quadra.dataset.quadraId}')">Excluir</button>
            </td>
        `;
        quadrasList.appendChild(tr);
    })
});

// Função para editar uma quadra
async function editarQuadra(id) {
    try {
        console.log(`Editando quadra com o ID: ${id}`);
        const quadraTRRef = document.getElementById(`quadra-${id}`);
        //Obter os elementos da linha da quacra
        const nomeElement = quadraTRRef.querySelector('#edtNome');
        const fotoElement = quadraTRRef.querySelector('#edtFoto');
        const descricaoElement = quadraTRRef.querySelector('#edtDescricao');
        const tipoElement = quadraTRRef.querySelector('#edtTipo');

        console.log('Elementos: ', nomeElement, fotoElement, descricaoElement, tipoElement);

        if (!nomeElement || !fotoElement || !descricaoElement || !tipoElement) {
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
        } else {
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

        if (!nomeElement || !fotoElement || !descricaoElement || !tipoElement) {
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

        const response = await fetch(`http://localhost:3000/quadras/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, foto, descricao, tipo })
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

async function excluirQuadra(id) {
    if (confirm("Tem certeza que deseja excluir essa quadra?")) {
        const response = await fetch(`http://localhost:3000/quadras/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("Quadra excluída com sucesso!");
            document.dispatchEvent(new Event("DOMContentLoaded"));
        } else {
            alert("Erro ao excluir cliente!")
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Adicionar evento de escuta para o envio do formulário de criar quadra
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Impedir o envio padrão do formulário

        
        // Obter os dados do formulário
        const formData = new FormData(event.target);
        const data = {
            nome: formData.get('nome'),
            foto: formData.get('foto'),
            descricao: formData.get('descricao'),
            tipo: formData.get('tipo')
        };
        
        try {
            // Enviar uma requisição POST para criar uma nova quadra
            const response = await fetch('http://localhost:3000/quadras/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(data)

            if (response.ok) {
                alert('Nova quadra criada com sucesso!');
                // Limpar os campos do formulário após a criação bem-sucedida
                event.target.reset();
            } else {
                console.error('Erro ao criar quadra:', response.status);
                alert('Erro ao criar quadra!');
            }
        } catch (error) {
            console.error('Erro ao criar quadra:', error);
            alert('Erro ao criar quadra!');
        }
    });
});



// Função para abrir a modal de edição da quadra
function abrirModalEdicao(quadra) {
    // Preencher os campos do formulário com os dados da quadra selecionada
    document.getElementById('quadraId').value = quadra._id;
    document.getElementById('editNome').value = quadra.nome;
    document.getElementById('editFoto').value = quadra.foto;
    document.getElementById('editDescricao').value = quadra.descricao;
    document.getElementById('editTipo').value = quadra.tipo;

    // Abrir a modal de edição
    $('#editarQuadraModal').modal('show');
}

// Adicionar evento de escuta para cada botão "Editar"
document.addEventListener("DOMContentLoaded", () => {
    const editarButtons = document.querySelectorAll('.editarBtn');

    editarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quadraId = button.dataset.quadraId;
            const quadraNome = button.dataset.quadraNome;
            const quadraFoto = button.dataset.quadraFoto;
            const quadraDescricao = button.dataset.quadraDescricao;
            const quadraTipo = button.dataset.quadraTipo;

            const quadra = {
                _id: quadraId,
                nome: quadraNome,
                foto: quadraFoto,
                descricao: quadraDescricao,
                tipo: quadraTipo
            };

            abrirModalEdicao(quadra);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const editarQuadraBtns = document.querySelectorAll('.editarQuadraBtn');

    editarQuadraBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quadraId = btn.dataset.quadraId;
            const quadra = obterQuadraPorId(quadraId); // Esta função deve retornar os detalhes da quadra com base no ID
            preencherModalEdicao(quadra);
            $('#editarQuadraModal').modal('show');
        });
    });
});

function preencherModalEdicao(quadra) {
    document.getElementById('quadraId').value = quadra.id;
    document.getElementById('editNome').value = quadra.nome;
    document.getElementById('editFoto').value = quadra.foto;
    document.getElementById('editDescricao').value = quadra.descricao;
    document.getElementById('editTipo').value = quadra.tipo;
}


