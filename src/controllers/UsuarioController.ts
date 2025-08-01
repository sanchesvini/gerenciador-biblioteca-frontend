import { formularioUsuario } from "../components/UsuarioForm";
import type { UsuarioRequest, UsuarioResponse } from "../models/usuario";
import { UsuarioService } from "../services/UsuarioService";
import { carregarUsuarios } from "../ui/UsuarioUI";

export class UsuarioController {
    static async cadastrarUsuario(form: HTMLFormElement): Promise<void> {
        const formData = new FormData(form);
        const novoUsuario: UsuarioRequest = {
            nome: formData.get("nome") as string,
        };

        await UsuarioService.cadastrarUsuario(novoUsuario);
        form.reset();


    }
    static async listarUsuarios(): Promise<UsuarioResponse[]> {
        return await UsuarioService.listarUsuarios();

    }
    static async carregarFormEditarUsuario(id: number): Promise<void> {
        const livro = await UsuarioService.obterUsuarioPorId(id);
        const container = document.getElementById('formulario-usuario');
        if (!container) return;

        container.innerHTML = '';

        const form = await formularioUsuario(
            (form) => UsuarioController.editarUsuario(form, id),
            livro
        );

        container.appendChild(form);
    }
    static async editarUsuario(form: HTMLFormElement, id: number): Promise<void> {
        const formData = new FormData(form);
        const usuarioEditado: UsuarioRequest = {
            nome: formData.get("nome") as string,
        };

        await UsuarioService.editarUsuario(id, usuarioEditado);
        form.reset();
        carregarUsuarios();
    }

    static async excluirUsuario(id: number): Promise<void> {
        await UsuarioService.excluirUsuario(id);
        carregarUsuarios();
    }
}
