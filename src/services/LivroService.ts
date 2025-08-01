import type { LivroRequest, LivroResponse } from "../models/livro";

const API_BASE_URL = "http://localhost:8080/api/livros";

export const LivroService = {
    async cadastrarLivro(livro: LivroRequest): Promise<void> {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao cadastrar livro');
        }
    },
    async listarLivros(): Promise<LivroResponse[]> {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar livros');
        }
        return await response.json();
    },
    async obterLivroPorId(id: number): Promise<LivroResponse> {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar livro');
        }
        return await response.json();
    },
    async editarLivro(id: number, livro: LivroRequest): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao editar livro');
        }
    }
    ,
    async excluirLivro(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao deletar livro');
        }
    }
    ,
    async emprestarLivro(idLivro: number, idUsuario: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${idLivro}/emprestar/${idUsuario}`, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao emprestar livro');
        }
    },
    async devolverLivro(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${id}/devolver`, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao devolver livro');
        }
    }


};