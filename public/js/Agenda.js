async function criarAgenda(agendaData) {
    try {
        const response = await fetch('/agenda/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendaData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Agenda criada:', data);
            return data;
        } else {
            throw new Error('Erro ao criar agenda');
        }
    } catch (error) {
        console.error('Erro ao criar agenda:', error);
        throw error;
    }
}

async function atualizarAgenda(agendaId, agendaData) {
    try {
        const response = await fetch(`/agenda/${agendaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendaData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Agenda atualizada:', data);
            return data;
        } else {
            throw new Error('Erro ao atualizar agenda');
        }
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        throw error;
    }
}

async function excluirAgenda(agendaId) {
    try {
        const response = await fetch(`/agenda/${agendaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Agenda excluída com sucesso');
        } else {
            throw new Error('Erro ao excluir agenda');
        }
    } catch (error) {
        console.error('Erro ao excluir agenda:', error);
        throw error;
    }
}

async function buscarAgendas(filtro) {
    try {
        const queryString = new URLSearchParams(filtro).toString();
        const response = await fetch(`/agenda?${queryString}`);
        const agendas = await response.json();
        return agendas;
    } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        throw error;
    }
}

export { criarAgenda, atualizarAgenda, excluirAgenda, buscarAgendas };
