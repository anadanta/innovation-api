# Innovation API

## Descrição
Esta é uma API de gerenciamento de workspaces desenvolvida em Node.js. Ela oferece funcionalidades para autenticação de usuários e um sistema de controle de acesso baseado em cargos e permissões. Esta API é ideal para gerenciar espaços de trabalho com diferentes níveis de acesso e funcionalidades.

## Funcionalidades
- Autenticação de Usuários
- Gerenciamento de Workspaces
- Controle de Acesso com Cargos e Permissões

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT para autenticação

## Como Configurar e Executar

### Pré-requisitos
- Node.js
- npm
- PostgreSQL (Banco de dados)

### Instalação
```bash
# Clonar o repositório
git clone https://github.com/victorgriggi0/innovation-api.git

# Navegar até a pasta do projeto
cd innovation-api

# Instalar as dependências
npm install
```

### Configuração do Ambiente
Antes de iniciar a aplicação, é necessário configurar a conexão com o banco de dados PostgreSQL. Isso é feito ajustando o arquivo `config.json` localizado no diretório `/api/config`.

    O arquivo `config.json` já está pré-configurado com as credenciais padrão para os ambientes de desenvolvimento, teste e produção. Altere as configurações de acordo com o seu ambiente de banco de dados local.

### Configuração do Banco de Dados
```bash
# Criar o banco de dados
npx sequelize db:create

# Executar as migrações
npx sequelize db:migrate
```

### Executando a aplicação
```bash
# Iniciar o servidor na porta 4000
npm start
```

## Documentação da API
A documentação completa das rotas e endpoints da API está disponível diretamente no código-fonte, dentro do diretório `routes`. Lá você encontrará detalhes sobre todos os endpoints, incluindo métodos HTTP, parâmetros de requisição e respostas esperadas.