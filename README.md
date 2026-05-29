# Sistema de Ocorrência — MySQL + Docker + Nginx

## 1. Rodar tudo de uma vez

Dentro da pasta do projeto:

```bash
docker compose up --build -d
```

---

## 2. Verificar se subiu

```bash
docker compose ps
```

Para refazer o build:

```bash
docker compose up --build -d
```

Para recriar os containers:

```bash
docker compose up --build --force-recreate -d
```

---

## 3. Acessar o sistema

Site principal:

```text
http://localhost:8080
```

API direta:

```text
http://localhost:3000
```

Adminer, para ver o banco:

```text
http://localhost:8081
```

Dados para entrar no Adminer:

```text
Sistema: MySQL
Servidor: mysql
Usuário: admin
Senha: admin123
Banco de dados: base_projeto_integrador
```

---

## 4. Login do sistema

```text
E-mail: admin@prefeitura.gov.br
Senha: 123456
```

---

## 5. Comandos úteis

Ver logs de tudo:

```bash
docker compose logs -f
```

Ver logs só do backend:

```bash
docker compose logs -f backend
```

Ver logs só do MySQL:

```bash
docker compose logs -f mysql
```

Ver logs só do Nginx:

```bash
docker compose logs -f nginx
```

Entrar no MySQL pelo terminal:

```bash
docker compose exec mysql mysql -uadmin -padmin123 base_projeto_integrador
```

Ver tabelas:

```sql
SHOW TABLES;
```

Parar o projeto:

```bash
docker compose down
```

Parar e apagar o banco para recriar do zero:

```bash
docker compose down -v
docker compose up --build -d
```

Use `down -v` apenas quando quiser resetar o banco, porque ele apaga o volume do MySQL.

---

## 6. Portas usadas

```text
8080 → site com Nginx
3000 → API Node/Express
3307 → MySQL no notebook, evitando conflito com MySQL local na porta 3306
8081 → Adminer
```

Dentro do Docker, o backend fala com o MySQL usando:

```text
mysql:3306
```

Fora do Docker, se você conectar pelo MySQL Workbench, use:

```text
Host: localhost
Porta: 3307
Usuário: admin
Senha: admin123
Banco: base_projeto_integrador
```

---

## 7. Expor o site com ngrok

Antes de abrir o ngrok, suba o projeto:

```bash
docker compose up --build -d
```

Verifique se o site está abrindo localmente:

```text
http://localhost:8080
```

Instalar o ngrok no WSL/Ubuntu:

```bash
curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok
```

Verificar instalação:

```bash
ngrok version
```

Adicionar token da conta ngrok:

```bash
ngrok config add-authtoken SEU_TOKEN_AQUI
```

Abrir o site online:

```bash
ngrok http 8080
```

---

## 8. Aviso do ngrok

No plano gratuito, o ngrok pode mostrar uma tela de aviso antes de abrir o site.

Isso é normal no plano free.

Para remover esse aviso de forma oficial, é necessário usar uma conta paga do ngrok.

---

## 9. Resumo dos acessos

```text
Site:
http://localhost:8080

API:
http://localhost:3000

Adminer:
http://localhost:8081

MySQL Workbench:
localhost:3307
```

---

## 10. Credenciais principais

Banco MySQL:

```text
Usuário: admin
Senha: admin123
Banco: base_projeto_integrador
```

Sistema:

```text
E-mail: admin@prefeitura.gov.br
Senha: 123456
```