# Sistema de Ocorrência — MySQL + Docker + Nginx

Abrir o projeto no VS Code:

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

> Observação: esse login do site é diferente do usuário do banco MySQL.

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

Consultar usuários:

```sql
SELECT * FROM users;
```

Consultar ocorrências:

```sql
SELECT * FROM reports;
```

Consultar ocorrências mais recentes:

```sql
SELECT * FROM reports ORDER BY criado_em DESC;
```

Consultar anexos/imagens:

```sql
SELECT * FROM report_attachments ORDER BY criado_em DESC;
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

Tudo que for alterado no MySQL Workbench usando essa conexão será refletido no site, porque é o mesmo banco usado pelo Docker.

---

## 7. Onde as imagens são salvas

As imagens enviadas nas ocorrências ficam em:

```text
backend/uploads
```

Dentro do container backend, essa pasta fica em:

```text
/app/uploads
```

No navegador, os arquivos podem ser acessados por:

```text
http://localhost:8080/uploads/nome-do-arquivo
```

O banco guarda apenas o caminho da imagem na tabela:

```text
report_attachments
```

---

## 8. Expor o site com ngrok

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

O link público vai aparecer assim:

```text
Forwarding  https://algum-link.ngrok-free.dev -> http://localhost:8080
```

Use o link `https://...ngrok-free.dev` para acessar o sistema pela internet.

Não use ngrok nas portas:

```text
8081 → Adminer
3307 → MySQL
3000 → Backend direto
```

Use somente:

```text
8080 → site com Nginx
```

Para parar o ngrok:

```bash
CTRL + C
```

---

## 9. Aviso do ngrok

No plano gratuito, o ngrok pode mostrar uma tela de aviso antes de abrir o site.

Isso é normal no plano free.

Para remover esse aviso de forma oficial, é necessário usar uma conta paga do ngrok.

---

## 10. Limpar arquivos Zone.Identifier

Listar arquivos:

```bash
find . -name '*:Zone.Identifier' -type f -print
```

Apagar arquivos:

```bash
find . -name '*:Zone.Identifier' -type f -delete
```

---

## 11. Git

Verificar alterações:

```bash
git status
```

Adicionar arquivos:

```bash
git add .
```

Criar commit:

```bash
git commit -m "Ajustes finais do projeto"
```

Enviar para o GitHub:

```bash
git push origin main
```

Puxar alterações do GitHub usando rebase:

```bash
git pull --rebase origin main
```

Configurar rebase como padrão:

```bash
git config pull.rebase true
```

---

## 12. Estrutura principal do projeto

```text
Sistema-de-ocorrencias-VidEita/
│
├── backend/
│   ├── uploads/
│   ├── src/
│   └── .env.docker
│
├── frontend/
│   └── src/
│
├── database/
│   └── init/
│
├── docker/
│   ├── backend/
│   └── nginx/
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 13. Resumo dos acessos

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

## 14. Credenciais principais

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