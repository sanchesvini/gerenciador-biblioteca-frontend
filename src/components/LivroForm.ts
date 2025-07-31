import { LivroController } from '../controllers/LivroController';
import type { LivroRequest } from '../models/livro';

export async function formularioLivro(
  onSubmit: (form: HTMLFormElement) => Promise<void>,
  livro?: LivroRequest
): Promise<HTMLFormElement> {
  const form = document.createElement('form');
  form.id = 'form-livro';

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
    <button type="submit">${livro ? 'Salvar' : 'Cadastrar'}</button>
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