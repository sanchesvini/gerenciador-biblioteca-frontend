import { LivroController } from "../../controllers/LivroController";
import { UsuarioController } from "../../controllers/UsuarioController";
import { LivroService } from "../../services/LivroService";
import { carregarLivros } from "../../ui/LivroUI";
import { carregarUsuarios } from "../../ui/UsuarioUI";
import { botaoCadastrar } from "../botao-cadastrar/BotaoCadastrar";
import { abrirModalLivro, abrirModalUsuario } from "../modal/Modal";
import './menu.css';

export function menu(): HTMLElement {
    const header = document.createElement('header');
    header.classList.add('header-menu');

    header.innerHTML = `
        <h1 class="logo">Biblioteca</h1>
        <nav class="nav-menu">
            <button id="btn-livros">Livros</button>
            <button id="btn-usuarios">Usuários</button>
        </nav>
      
  `;

    const btnLivros = header.querySelector('#btn-livros') as HTMLButtonElement;
    const btnUsuarios = header.querySelector('#btn-usuarios') as HTMLButtonElement;
    btnLivros.classList.add('selected');

    if (btnLivros.classList.contains('selected')) {
        carregarLivros();
        const areaAcoes = document.getElementById('area-acoes');
        if (areaAcoes) {
            areaAcoes.innerHTML = '';
            areaAcoes.appendChild(botaoCadastrar("cadastrar livro", () =>
                abrirModalLivro(async (form) => {
                    await LivroController.cadastrarLivro(form);
                    carregarLivros();
                })
            ));
        }
    }

    btnLivros.addEventListener('click', () => {
        btnLivros.classList.add('selected');
        btnUsuarios.classList.remove('selected');
        const areaAcoes = document.getElementById('area-acoes');
        if (areaAcoes) {
            areaAcoes.innerHTML = '';
            areaAcoes.appendChild(botaoCadastrar("cadastrar livro", () =>
                abrirModalLivro(async (form) => {
                    await LivroController.cadastrarLivro(form);
                    carregarLivros();
                })
            ));

        }
    });

    btnUsuarios.addEventListener('click', () => {
        carregarUsuarios();
        btnUsuarios.classList.add('selected');
        btnLivros.classList.remove('selected');
        const areaAcoes = document.getElementById('area-acoes');
        if (areaAcoes) {
            areaAcoes.innerHTML = '';
            areaAcoes.appendChild(botaoCadastrar("cadastrar usuário", () =>
                abrirModalUsuario(async (form) => {
                    await UsuarioController.cadastrarUsuario(form);
                    carregarUsuarios();
                })
            ));
        }

        carregarUsuarios();
    });

    return header;
}
