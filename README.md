# Igor Fala de Música — Administração

Painel administrativo do projeto **Igor Fala de Música**, desenvolvido com Vue 3 e Vite. Ele permite o gerenciamento de conteúdo, categorias, autores e tags por meio de autenticação com Google e integração com Supabase.

## Funcionalidades

- Login com Google via Supabase Auth
- Proteção das rotas administrativas por sessão e lista de usuários autorizados
- Visualização dos posts cadastrados
- Criação e edição de posts
- Gerenciamento de categorias e tags
- Gestão de autores
- Upload e associação de imagens
- Atualização do perfil administrativo
- Interface responsiva

## Tecnologias

- [Vue 3](https://vuejs.org/) — framework principal
- [Vue Router](https://router.vuejs.org/) — gerenciamento de rotas
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Vite](https://vite.dev/) — servidor e empacotador
- [Supabase](https://supabase.com/) — autenticação, banco de dados e armazenamento
- [SCSS](https://sass-lang.com/) — estilos
- [SweetAlert2](https://sweetalert2.github.io/) — alertas e confirmações
- [UUID](https://github.com/uuidjs/uuid) — geração de identificadores

## Pré-requisitos

- Node.js 22 ou superior
- Yarn ou npm
- Projeto configurado no Supabase
- Provedor OAuth Google habilitado no Supabase

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/feliphepaz/igor-fala-de-musica-admin.git
cd igor-fala-de-musica-admin
yarn install
```

Com npm:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_KEY=SUA_CHAVE_ANON_PUBLICA
VITE_REDIRECT_URL=http://localhost:5173
VITE_ALLOWED_IDS=ID_DO_USUARIO_SUPABASE,OUTRO_ID_AUTORIZADO
```

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_KEY` | Chave pública/anônima do Supabase |
| `VITE_REDIRECT_URL` | URL base usada no redirecionamento após o login |
| `VITE_ALLOWED_IDS` | IDs dos usuários Supabase autorizados a acessar `/dashboard` |

> Em produção, configure essas variáveis no provedor de hospedagem, como a Vercel.

## Executando localmente

Com Yarn:

```bash
yarn dev
```

Com npm:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` por padrão.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa a verificação de tipos e gera o build de produção |
| `npm run build-only` | Gera o build de produção sem verificação de tipos |
| `npm run type-check` | Executa a verificação de tipos com `vue-tsc` |
| `npm run preview` | Serve localmente o build gerado |

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Página inicial e login |
| `/dashboard/posts` | Listagem de posts |
| `/dashboard/posts/novo-post` | Criação de um novo post |
| `/dashboard/posts/:id` | Edição de um post |
| `/dashboard/perfil` | Perfil administrativo |

As rotas iniciadas por `/dashboard` exigem uma sessão ativa e validam o ID do usuário em `VITE_ALLOWED_IDS`.

## Estrutura do projeto

```text
src/
├── assets/        # Recursos estáticos usados pela aplicação
├── components/    # Componentes Vue reutilizáveis
├── composables/   # Operações de autenticação e acesso aos dados
├── lib/           # Configuração do cliente Supabase
├── router/        # Configuração das rotas e proteção de acesso
├── types/         # Tipos e interfaces TypeScript
├── utils/         # Funções utilitárias
├── views/         # Páginas da aplicação
│   ├── Home.vue
│   └── dashboard/
├── App.vue        # Componente raiz
└── main.ts        # Ponto de entrada da aplicação
```

## Build de produção

Execute:

```bash
yarn build
```

Os arquivos de produção são gerados no diretório `dist/` e podem ser publicados em plataformas compatíveis com aplicações Vue/Vite.

## Deploy na Vercel

O projeto já possui configurações para Vercel. Para configurar um novo deploy:

1. Importe o repositório na Vercel.
2. Defina o framework como **Vite**.
3. Configure todas as variáveis `VITE_*` no painel da Vercel.
4. Ative o redirecionamento de autenticação do Google no Supabase para a URL do painel.
5. Mantenha o fallback de SPA configurado para que as rotas do Vue Router funcionem corretamente.

## Licença

Este projeto não possui uma licença definida no repositório.
