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
                <button>Emprestar</button>
                <button>Editar</button>
                <button>Excluir</button>
            </td>
        `;

        return tr;
    });
}