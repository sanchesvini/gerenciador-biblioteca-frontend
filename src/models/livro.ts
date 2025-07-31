export interface LivroRequest {
    titulo: string;
    autor: string;
    anoPublicacao: number;
}
export interface LivroResponse {
    id: number;
    titulo: string;
    autor: string;
    anoPublicacao: number;
    disponivel: boolean | number;
    nomeUsuario: string | null;
}
