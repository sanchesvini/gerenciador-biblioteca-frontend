import type { LivroResponse } from './livro'

export interface UsuarioRequest {
    nome: string;
}
export interface UsuarioResponse {
    id: number;
    nome: string;
    livrosEmprestados: LivroResponse[];
}