import { itemLivros } from '../item-livros/ItemLivros';
import './livro-table.css';

export async function livroTable(): Promise<HTMLTableElement> {
    const table = document.createElement('table');
    table.id = "table-livros";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="tbody-livros"></tbody>
    `;

    const tbody = table.querySelector('#tbody-livros') as HTMLTableSectionElement;
    const rows = await itemLivros();
    rows.forEach(tr => tbody.appendChild(tr));

    return table;
}
