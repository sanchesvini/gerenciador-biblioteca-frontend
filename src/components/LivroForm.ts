import type { LivroRequest } from '../models/livro';
import type { UsuarioResponse } from '../models/usuario';

export async function formularioLivro(
  onSubmit: (form: HTMLFormElement) => Promise<void>,
  livro?: LivroRequest,
  usuarios?: UsuarioResponse[]
): Promise<HTMLFormElement> {
  const form = document.createElement('form');
  form.id = 'form-livro';

  const selectHTML = usuarios ? `
  <label>
    Usuário:
    <select name="usuarioId" required>
      <option value="">Selecione</option>
      ${usuarios.map(user => `
        <option value="${user.id}">${user.nome}</option>
      `).join('')}
    </select>
  </label>
  <br />
` : '';

  form.innerHTML = `
    <h2>${livro ? 'Editar livro' : 'Cadastrar novo livro'}</h2>
    <label>
      Título:
      <input type="text" name="titulo" required value="${livro?.titulo ?? ''}" />
    </label>
    <br />
    <label>
      Autor:
      <input type="text" name="autor" required value="${livro?.autor ?? ''}" />
    </label>
    <br />
    <label>
      Ano de Publicação:
      <input type="number" name="anoPublicacao" required value="${livro?.anoPublicacao ?? ''}" />
    </label>
    <br />
    ${selectHTML}

    <button type="submit">${usuarios ? 'Emprestar' : (livro ? 'Salvar' : 'Cadastrar')}</button>

  `;


  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await onSubmit(form);
      alert(livro ? "Livro editado com sucesso!" : "Livro adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar livro.");
    }
  });

  return form;
};