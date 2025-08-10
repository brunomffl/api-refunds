# 💰 API de Reembolso

API REST para gerenciamento de solicitações de reembolso com autenticação JWT e controle de permissões por roles.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação via tokens
- **Zod** - Validação de schemas
- **Bcrypt** - Hash de senhas
- **Multer** - Upload de arquivos

## 📋 Funcionalidades

### 🔐 Autenticação
- ✅ Cadastro de usuários (employee/manager)
- ✅ Login com JWT
- ✅ Middleware de autenticação
- ✅ Controle de permissões por roles

### 💸 Reembolsos
- ✅ Criar solicitação de reembolso
- ✅ Listar reembolsos
- ✅ Filtrar por nome do usuário
- ✅ Upload de comprovantes

### 📁 Upload de Arquivos
- ✅ Upload de comprovantes
- ✅ Validação de tipo e tamanho
- ✅ Armazenamento local

## 🛠️ Como rodar

### Pré-requisitos
- Node.js (versão 16+)
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/brunomffl/api-refunds.git
cd api-refunds

# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Executar migrations
npx prisma migrate dev

# Iniciar servidor
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Endpoints

### 🔓 Rotas Públicas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/users` | Cadastrar usuário |
| POST | `/sessions` | Login |

### 🔐 Rotas Privadas

| Método | Endpoint | Descrição | Permissão |
|--------|----------|-----------|-----------|
| POST | `/refunds` | Criar reembolso | Autenticado |
| GET | `/refunds` | Listar reembolsos | Autenticado |
| POST | `/uploads` | Upload de arquivo | Autenticado |

## 📋 Schemas

### Cadastro de Usuário
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "role": "employee" // ou "manager"
}
```

### Login
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Criar Reembolso
```json
{
  "name": "Almoço de negócios",
  "category": "food", // food, transport, accommodation, services, other
  "amount": 50.00,
  "filename": "comprovante.pdf"
}
```

## 🔑 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após o login, inclua o token no header das requisições:

```
Authorization: Bearer {seu_token_jwt}
```

## 👥 Roles

- **employee**: Usuário padrão
- **manager**: Usuário com permissões administrativas

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações (auth, upload)
├── controllers/     # Controllers das rotas
├── middlewares/     # Middlewares de autenticação e erro
├── routes/          # Definição das rotas
├── utils/           # Utilitários (AppError)
├── types/           # Tipos TypeScript
├── database/        # Configuração do Prisma
└── app.ts           # Configuração do Express
```

## 🗄️ Banco de Dados

O projeto utiliza SQLite com Prisma ORM. O schema inclui:

- **users**: Usuários do sistema
- **refunds**: Solicitações de reembolso

## 📝 Scripts

```bash
npm run dev    # Executar em modo desenvolvimento
npm run build  # Build para produção
```

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Validação de dados com Zod
- ✅ Controle de CORS
- ✅ Middleware de tratamento de erros
- ✅ Validação de tipos de arquivo no upload

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Bruno Cardoso** - [GitHub](https://github.com/brunomffl)
