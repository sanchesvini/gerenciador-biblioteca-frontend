
import { itemUsuarios } from '../item-usuarios/ItemUsuarios';
import './usuario-table.css';

export async function usuarioTable(): Promise<HTMLTableElement> {
    const table = document.createElement('table');
    table.id = "table-usuarios";

    table.innerHTML = `
        <thead>
            <tr>
                <th>nome</th>
                
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="tbody-usuarios"></tbody>
    `;

    const tbody = table.querySelector('#tbody-usuarios') as HTMLTableSectionElement;
    const rows = await itemUsuarios();
    rows.forEach(tr => tbody.appendChild(tr));



    return table;
}
