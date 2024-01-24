# Desafio Backend Be
Este projeto consiste em uma API RESTful feita em Node.js com Adonisjs, conectada à um banco MySQL onde é possível executar várias consultas e comandos relacionadas à um sistema de gerenciamento de produtos, clientes e vendas.

## Como executar a aplicação

Você pode executar a aplicação utilizando uma das seguintes abordagens:

### Com Docker Compose (recomendado)

1. Primeiramente certifique-se de ter instalado os programas `docker` e `docker compose` na sua máquina.

2. Após, execute o comando: `docker compose up --build .`

3. Feito isso sua aplicação estará rodando em localhost:3333.

> Dica: O arquivo `docker-compose.yml` já está configurado com as variáveis corretas presentes no arquivo `.env.docker`, então você não precisa se preocupar com isto.


### Sem Docker Compose

1. Primeiramente certifique-se de ter um banco de dados MySQL já rodando em sua máquina.

2. Você deve criar um arquivo `.env` e definir as variáveis de ambiente necessárias de acordo com o arquivo `.env.example`.

3. Execute a aplicação digitando o comando: `npm run dev`.

4. Feito isso sua aplicação estará rodando na em localhost na porta especificada nas variáveis de ambiente.

> Dica: Você pode copiar as variáveis definidas no arquvo `.env.example` modificando apenas aquelas relacionadas ao seu banco de dados MySQL.

<!-- ## Entidades

- Users
- Products
- Customers
- Sales -->