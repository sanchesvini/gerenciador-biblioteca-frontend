import { formularioLivro } from "./components/LivroForm";
import { formularioUsuario } from "./components/UsuarioForm";
import { LivroController } from "./controllers/LivroController";
import { UsuarioController } from "./controllers/UsuarioController";
import { carregarLivros } from "./ui/LivroUI";
import { carregarUsuarios } from "./ui/UsuarioUI";

async function inicializarFormularioLivro() {
    const container = document.getElementById('formulario-livro');
    if (!container) return;

    const form = await formularioLivro(LivroController.cadastrarLivro);
    container.appendChild(form);
}

async function inicializarFormularioUsuario() {
    const container = document.getElementById('formulario-usuario');
    if (!container) return;

    const form = await formularioUsuario(UsuarioController.cadastrarUsuario);
    container.appendChild(form);
}

document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
    inicializarFormularioLivro();
    carregarUsuarios();
    inicializarFormularioUsuario();

});