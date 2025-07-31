import { formularioLivro } from "./components/LivroForm";
import { LivroController } from "./controllers/LivroController";
import { carregarLivros } from "./ui/LivroUI";

async function inicializarFormulario() {
    const container = document.getElementById('formulario-livro');
    if (!container) return;

    const form = await formularioLivro(LivroController.cadastrarLivro);
    container.appendChild(form);
}

document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
    inicializarFormulario();
});