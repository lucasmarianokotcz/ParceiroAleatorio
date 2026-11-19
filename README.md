# Parceiro Aleatório

Gerador de perfis de parceiro aleatório em **pt-BR**, construído com **React**, **TypeScript**, **Vite**, **Bun**, **Tailwind CSS v4**, **shadcn/ui** (tema `neutral`) e **Motion**.

## Características sorteadas

- **Sexo**: `Masculino` | `Feminino`
- **Idade**: `14` a `99` anos
- **Altura**: `100` a `300` cm
- **Peso**: `40` a `400` kg
- **Profissão**: lista de 56 profissões com flexão gramatical concordante com o sexo sorteado (ex.: *Pintor* / *Pintora*)

## Recursos da interface

- Tema **shadcn/ui Neutral** com alternância entre modo claro e escuro
- Animações fluídas com **Motion** (respeitando `prefers-reduced-motion`)
- Atalho de teclado `Espaço` para sortear rapidamente
- Botão para copiar o resumo do perfil para a área de transferência

## Comandos

```powershell
# Instalar dependências
bun install

# Rodar servidor de desenvolvimento
bun run dev

# Executar testes unitários
bun test

# Verificar lint
bun run lint

# Gerar build de produção
bun run build
```
