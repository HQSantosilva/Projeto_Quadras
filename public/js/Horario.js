// Função para os horários quando a página carrega
document.addEventListener('DOMContentLoaded', async () => {
    const horariosList = document.getElementById("horarios-list");
    // Fazer uma requisição GET para obter a lista de horarios
    const response = await fetch('/horarios');
    const horarios = await response.json();
    // Limpar a lista de clientes antes de preenchê-la novamente
    horariosList.innerHTML = '';
    horarios.forEach(horario => {
        const tr = document.createElement('tr');
        tr.id = `horario-${horario._id}`;
        tr.innerHTML = `
            <td id="edtQuadraId">${horario.quadraId}</td>
            <td id="edtDias">${horario.dias}</td>
            <td id="edtHorarioIni">${horario.inicio}</td>
            <td id="edtHorarioFim">${horario.fim}</td>
            <td>
                <button class="btn btn-primary" id="edtBtn" onclick="editarHorario('${horario._id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="excluirHorario('${horario._id}')">Excluir</button>
            </td>
        `;
        horariosList.appendChild(tr);
    });
});

async function carregarDados() {
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
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}
// Função para editar um horário
function editarHorario(id) {
    try{
        console.log(`Editando cliente com ID: ${id}`);
        const horarioTRRef = document.getElementById(`horario-${id}`)
        // Obter os elementos da linha do horario
        const quadraIdElement = horarioTRRef.querySelector('#edtQuadraId');
        const diasElement = horarioTRRef.querySelector('#edtDias');
        const inicioElement = horarioTRRef.querySelector('#edtHorarioIni');
        const fimElement = horarioTRRef.querySelector('#edtHorarioFim');

        console.log('Elementos:', quadraIdElement, diasElement, inicioElement, fimElement);

        if (!quadraIdElement || !diasElement || !inicioElement || !fimElement) {
            throw new Error('Elementos não encontrados.');
        }

        quadraIdElement.contentEditable = true;
        diasElement.contentEditable = true;
        inicioElement.contentEditable = true;
        fimElement.contentEditable = true;

        console.log('Campos tornados editáveis.');

        quadraIdElement.classList.add('editable');
        diasElement.classList.add('editable');
        inicioElement.classList.add('editable');
        fimElement.classList.add('editable');

        const button = horarioTRRef.querySelector('#edtBtn');
        if (button) {
            button.innerText = 'Salvar';
            button.setAttribute('onclick', `salvarEdicao('${id}')`);
        } else {
            throw new Error ('Botão não encontrado.');
        }
    } catch (error){
        console.error('Erro ao editar horario:', error);
        alert('Erro ao editar horario.');
    }
}

async function salvarEdicao(id){
    try{
        console.log(`Salvando edição do horario com ID: ${id}`);
        const horarioTRRef = document.getElementById(`horario-${id}`);
        // Obter os elementos da linha dos horarios
        const quadraIdElement = horarioTRRef.querySelector('#edtQuadraId');
        const diasElement = horarioTRRef.querySelector('#edtDias');
        const inicioElement = horarioTRRef.querySelector('#edtHorarioIni');
        const fimElement = horarioTRRef.querySelector('#edtHorarioFim');

        if (!quadraIdElement || !diasElement || !inicioElement || !fimElement) {
            throw new Error('Elementos não encontrados.');
        }

        quadraIdElement.contentEditable = false;
        diasElement.contentEditable = false;
        inicioElement.contentEditable = false;
        fimElement.contentEditable = false;

        console.log('Campos tornados não editáveis.');

        quadraIdElement.classList.remove('editable');
        diasElement.classList.remove('editable');
        inicioElement.classList.remove('editable');
        fimElement.classList.remove('editable');

        const button = horarioTRRef.querySelector('#edtBtn');
        if (button) {
            button.innerText = 'Editar';
            button.setAttribute('onclick', `editarCliente('${id})`);
        } else {
            throw new Error('Botão não encontrado.');
        }
        
        const quadraId = quadraIdElement.innerText;
        const dias = diasElement.innerText;
        const inicio = inicioElement.innerText;
        const fim = fimElement.innerText;

        console.log('Dados do horário:', quadraId, dias, inicio, fim);

        const response = await fetch(`/horarios/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quadraId, dias, inicio, fim})
        });
        
        if (response.ok) {
            alert("Horario salvo com sucesso!");
        } else {
            alert("Erro ao salvar horario!")
        }
    } catch (error){
        console.error('Erro ao salvar edição do horario:', error);
        alert('Erro ao salvar edição do horario.');
    }
}

// Função para excluir um horário
async function excluirHorario(id) {
    if (confirm('Tem certeza que deseja excluir este horário?')) {
        const response = await fetch(`/horarios/${id}`,{
            method: 'DELETE'
        });
        if (response.ok){
            alert("Cliente excluído com sucesso!");
            document.dispatchEvent(new Event("DOMContentLoaded"));
        } else {
            alert("Erro ao excluir cliente!");
        }
    }
}



// Função para carregar as quadras disponíveis e preencher o campo de seleção
function carregarQuadrasDisponiveis() {
    fetch('/quadras') // Rota que retorna a lista de quadras (implemente no servidor)
        .then(response => response.json())
        .then(data => {
            const quadraSelect = document.getElementById('quadraId');
            data.forEach(quadra => {
                const option = document.createElement('option');
                option.value = quadra._id;
                option.textContent = quadra.nome;
                quadraSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar quadras disponíveis:', error));
};
