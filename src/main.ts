import { menu } from "./components/menu/Menu";



function carregarMenu() {
    const menuContainer = document.getElementById('menu');
    if (menuContainer) {
        menuContainer.appendChild(menu());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarMenu();

});