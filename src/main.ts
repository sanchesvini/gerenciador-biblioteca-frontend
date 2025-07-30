import { itemLivros } from "./components/ItemLivros";
import { formularioLivro } from "./components/LivroForm";

async function carregarLivros() {
    const container = document.getElementById('tbody-livros');
    if (!container) return;
    const itensLivros: HTMLTableRowElement[] = await itemLivros();
    container.innerHTML = ''; // Limpa o conteúdo existente
    itensLivros.forEach(item => {
        container.appendChild(item);
    });
}

async function inicializarFormulario() {
    const container = document.getElementById('formulario-livro');
    if (!container) return;

    const form = await formularioLivro();
    container.appendChild(form);
}

document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
    inicializarFormulario();
});