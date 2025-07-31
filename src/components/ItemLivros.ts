import { LivroController } from "../controllers/LivroController";

export async function itemLivros(): Promise<HTMLTableRowElement[]> {
    const livros = await LivroController.listarLivros();

    return livros.map(livro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.anoPublicacao}</td>
            <td>
                <button class="btn-emprestar">Emprestar</button>
                <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
            </td>
        `;

        const botaoEditar = tr.querySelector('.btn-editar');
        botaoEditar?.addEventListener('click', () => {
            LivroController.carregarFormEditarLivro(livro.id);
        });

        const botaoExcluir = tr.querySelector('.btn-excluir');
        botaoExcluir?.addEventListener('click', async () => {
            if (confirm(`Deseja excluir o livro "${livro.titulo}"?`)) {
                await LivroController.excluirLivro(livro.id);

            }
        });


        return tr;
    });
}
