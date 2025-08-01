import { livroTable } from "../components/livro-table/LivroTable";

export async function carregarLivros() {

    const container = document.getElementById('lista-livros');
    if (!container) return;
    container.innerHTML = '';
    const table = await livroTable();

    container.appendChild(table);

}