import { livroTable } from "../components/livro-table/LivroTable";

export async function carregarLivros() {

    const listaUsuarios = document.getElementById('lista-usuarios');
    const container = document.getElementById('lista-livros');
    if (!container || !listaUsuarios) return;



    listaUsuarios.hidden = true;
    container.hidden = false;
    container.innerHTML = '';

    const table = await livroTable();


    container.appendChild(table);


}
