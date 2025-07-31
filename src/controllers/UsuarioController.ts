import type { UsuarioRequest } from "../models/usuario";
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
}