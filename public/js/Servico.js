async function criarServico(servicoData) {
    try {
        const response = await fetch('/servico/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicoData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Serviço criado:', data);
            return data;
        } else {
            throw new Error('Erro ao criar serviço');
        }
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        throw error;
    }
}

async function atualizarServico(servicoId, servicoData) {
    try {
        const response = await fetch(`/servico/${servicoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicoData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Serviço atualizado:', data);
            return data;
        } else {
            throw new Error('Erro ao atualizar serviço');
        }
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        throw error;
    }
}

async function excluirServico(servicoId) {
    try {
        const response = await fetch(`/servico/${servicoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Serviço excluído com sucesso');
        } else {
            throw new Error('Erro ao excluir serviço');
        }
    } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        throw error;
    }
}

async function buscarServicos(filtro) {
    try {
        const queryString = new URLSearchParams(filtro).toString();
        const response = await fetch(`/servico?${queryString}`);
        const servicos = await response.json();
        return servicos;
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        throw error;
    }
}

export { criarServico, atualizarServico, excluirServico, buscarServicos };
