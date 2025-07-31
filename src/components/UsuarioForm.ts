import type { UsuarioRequest } from '../models/usuario';

export async function formularioUsuario(
    onSubmit: (form: HTMLFormElement) => Promise<void>,
    usuario?: UsuarioRequest
): Promise<HTMLFormElement> {
    const form = document.createElement('form');
    form.id = 'form-usuario';

    form.innerHTML = `
    <h2>${usuario ? 'Editar usuario' : 'Cadastrar novo usuario'}</h2>
    <label>
      Nome:
      <input type="text" name="nome" required value="${usuario?.nome ?? ''}" />
    </label>
    <br />
    
    <button type="submit">${usuario ? 'Salvar' : 'Cadastrar'}</button>
  `;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            await onSubmit(form);
            alert(usuario ? "Usuario editado com sucesso!" : "Usuario adicionado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar livro.");
        }
    });

    return form;
};