import type { LivroRequest } from '../../models/livro';
import type { UsuarioResponse } from '../../models/usuario';
import { carregarLivros } from '../../ui/LivroUI';
import { mostrarMensagem } from '../modal/Modal';
import './livro-form.css';

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
  <label data-label="${somenteLeitura ? 'emprestado para' : 'emprestar para'}">
    <select name="usuarioId" required ${readonlyAttr}>
      ${!somenteLeitura ? '<option value="">Selecione</option>' : ''}
      ${usuarios.map(user => `
        <option value="${user.id}">${user.nome}</option>
      `).join('')}
    </select>
  </label>
` : '';


  form.innerHTML = `
  <label data-label="titulo">
    <input type="text" name="titulo" required value="${livro?.titulo ?? ''}" ${readonlyAttr} />
  </label>

  <label data-label="autor">
    <input type="text" name="autor" required value="${livro?.autor ?? ''}" ${readonlyAttr}/>
  </label>

  <label data-label="ano de publicação">
    <input type="number" name="anoPublicacao" required value="${livro?.anoPublicacao ?? ''}" ${readonlyAttr}/>
  </label>

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

      mostrarMensagem('sucesso', somenteLeitura ? "Livro devolvido com sucesso!" : usuarios ? 'Livro emprestado com sucesso' : livro ? "Livro editado com sucesso!" : "Livro adicionado com sucesso!", 'modalLivro');
      carregarLivros();

    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        mostrarMensagem('erro', (error as { message: string }).message, 'modalLivro');
      } else {
        mostrarMensagem('erro', 'Erro ao processar o livro', 'modalLivro');
      }
    }

  });

  return form;
};