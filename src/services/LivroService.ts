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
            throw new Error(`Erro ao cadastrar livro`);
        }
    },
    async listarLivros(): Promise<LivroResponse[]> {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`Erro ao listar livros`);
        }
        return await response.json();
    },
    async obterLivroPorId(id: number): Promise<LivroResponse> {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar livro com ID ${id}`);
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
            throw new Error(`Erro ao editar livro com ID ${id}`);
        }
    }
    ,
    async excluirLivro(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir livro com ID ${id}`);
        }
    }


};