import type { UsuarioRequest, UsuarioResponse } from "../models/usuario";

const API_BASE_URL = "http://localhost:8080/api/usuarios";

export const UsuarioService = {
    async cadastrarUsuario(usuario: UsuarioRequest): Promise<void> {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        if (!response.ok) {
            throw new Error(`Erro ao cadastrar usuario`);
        }
    },
    async listarUsuarios(): Promise<UsuarioResponse[]> {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`Erro ao listar usuarios`);
        }
        return await response.json();
    },
}