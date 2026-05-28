# Sistema de Ocorrência — MySQL + Docker + Nginx

```bash
code Sistema-de-ocorrencias-VidEita
```
---


## 1. Rodar tudo de uma vez

Dentro da pasta do projeto:

```bash
docker compose up --build -d
```

A primeira vez pode demorar, porque o Docker vai baixar as imagens e instalar as dependências.

---

## 2. Verificar se subiu

```bash
docker compose ps
```

Você deve ver serviços parecidos com:

```text
mysql     Up
backend   Up
nginx     Up
adminer   Up
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


## Login do sistema

```text
E-mail: admin@prefeitura.gov.br
Senha: 123456
```

> Observação: esse login do site é diferente do usuário do banco MySQL.

---

## 4. Comandos úteis

Ver logs de tudo:

```bash
docker compose logs -f
```

Ver logs só do backend:

```bash
docker compose logs -f backend
```

Entrar no MySQL pelo terminal:

```bash
docker compose exec mysql mysql -uadmin -padmin123 base_projeto_integrador
```

Ver tabelas:

```sql
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM reports;
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
## 5. Portas usadas

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
find . -name '*:Zone.Identifier' -type f -print
find . -name '*:Zone.Identifier' -type f -delete