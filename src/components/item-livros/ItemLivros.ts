import { LivroController } from "../../controllers/LivroController";
import { modalConfirmar, mostrarMensagem } from "../modal/Modal";
import './item-livros.css';
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

        const botaoEmprestar = tr.querySelector('.btn-emprestar');
        if (botaoEmprestar) {
            if (livro.disponivel == 1) {
                botaoEmprestar.addEventListener('click', () => {
                    LivroController.carregarFormEmprestarLivro(livro.id);
                });
            } else {
                botaoEmprestar.textContent = 'emprestado';
                botaoEmprestar.classList.add('emprestado');

                botaoEmprestar.addEventListener('click', () => {
                    LivroController.verEmprestimo(livro.id);
                });
            }
        }


        const botaoEditar = tr.querySelector('.btn-editar');
        botaoEditar?.addEventListener('click', () => {
            LivroController.carregarFormEditarLivro(livro.id);
        });

        const botaoExcluir = tr.querySelector('.btn-excluir');
        botaoExcluir?.addEventListener('click', async () => {
            modalConfirmar(async () => {
                try {
                    await LivroController.excluirLivro(livro.id);
                    mostrarMensagem('sucesso', 'Livro excluido com sucesso', 'modalConfirmar');
                }
                catch (error) {
                    if (error && typeof error === 'object' && 'message' in error) {
                        mostrarMensagem('erro', (error as { message: string }).message, 'modalConfirmar');
                    } else {
                        mostrarMensagem('erro', 'Erro ao excluir livro', 'modalConfirmar');
                    }
                }
            });
        });




        return tr;
    });
}
