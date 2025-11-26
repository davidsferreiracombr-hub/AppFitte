# Fit Sweet Delights

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## Como Fazer o Deploy na Netlify (via GitHub)

Siga estes passos no terminal do seu computador para enviar seu código para o GitHub e fazer o deploy na Netlify.

### Pré-requisitos:
- Você precisa ter o Git instalado no seu computador.
- Você já deve ter criado um repositório vazio no GitHub.

### Passo a Passo no seu Terminal:

**Passo 1: Inicie o Git no seu projeto**
Se você ainda não iniciou, navegue até a pasta do seu projeto e rode:
```sh
git init -b main
```

**Passo 2: Adicione todos os arquivos do projeto**
```sh
git add .
```

**Passo 3: Faça o primeiro "commit" (salve a primeira versão do seu código)**
```sh
git commit -m "Primeiro commit do projeto"
```

**Passo 4: Conecte seu projeto local ao repositório do GitHub**
Copie a URL do seu repositório no GitHub (ela parece com `https://github.com/seu-usuario/AppFitte.git`) e rode o comando abaixo, substituindo a URL pela sua:

```sh
git remote add origin https://github.com/seu-usuario/AppFitte.git
```

**Passo 5: Envie seu código para o GitHub**
Este é o comando que envia todos os arquivos para o repositório online.
```sh
git push -u origin main
```

**Passo 6: Volte para a Netlify**
Após executar os comandos acima, seu código estará no GitHub. Volte para a página da Netlify onde você parou, **atualize a página (F5)**, e a branch `main` aparecerá na opção "Branch to deploy".

O restante das configurações a Netlify deve detectar automaticamente graças ao arquivo `netlify.toml` que adicionei.
- **Build command:** `next build`
- **Publish directory:** `.next`

Clique em "Deploy site" e pronto!
