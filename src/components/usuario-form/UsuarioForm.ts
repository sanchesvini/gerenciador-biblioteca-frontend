import type { UsuarioRequest } from '../../models/usuario';
import { mostrarMensagem } from '../modal/Modal';
import './usuario-form.css';

export async function formularioUsuario(
    onSubmit: (form: HTMLFormElement) => Promise<void>,
    usuario?: UsuarioRequest
): Promise<HTMLFormElement> {
    const form = document.createElement('form') as HTMLFormElement;
    form.id = 'form-usuario';

    form.innerHTML = `
    <label data-label="nome">
      <input type="text" name="nome" required value="${usuario?.nome ?? ''}" />
    </label>

    <button type="submit">
      ${usuario ? 'Salvar' : 'Cadastrar'}
    </button>
  `;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            await onSubmit(form);

            mostrarMensagem('sucesso', usuario ? 'Usuário editado com sucesso!' : 'Usuário adicionado com sucesso!', 'modalUsuario');
            form.reset();
            const nomeInput = form.querySelector<HTMLInputElement>('input[name="nome"]');
            if (nomeInput) nomeInput.value = ''
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                mostrarMensagem('erro', (error as { message: string }).message, 'modalUsuario');
            } else {
                mostrarMensagem('erro', 'Erro ao salvar usuário', 'modalUsuario');
            }
        }
    });

    return form;
}
