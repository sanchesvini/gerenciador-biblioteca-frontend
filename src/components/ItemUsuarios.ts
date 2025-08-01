import { UsuarioController } from "../controllers/UsuarioController";
import { carregarUsuarios } from "../ui/UsuarioUI";
import { modalConfirmar, mostrarMensagem } from "./modal/Modal";

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
            modalConfirmar(async () => {
                try {
                    await UsuarioController.excluirUsuario(usuario.id);
                    mostrarMensagem('sucesso', 'Usuário excluido com sucesso', 'modalConfirmar');
                }
                catch (error) {
                    if (error && typeof error === 'object' && 'message' in error) {
                        mostrarMensagem('erro', (error as { message: string }).message, 'modalConfirmar');
                    } else {
                        mostrarMensagem('erro', 'Erro ao excluir usuário', 'modalConfirmar');
                    }
                }
            });
            carregarUsuarios();
        });
        return tr;
    });
}
