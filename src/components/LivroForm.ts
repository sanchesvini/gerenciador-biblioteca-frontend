import type { LivroRequest } from '../models/livro';
import type { UsuarioResponse } from '../models/usuario';

export async function formularioLivro(
  onSubmit: (form: HTMLFormElement) => Promise<void>,
  livro?: LivroRequest,
  usuarios?: UsuarioResponse[],
  somenteLeitura: boolean = false
): Promise<HTMLFormElement> {
  const form = document.createElement('form');
  form.id = 'form-livro';

  const readonlyAttr = somenteLeitura ? 'readonly' : '';

  const selectHTML = usuarios ? `
  <label>
    ${somenteLeitura ? 'emprestado para:' : 'emprestar para:'}
    <select name="usuarioId" required ${readonlyAttr}>
      ${!somenteLeitura ? '<option value="">Selecione</option>' : ''}
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
      <input type="text" name="titulo" required value="${livro?.titulo ?? ''}" ${readonlyAttr} />
    </label>
    <br />
    <label>
      Autor:
      <input type="text" name="autor" required value="${livro?.autor ?? ''}" ${readonlyAttr}/>
    </label>
    <br />
    <label>
      Ano de Publicação:
      <input type="number" name="anoPublicacao" required value="${livro?.anoPublicacao ?? ''}" ${readonlyAttr}/>
    </label>
    <br />
    ${selectHTML}

<button type="submit">
  ${somenteLeitura
      ? 'Devolver'
      : usuarios
        ? 'Emprestar'
        : livro
          ? 'Salvar'
          : 'Cadastrar'}
</button>
  `;


  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await onSubmit(form);
      alert(somenteLeitura ? "Livro devolvido com sucesso!" : usuarios ? 'Livro emprestado com sucesso' : livro ? "Livro editado com sucesso!" : "Livro adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar livro.");
    }
  });

  return form;
};