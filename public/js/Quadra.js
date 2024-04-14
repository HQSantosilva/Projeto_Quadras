async function criarQuadra(quadraData) {
    try {
        const response = await fetch('/quadra/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quadraData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Quadra criada:', data);
            return data;
        } else {
            throw new Error('Erro ao criar quadra');
        }
    } catch (error) {
        console.error('Erro ao criar quadra:', error);
        throw error;
    }
}

async function atualizarQuadra(quadraId, quadraData) {
    try {
        const response = await fetch(`/quadra/${quadraId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quadraData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Quadra atualizada:', data);
            return data;
        } else {
            throw new Error('Erro ao atualizar quadra');
        }
    } catch (error) {
        console.error('Erro ao atualizar quadra:', error);
        throw error;
    }
}

async function excluirQuadra(quadraId) {
    try {
        const response = await fetch(`/quadra/${quadraId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Quadra excluída com sucesso');
        } else {
            throw new Error('Erro ao excluir quadra');
        }
    } catch (error) {
        console.error('Erro ao excluir quadra:', error);
        throw error;
    }
}

async function buscarQuadras(filtro) {
    try {
        const queryString = new URLSearchParams(filtro).toString();
        const response = await fetch(`/quadra?${queryString}`);
        const quadras = await response.json();
        return quadras;
    } catch (error) {
        console.error('Erro ao buscar quadras:', error);
        throw error;
    }
}

export { criarQuadra, atualizarQuadra, excluirQuadra, buscarQuadras };
