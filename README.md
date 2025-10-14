# Projeto Frontend do Gerenciador de Biblioteca

Este é um projeto frontend desenvolvido com [Vite](https://vitejs.dev/), utilizando TypeScript, HTML e CSS puro. O projeto está estruturado de forma modular, com componentes reutilizáveis para formulários, tabelas e botões.

## Tecnologias Utilizadas

- [Vite](https://vitejs.dev/) — Bundler leve e rápido
- [TypeScript](https://www.typescriptlang.org/)
- HTML Semântico
- CSS3

## Estrutura de Pastas

```
src/
│
├── components/        # Componentes reutilizáveis (formulários, tabelas, etc)
├── controllers/       # Controladores com a lógica de negócio
├── models/            # Modelos de dados 
├── services/          # Serviços responsáveis por chamadas HTTP
├── ui/                # Código para montagem da interface
├── main.ts            # Arquivo principal que inicializa o app
├── style.css          # Estilos globais
└── index.html         # HTML principal
```

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/sanchesvini/gerenciador-biblioteca-frontend
cd gerenciador-biblioteca-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto localmente

```bash
npm run dev
```

O Vite abrirá automaticamente no navegador, geralmente em [http://localhost:5173](http://localhost:5173).

## Integração com Backend

Este frontend consome uma API em `http://localhost:8080/api`.
O repositório da API encontra-se em: [gerenciador-emprestimos-api](https://github.com/sanchesvini/gerenciador-emprestimos-api).
Certifique-se de que o backend esteja rodando corretamente e com **CORS habilitado** para permitir o acesso do frontend.

**Exemplo de configuração CORS em Java (Spring Boot):**

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return registry -> registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("*");
    }
}
```

