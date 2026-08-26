## Saviz Studio — Fase 1 (Landing + Pricing)

Loja do plugin de retoque para Photoshop. Frontend apenas, sem banco de dados e sem login real. Fases seguintes (auth, checkout, dashboard, admin) ficam para depois.

### Design system (da spec)
- Tema escuro fixo: fundos `#0D0D0D` / `#1A1A1A` / `#252525`, superfícies `#2D2D2D`, borda `#333`.
- Acentos amarelo pastel: `#F5E6AB` (principal), `#E8D590` (CTA), `#DBC97D` (hover), gradiente 135° para botões.
- Texto: branco / `#B8B8B8` / `#666`. Estados: success `#8BC34A`, error `#E57373`, warning `#FFB74D`.
- Fontes Inter (700/600/400) e JetBrains Mono, carregadas via `<link>` no root.
- Container 1280px, seções 96px desktop / 48px mobile, transições 200ms, hover lift + glow nos botões.
- Tudo definido como tokens semânticos no CSS global (convertidos para oklch) — nenhuma cor hardcoded nos componentes.

### Páginas
**`/` — Landing**
1. Navbar fixa com logo, links (Preços, Docs, Login, Começar) e menu hamburguer no mobile.
2. Hero: título, subtítulo, dois CTAs, selo "Compatível com Photoshop CC 2024+", screenshot do plugin.
3. Grid de 6 features: Texture, Frequency Separation, Dodge & Burn, Quick Select, Color Correction, Details & Skin.
4. Demo: carrossel de screenshots + área de vídeo/tutorial.
5. Depoimentos: 3 cards.
6. Pricing resumido: card único R$ 97,00 com benefícios e CTA.
7. FAQ em accordion (4 perguntas).
8. Footer com links de Termos, Privacidade e Contato.

**`/pricing` — Preços**
- Cabeçalho "Preços Simples, Sem Surpresas", card de plano detalhado (8 itens), FAQ e footer.

Links de Login/Começar/Comprar apontam para rotas ainda não construídas — nesta fase eles levam para `/pricing` ou mostram um aviso de "em breve", sem páginas quebradas.

### Componentes base
Botões (primary/secondary/ghost), cards (feature, pricing), accordion, carrossel, navbar responsiva, footer — reutilizáveis para as próximas fases.

### Imagens
Gero por IA como placeholders: mockup da interface do plugin em painel do Photoshop, 3 screenshots para o carrossel, capa de vídeo e avatares dos depoimentos. Fáceis de trocar pelas reais depois.

### Detalhes técnicos
- Rotas TanStack: reescrevo `src/routes/index.tsx` e crio `src/routes/pricing.tsx`, cada uma com `head()` próprio (título, descrição, og/twitter) em português.
- Tokens no `src/styles.css` em oklch; componentes em `src/components/` (Navbar, Footer, Hero, Features, Demo, Testimonials, PricingCard, FAQ).
- Imagens geradas em `src/assets/`, com `loading="eager"`.
- Sem backend, sem dependências novas além de ícones Lucide (já disponível).
