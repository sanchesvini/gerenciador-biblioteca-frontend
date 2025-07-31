import { itemUsuarios } from "../components/ItemUsuarios";


export async function carregarUsuarios() {
    const container = document.getElementById('tbody-usuarios');
    if (!container) return;
    const itensLivros: HTMLTableRowElement[] = await itemUsuarios();
    container.innerHTML = '';
    itensLivros.forEach(item => {
        container.appendChild(item);
    });
}