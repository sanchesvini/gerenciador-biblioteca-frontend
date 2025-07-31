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
                <button class="btn-emprestar">${livro.disponivel ?? 1 ? 'emprestar' : 'emprestado'}</button>
                <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
            </td>
        `;

        if (livro.disponivel == 1) {
            const botaoEmprestar = tr.querySelector('.btn-emprestar');
            botaoEmprestar?.addEventListener('click', () => {
                LivroController.carregarFormEmprestarLivro(livro.id); // Aqui você pode substituir 1 pelo ID do usuário real
            });
        }
        else {
            const botaoEmprestar = tr.querySelector('.btn-emprestar');
            botaoEmprestar?.addEventListener('click', () => {
                LivroController.verEmprestimo(livro.id);
            });
        }


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
