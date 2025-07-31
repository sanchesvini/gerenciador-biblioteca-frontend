import './botao-cadastrar.css';
export function botaoCadastrar(texto: string, aoClicar: () => void): HTMLElement {
    const botao = document.createElement('button');
    botao.textContent = texto;
    botao.id = 'botao-cadastrar';
    botao.addEventListener('click', aoClicar);
    return botao;
}
