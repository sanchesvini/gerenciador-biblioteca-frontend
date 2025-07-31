import { UsuarioController } from "../controllers/UsuarioController";

export async function itemUsuarios(): Promise<HTMLTableRowElement[]> {
    const usuarios = await UsuarioController.listarUsuarios();

    return usuarios.map(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.nome}</td>
        
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
            </td>
        `;



        const botaoEditar = tr.querySelector('.btn-editar');
        botaoEditar?.addEventListener('click', () => {
            UsuarioController.carregarFormEditarUsuario(usuario.id);
        });

        const botaoExcluir = tr.querySelector('.btn-excluir');
        botaoExcluir?.addEventListener('click', async () => {
            if (confirm(`Deseja excluir o usuario "${usuario.nome}"?`)) {
                await UsuarioController.excluirUsuario(usuario.id);

            }
        });
        return tr;
    });
}
