import { formularioLivro } from "../components/LivroForm";
import type { LivroRequest, LivroResponse } from "../models/livro";
import { LivroService } from "../services/LivroService";
import { UsuarioService } from "../services/UsuarioService";
import { carregarLivros } from "../ui/LivroUI";

export class LivroController {
    static async cadastrarLivro(form: HTMLFormElement): Promise<void> {
        const formData = new FormData(form);
        const novoLivro: LivroRequest = {
            titulo: formData.get("titulo") as string,
            autor: formData.get("autor") as string,
            anoPublicacao: parseInt(formData.get("anoPublicacao") as string),
        };

        await LivroService.cadastrarLivro(novoLivro);
        form.reset();
        carregarLivros();

    }
    static async listarLivros(): Promise<LivroResponse[]> {
        return await LivroService.listarLivros();

    }
    static async carregarFormEditarLivro(id: number): Promise<void> {
        const livro = await LivroService.obterLivroPorId(id);
        const container = document.getElementById('formulario-livro');
        if (!container) return;

        container.innerHTML = ''; // limpa formulário anterior

        const form = await formularioLivro(
            (form) => LivroController.editarLivro(form, id),
            livro
        );

        container.appendChild(form);
    }

    static async editarLivro(form: HTMLFormElement, id: number): Promise<void> {
        const formData = new FormData(form);
        const livroEditado: LivroRequest = {
            titulo: formData.get("titulo") as string,
            autor: formData.get("autor") as string,
            anoPublicacao: parseInt(formData.get("anoPublicacao") as string),
        };

        await LivroService.editarLivro(id, livroEditado);
        form.reset();
        carregarLivros();
    }
    static async excluirLivro(id: number): Promise<void> {
        await LivroService.excluirLivro(id);
        carregarLivros();
    }
    static async carregarFormEmprestarLivro(id: number): Promise<void> {
        const livro = await LivroService.obterLivroPorId(id);
        const usuarios = await UsuarioService.listarUsuarios();
        const container = document.getElementById('formulario-livro');
        if (!container) return;

        container.innerHTML = '';

        const form = await formularioLivro(
            (form) => LivroController.emprestarLivro(form, id),
            livro,
            usuarios
        );

        container.appendChild(form);
    }
    static async emprestarLivro(form: HTMLFormElement, id: number): Promise<void> {
        const formData = new FormData(form);
        const idUsuario = parseInt(formData.get("usuarioId") as string);

        await LivroService.emprestarLivro(id, idUsuario);
        form.reset();
        carregarLivros();
    }
}