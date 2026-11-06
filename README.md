# Security Associates — Proposta ROI (HTML interativo)

Proposta comercial **Factorial-first** (para leitura do cliente):

- Identidade **Factorial** (Radical Red `#FF355D` + neutros); logo SA só como detalhe na nav
- Tom: dores da call → capacidades Factorial (Feature Map) → benefício / impacto
- Sem brochure dos serviços da SA — só o espectro da negociação (docs, time, training, performance)
- **Calculadora ROI** ao vivo · **USD 2.000/mês** · toggle **Black Friday −30%** (USD 1.400/mês)

Tecnologia: **Node.js + React + TypeScript** (Vite). Site estático → **GitHub Pages**.

Estudo em texto: [`../ROI_STUDY.md`](../ROI_STUDY.md)

---

## O que precisas no computador (uma vez)

1. Instalar **Node.js** (versão 20 ou superior): https://nodejs.org  
   - Escolhe a versão **LTS**.  
   - No instalador, deixa marcada a opção que adiciona Node ao PATH.
2. Reinicia o terminal (PowerShell ou Cursor Terminal) depois de instalar.
3. Confirma que funciona:

```powershell
node -v
npm -v
```

Se aparecerem números de versão, está OK.

---

## Passo a passo — ver no teu PC

Abre o terminal **nesta pasta** (`roi-proposta`):

```powershell
cd "c:\Users\victo\Documents\Projetos Random\Ultimate_Collector_Limpo\clients\security-associates-bermuda\roi-proposta"
```

### 1) Instalar dependências (só a primeira vez, ou depois de mudar o package.json)

```powershell
npm install
```

### 2) Arrancar o site em modo edição

```powershell
npm run dev
```

### 3) Abrir no browser

O terminal mostra um endereço, normalmente:

`http://localhost:5180`

Abre esse link. A calculadora atualiza quando mexes nos sliders ou no toggle Black Friday.

Para parar: no terminal, `Ctrl + C`.

### 4) (Opcional) Gerar a versão final e pré-visualizar

```powershell
npm run build
npm run preview
```

Isto cria a pasta `dist/` — é o que sobe para o GitHub Pages.

---

## Site online (GitHub Pages)

Repositório: [VictorHGutierrez-cloud/securityassociatesbermuda](https://github.com/VictorHGutierrez-cloud/securityassociatesbermuda)

**URL do site:**  
https://victorhgutierrez-cloud.github.io/securityassociatesbermuda/

Como funciona:
1. Fazes push para a branch `main`
2. O workflow **Deploy to GitHub Pages** faz `npm run build` e publica a pasta `dist` na branch `gh-pages`
3. O GitHub Pages serve a branch `gh-pages`

### Build local com o mesmo base path do Pages

```powershell
$env:VITE_BASE="/securityassociatesbermuda/"
npm run build
```

---

## PDF para o CFO

1. Abre a proposta no browser.  
2. `Ctrl + P` → destino **Save as PDF**.  
3. Antes de imprimir, liga/desliga Black Friday e ajusta os sliders para o cenário que queres mostrar.

---

## Estrutura dos ficheiros

| Ficheiro / pasta | Função |
|------------------|--------|
| `src/App.tsx` | Página completa da proposta |
| `src/components/RoiCalculator.tsx` | Calculadora interativa |
| `src/data/roiAssumptions.ts` | Dores, stack, preço, hipóteses |
| `src/lib/roiMath.ts` | Fórmulas ROI / payback |
| `src/styles.css` | Visual |
| `dist/` | Build para hospedar (gerado) |

---

## Termos rápidos

| Termo | Significado |
|-------|-------------|
| **Node.js** | Programa que corre JavaScript no PC (preciso para `npm`) |
| **npm** | Instalador de bibliotecas do projeto |
| **Vite** | Ferramenta que “monta” o site React |
| **React** | Biblioteca para a página interativa |
| **ROI** | Return on Investment — retorno do investimento |
| **Payback** | Em quantos meses o benefício cobre o custo anual |
| **GitHub Pages** | Hospedagem gratuita de sites estáticos no GitHub |
| **Black Friday −30%** | Desconto: $2.000 → $1.400 / mês |
