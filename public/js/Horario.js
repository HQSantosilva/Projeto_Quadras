async function criarHorario(horarioData) {
    try {
        const response = await fetch('/horario/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(horarioData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Horário criado:', data);
            return data;
        } else {
            throw new Error('Erro ao criar horário');
        }
    } catch (error) {
        console.error('Erro ao criar horário:', error);
        throw error;
    }
}

async function atualizarHorario(horarioId, horarioData) {
    try {
        const response = await fetch(`/horario/${horarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(horarioData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Horário atualizado:', data);
            return data;
        } else {
            throw new Error('Erro ao atualizar horário');
        }
    } catch (error) {
        console.error('Erro ao atualizar horário:', error);
        throw error;
    }
}

async function excluirHorario(horarioId) {
    try {
        const response = await fetch(`/horario/${horarioId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Horário excluído com sucesso');
        } else {
            throw new Error('Erro ao excluir horário');
        }
    } catch (error) {
        console.error('Erro ao excluir horário:', error);
        throw error;
    }
}

async function buscarHorarios(filtro) {
    try {
        const queryString = new URLSearchParams(filtro).toString();
        const response = await fetch(`/horario?${queryString}`);
        const horarios = await response.json();
        return horarios;
    } catch (error) {
        console.error('Erro ao buscar horários:', error);
        throw error;
    }
}

export { criarHorario, atualizarHorario, excluirHorario, buscarHorarios };
