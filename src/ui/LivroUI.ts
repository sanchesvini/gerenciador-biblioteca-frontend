import { itemLivros } from "../components/ItemLivros";

export async function carregarLivros() {
    const container = document.getElementById('tbody-livros');
    if (!container) return;
    const itensLivros: HTMLTableRowElement[] = await itemLivros();
    container.innerHTML = ''; // Limpa o conteúdo existente
    itensLivros.forEach(item => {
        container.appendChild(item);
    });
}