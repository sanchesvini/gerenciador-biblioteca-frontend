import type { LivroRequest } from "../../models/livro";
import type { UsuarioResponse } from "../../models/usuario";
import { formularioLivro } from "../livro-form/LivroForm";
import "./modal.css"

function criarModal(titulo: string, form: HTMLElement, id: string): HTMLDialogElement {
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
        <section id="mensagem"></section>
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
    modal.showModal();
}


export function abrirModalUsuario(): void {
    //const modal = criarModal('Novo Usuário', 'Conteúdo do formulário de usuário', 'modalUsuario');
    //document.body.appendChild(modal);
}

export function fecharModal(modal: string): void {
    console.log(`Fechando modal: ${modal}`);
    const modalContainer = document.querySelector("#" + modal) as HTMLDialogElement;
    if (modalContainer) {
        modalContainer.innerHTML = '';
    }
}

export function mostrarMensagem(tipo: 'sucesso' | 'erro', mensagem: string): void {
    const sectionMsg = document.querySelector('#mensagem') as HTMLDivElement;
    if (!sectionMsg) return;
    sectionMsg.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';
    sectionMsg.innerHTML = `
        <p id="mensagem">${mensagem}</p>
    `;
    // setTimeout(() => {
    //     sectionMsg.innerHTML = '';
    //     sectionMsg.className = '';
    // }, 5000);

}

