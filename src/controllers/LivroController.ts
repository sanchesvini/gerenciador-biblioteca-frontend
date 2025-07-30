import type { LivroRequest, LivroResponse } from "../models/livro";
import { LivroService } from "../services/LivroService";

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

    }
    static async listarLivros(): Promise<LivroResponse[]> {
        return await LivroService.listarLivros();

    }
}