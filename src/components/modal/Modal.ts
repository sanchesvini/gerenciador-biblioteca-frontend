import { LivroController } from "../../controllers/LivroController";
import type { LivroRequest } from "../../models/livro";
import type { UsuarioResponse } from "../../models/usuario";
import { formularioLivro } from "../livro-form/LivroForm";
import "./modal.css"

function criarModal(titulo: string, form: HTMLElement, id: string): HTMLElement {
    const container = document.createElement('dialog');
    container.id = id;
    container.classList.add('modal');

    container.innerHTML = `
    
    <main class="modal-conteudo">
        <header class="modal-header">
            <h2>${titulo}</h2>
            <button class="fechar-modal">X</button>
        </header>
        <div class="modal-form"></div>
    </main>
    
  `;
    const formContainer = container.querySelector('.modal-form');
    if (formContainer) {
        formContainer.appendChild(form);
    }

    container.querySelector('.fechar-modal')?.addEventListener('click', () => {
        container.remove();
    });

    return container;
}

export async function abrirModalLivro(
    onSubmit: (form: HTMLFormElement) => Promise<void>,
    livro?: LivroRequest,
    usuarios?: UsuarioResponse[],
    somenteLeitura: boolean = false
): Promise<void> {
    const container = document.getElementById('modalLivro');
    if (!container) return;

    const form = await formularioLivro(onSubmit, livro, usuarios, somenteLeitura);

    container.appendChild(form);

    const titulo = somenteLeitura
        ? 'Informações do empréstimo'
        : usuarios
            ? 'Emprestar livro'
            : livro
                ? 'Editar livro'
                : 'Cadastrar novo livro';

    const modal = criarModal(titulo, form, 'modalLivro');
    document.body.appendChild(modal);
}


export function abrirModalUsuario(): void {
    //const modal = criarModal('Novo Usuário', 'Conteúdo do formulário de usuário', 'modalUsuario');
    //document.body.appendChild(modal);
}