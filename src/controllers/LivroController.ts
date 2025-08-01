import { abrirModalLivro } from "../components/modal/Modal";
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
        try {
            await LivroService.cadastrarLivro(novoLivro);

        } catch (error) {
            throw error;
        }

    }
    static async listarLivros(): Promise<LivroResponse[]> {
        return await LivroService.listarLivros();

    }
    static async carregarFormEditarLivro(id: number): Promise<void> {
        const livro = await LivroService.obterLivroPorId(id);

        const onSubmit = async (form: HTMLFormElement) => {
            await LivroController.editarLivro(form, id);
        };

        await abrirModalLivro(onSubmit, livro);
    }


    static async editarLivro(form: HTMLFormElement, id: number): Promise<void> {
        const formData = new FormData(form);
        const livroEditado: LivroRequest = {
            titulo: formData.get("titulo") as string,
            autor: formData.get("autor") as string,
            anoPublicacao: parseInt(formData.get("anoPublicacao") as string),
        };
        try {
            await LivroService.editarLivro(id, livroEditado);
            carregarLivros();
        } catch (error) {
            throw error;
        }
    }
    static async excluirLivro(id: number): Promise<void> {
        try {
            await LivroService.excluirLivro(id);
            carregarLivros();

        } catch (error) {
            throw error;
        }
    }
    static async carregarFormEmprestarLivro(id: number): Promise<void> {
        const livro = await LivroService.obterLivroPorId(id);
        const usuarios = await UsuarioService.listarUsuarios();


        const onSubmit = async (form: HTMLFormElement) => {
            await LivroController.emprestarLivro(form, id);


        };
        await abrirModalLivro(onSubmit, livro, usuarios);
    }
    static async emprestarLivro(form: HTMLFormElement, id: number): Promise<void> {
        const formData = new FormData(form);
        const idUsuario = parseInt(formData.get("usuarioId") as string);
        try {
            await LivroService.emprestarLivro(id, idUsuario);
            carregarLivros();

        } catch (error) {
            throw error;
        }
    }
    static async verEmprestimo(id: number): Promise<void> {
        const livro = await LivroService.obterLivroPorId(id);

        if (!livro.nomeUsuario) {
            throw new Error("Este livro não está emprestado.");
        };
        const livrosEmprestados: LivroResponse[] = [];
        const usuario = { id: 0, nome: livro.nomeUsuario, livrosEmprestados };

        const onSubmit = async (form: HTMLFormElement) => {
            await LivroController.devolverLivro(id);
        };
        await abrirModalLivro(onSubmit, livro, [usuario], true);
    }
    static async devolverLivro(id: number): Promise<void> {
        try {
            await LivroService.devolverLivro(id);
            carregarLivros();

        }
        catch (error) {
            throw error;
        }


    }
}