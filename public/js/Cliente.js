async function cadastrarCliente(clienteData) {
    try {
        const response = await fetch('/cliente/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Cliente cadastrado:', data);
            return data;
        } else {
            throw new Error('Erro ao cadastrar cliente');
        }
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        throw error;
    }
}

async function atualizarCliente(clienteId, clienteData) {
    try {
        const response = await fetch(`/cliente/${clienteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Cliente atualizado:', data);
            return data;
        } else {
            throw new Error('Erro ao atualizar cliente');
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        throw error;
    }
}

async function excluirCliente(clienteId) {
    try {
        const response = await fetch(`/cliente/${clienteId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Cliente excluído com sucesso');
        } else {
            throw new Error('Erro ao excluir cliente');
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        throw error;
    }
}

async function buscarClientes(filtro) {
    try {
        const queryString = new URLSearchParams(filtro).toString();
        const response = await fetch(`/cliente?${queryString}`);
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

export { cadastrarCliente, atualizarCliente, excluirCliente, buscarClientes };