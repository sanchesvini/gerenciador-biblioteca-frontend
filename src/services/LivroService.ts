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
    }
};