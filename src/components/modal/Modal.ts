import type { LivroRequest } from "../../models/livro";
import type { UsuarioResponse } from "../../models/usuario";
import { formularioLivro } from "../livro-form/LivroForm";
import { formularioUsuario } from "../usuario-form/UsuarioForm";
import "./modal.css"

function criarModalForms(titulo: string, form: HTMLElement, id: string): HTMLDialogElement {
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

    const form = await formularioLivro(onSubmit, livro, usuarios, somenteLeitura);

    const titulo = somenteLeitura
        ? 'Informações do empréstimo'
        : usuarios
            ? 'Emprestar livro'
            : livro
                ? 'Editar livro'
                : 'Cadastrar novo livro';

    const modal = criarModalForms(titulo, form, 'modalLivro');
    document.body.appendChild(modal);
    modal.showModal();
}


export async function abrirModalUsuario(
    onSubmit: (form: HTMLFormElement) => Promise<void>,
    usuario?: UsuarioResponse
): Promise<void> {

    const form = await formularioUsuario(onSubmit, usuario);


    const titulo = usuario
        ? 'editar usuario'
        : 'cadastrar novo usuario';

    const modal = criarModalForms(titulo, form, 'modalUsuario');
    document.body.appendChild(modal);
    modal.showModal();
}

export function fecharModal(modal: string): void {
    console.log(`Fechando modal: ${modal}`);
    const modalContainer = document.querySelector("#" + modal) as HTMLDialogElement;
    if (modalContainer) {
        modalContainer.close();
    }
}

export function mostrarMensagem(tipo: 'sucesso' | 'erro', mensagem: string, idModal: 'modalLivro' | 'modalUsuario' | 'modalConfirmar'): void {
    const modalBody = document.querySelector('.modal-form') as HTMLDivElement || document.querySelector("#confirmar") as HTMLDivElement;
    if (!modalBody) return;
    modalBody.hidden = true;
    const sectionMsg = document.querySelector('#mensagem') as HTMLDivElement;
    if (!sectionMsg) return;
    sectionMsg.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';
    sectionMsg.innerHTML = `
        <p id="mensagem-conteudo">${mensagem}</p>
    `;
    setTimeout(() => {
        console.log(`Fechando modal`);
        const modalContainer = document.querySelector(`#${idModal}`) as HTMLDialogElement;
        if (modalContainer) {
            modalContainer.classList.remove('modal');
            modalContainer.close();
            modalContainer.remove();
        }
    }, 5000);

}

export function modalConfirmar(
    onConfirm: () => Promise<void> | void
): void {
    const container = document.createElement('dialog');
    container.classList.add('modal');
    container.id = 'modalConfirmar';

    container.innerHTML = `
    <main class="modal-conteudo">
        <header class="modal-header">
            <h2>excluir</h2>
            <button class="fechar-modal">X</button>
        </header>
        <section id="confirmar">
            <p>Deseja realmente excluir?</p>
            <button id="btn-confirmar">Confirmar</button>
            <button id="btn-cancelar">Cancelar</button>
        </section>
        <section id="mensagem"></section>
    </main>
    `;

    container.querySelector('#btn-confirmar')?.addEventListener('click', async () => {
        await onConfirm();
        //container.remove();
    });
    container.querySelector('#btn-cancelar')?.addEventListener('click', () => {
        container.remove();
    });
    container.querySelector('.fechar-modal')?.addEventListener('click', () => {
        container.remove();
    });

    document.body.appendChild(container);
    container.showModal();
}

