import type { UsuarioRequest, UsuarioResponse } from "../models/usuario";
import { UsuarioService } from "../services/UsuarioService";

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
    }
    static async editarUsuario(form: HTMLFormElement, id: number): Promise<void> { }

    static async excluirUsuario(id: number): Promise<void> {

    }
}