import { LivroController } from '../controllers/LivroController';

export async function formularioLivro(): Promise<HTMLFormElement> {
    const form = document.createElement('form');
    form.id = 'form-livro';

    form.innerHTML = `
    <h2>Cadastrar novo livro</h2>
    <label>
      Título:
      <input type="text" name="titulo" required />
    </label>
    <br />
    <label>
      Autor:
      <input type="text" name="autor" required />
    </label>
    <br />
    <label>
      Ano de Publicação:
      <input type="number" name="anoPublicacao" required />
    </label>
    <br />
    <button type="submit">Cadastrar</button>
  `;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            await LivroController.cadastrarLivro(form);
            alert("Livro adicionado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao adicionar livro.");
        }
    });

    return form;
};
