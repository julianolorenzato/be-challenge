# Desafio Backend Be
Este projeto consiste em uma API RESTful feita em Node.js com Adonisjs, conectada à um banco MySQL onde é possível executar várias consultas e comandos relacionadas à um sistema de gerenciamento de produtos, clientes e vendas.

## Requisitos para executar a aplicação

Para executar a aplicação é necessário ter UMA das seguintes instalações. 

- `docker` e `docker compose`
- `node` (versão 14 ou superior) e `mysql`


## Como executar a aplicação

Você pode executar a aplicação utilizando uma das seguintes abordagens:

### Com Docker Compose (recomendado)

1. Primeiramente certifique-se de ter instalado os programas `docker` e `docker compose` na sua máquina.

2. Após, execute o comando: `docker compose up --build`

3. Feito isso sua aplicação estará rodando em localhost:3333.

> Dica: O arquivo `docker-compose.yml` já está configurado com as variáveis corretas presentes no arquivo `.env.docker`, então você não precisa se preocupar com isto.


### Sem Docker Compose

1. Primeiramente certifique-se de ter o `node` instalado e um banco de dados MySQL já rodando em sua máquina.

2. Você deve criar um arquivo `.env` e definir as variáveis de ambiente necessárias de acordo com o arquivo `.env.example`.

3. Execute a aplicação digitando o comando: `npm run dev`.

4. Feito isso sua aplicação estará rodando na em localhost na porta especificada nas variáveis de ambiente.

> Dica: Você pode copiar as variáveis definidas no arquvo `.env.example` modificando apenas aquelas relacionadas ao seu banco de dados MySQL.

## Rotas da aplicação

Após ter sua aplicação rodando em alguma porta da sua máquina você pode interagir com a aplicação utilizando as seguintes rotas via protocolo HTTP:

### Users

#### POST /signup

Esta rota cria um noto usuário.

##### Request body
```json
{
    "email": "admin@be.com",
    "password": "supersecret123",
    "passwordConfirmation": "supersecret123"
}
```

##### Response body
```json
{
	"email": "admin@be.com",
	"created_at": "2024-01-24T16:20:45.419+00:00",
	"updated_at": "2024-01-24T16:20:45.420+00:00",
	"id": 1
}
```

#### POST /login

Esta rota autentica credenciais válidas para um usuário e devolve um token de autenticação JWT para ser utilizado em futuras requisições.

> Obs: O token deve ser utilizado no header HTTP Authotization, no seguinte formato:
>> Authorization: Bearer <seu.token.aqui>

##### Request body
```json
{
	"email": "admin@be.com",
    "password": "supersecret123"
}
```

##### Response body
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDYxMTM0NTEsImV4cCI6MTcwNjE5OTg1MSwic3ViIjoiMiJ9.bquG1kalM4SFNkotYISufipwSUZifZJyRPiaHoGpQuE"
}
```

### Products

#### POST /products

Esta rota cria um novo produto.

##### Request body
```json
{
	"name": "Smartphone X",
	"description": "Memory 4GiB",
	"price": 3129.99,
	"quantityInStock": 344
}
```

##### Response body
```json
{
	"name": "Smartphone X",
	"description": "Memory 4GiB",
	"price": 3129.99,
	"quantity_in_stock": 344,
	"created_at": "2024-01-24T16:28:14.626+00:00",
	"updated_at": "2024-01-24T16:28:14.626+00:00",
	"id": 1
}
```

#### GET /products

Esta rota lista todos os produtos.

##### Response body
```json
[
	{
		"id": 1,
		"name": "Smartphone X",
		"description": "Memory 4GiB",
		"price": 3129.99,
		"quantity_in_stock": 344,
		"created_at": "2024-01-24T16:28:14.000+00:00",
		"updated_at": "2024-01-24T16:28:14.000+00:00"
	},
	{
		"id": 2,
		"name": "TV 8K",
		"description": "High quality resolution",
		"price": 5229.99,
		"quantity_in_stock": 86,
		"created_at": "2024-01-24T16:35:39.000+00:00",
		"updated_at": "2024-01-24T16:35:39.000+00:00"
	}
]
```

#### GET /products/:id

Esta rota mostra detalhes sobre um produto.

##### URL params
```json
{ "id": 1 }
```

##### Response body
```json
{
	"id": 1,
	"name": "Smartphone X",
	"description": "Memory 4GiB",
	"price": 3129.99,
	"quantity_in_stock": 344,
	"created_at": "2024-01-24T16:28:14.000+00:00",
	"updated_at": "2024-01-24T16:28:14.000+00:00"
}
```

#### PUT /products/:id

Esta rota atualiza informações sobre um produto.

##### URL params
```json
{ "id": 2 }
```

##### Request body
```json
{
	"name": "Smartphone XI"
}
```

##### Response body
```json
{
	"id": 2,
	"name": "Smartphone XI",
	"description": "Memory 4GiB",
	"price": 3129.99,
	"quantity_in_stock": 344,
	"created_at": "2024-01-24T16:28:14.000+00:00",
	"updated_at": "2024-01-24T16:38:54.456+00:00"
}
```