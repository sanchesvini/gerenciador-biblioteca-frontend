import { formularioLivro } from "./components/livro-form/LivroForm";
import { menu } from "./components/menu/Menu";
import { formularioUsuario } from "./components/usuario-form/UsuarioForm";
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

function carregarMenu() {
    const menuContainer = document.getElementById('menu');
    if (menuContainer) {
        menuContainer.appendChild(menu());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarMenu();
    carregarLivros();
    inicializarFormularioLivro();
    carregarUsuarios();
    inicializarFormularioUsuario();

});