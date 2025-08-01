
import { usuarioTable } from "../components/usuario-table/UsuarioTable";

export async function carregarUsuarios() {

    const listaLivros = document.getElementById('lista-livros');
    const container = document.getElementById('lista-usuarios');

    if (!listaLivros || !container) return;

    listaLivros.hidden = true;
    container.hidden = false;
    container.innerHTML = '';

    const table = await usuarioTable();
    container.appendChild(table);
}
