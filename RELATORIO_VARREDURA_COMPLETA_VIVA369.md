# RELATÓRIO DE VARREDURA COMPLETA — VIVA369

Data da varredura: 09/08/2026 06:38:33
Diretório analisado: /home/runner/workspace/artifacts/viva369

Esta varredura analisa código, rotas, imports, build, TypeScript e contratos Supabase.
Testes que exigem clicar na interface, usuário autenticado ou dados reais ficam marcados como pendentes.

## 1. ESTRUTURA DO PROJETO

### Arquivos principais encontrados
src/App.tsx
src/App.tsx.backup
src/App.tsx.bak
src/components/Anamnese.tsx
src/components/DegustacaoOverlay.tsx
src/components/DesafioDetalhes.tsx
src/components/MetasLider.tsx
src/components/ModalRegras.tsx
src/components/ProtectedRoute.tsx
src/components/QRCodeModal.tsx
src/components/Sidebar.tsx
src/components/Sidebar.tsx.bak.typecheck-viva369
src/components/SistemaPremiosGrupo.tsx
src/components/SistemaPremiosGrupo.tsx.bak.typecheck-viva369
src/components/SistemaPremios.tsx
src/components/SistemaPremios.tsx.bak-final-viva369
src/components/SistemaPremios.tsx.bak.typecheck-viva369
src/components/TermoConsentimento.tsx
src/components/ui/accordion.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/alert.tsx
src/components/ui/aspect-ratio.tsx
src/components/ui/avatar.tsx
src/components/ui/badge.tsx
src/components/ui/breadcrumb.tsx
src/components/ui/button-group.tsx
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/card.tsx
src/components/ui/carousel.tsx
src/components/ui/chart.tsx
src/components/ui/checkbox.tsx
src/components/ui/collapsible.tsx
src/components/ui/command.tsx
src/components/ui/context-menu.tsx
src/components/ui/dialog.tsx
src/components/ui/drawer.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/empty.tsx
src/components/ui/field.tsx
src/components/ui/form.tsx
src/components/ui/hover-card.tsx
src/components/ui/input-group.tsx
src/components/ui/input-otp.tsx
src/components/ui/input.tsx
src/components/ui/item.tsx
src/components/ui/kbd.tsx
src/components/ui/label.tsx
src/components/ui/menubar.tsx
src/components/ui/navigation-menu.tsx
src/components/ui/pagination.tsx
src/components/ui/popover.tsx
src/components/ui/progress.tsx
src/components/ui/radio-group.tsx
src/components/ui/resizable.tsx
src/components/ui/scroll-area.tsx
src/components/ui/select.tsx
src/components/ui/separator.tsx
src/components/ui/sheet.tsx
src/components/ui/sidebar.tsx
src/components/ui/skeleton.tsx
src/components/ui/slider.tsx
src/components/ui/sonner.tsx
src/components/ui/spinner.tsx
src/components/ui/switch.tsx
src/components/ui/table.tsx
src/components/ui/tabs.tsx
src/components/ui/textarea.tsx
src/components/ui/toaster.tsx
src/components/ui/toast.tsx
src/components/ui/toggle-group.tsx
src/components/ui/toggle.tsx
src/components/ui/tooltip.tsx
src/config/empresa.ts
src/contexts/AcessoContext.tsx
src/contexts/AcessoContext.tsx.backup-voucher-seguro
src/contexts/AuthContext.tsx
src/hooks/use-mobile.tsx
src/hooks/use-toast.ts
src/index.css
src/lib/pagamento.ts
src/lib/supabase.ts
src/lib/utils.ts
src/main.tsx
src/pages/AnamneseAdesaoPage.tsx
src/pages/AreaLiderPage.tsx
src/pages/AreaLiderPage.tsx.backup-pre-correcao
src/pages/AtividadeFisicaPage.tsx
src/pages/AtividadeFisicaPage.tsx.bak-final-viva369
src/pages/AtividadeFisicaPage.tsx.bak.typecheck-viva369
src/pages/AvaliacaoPublicaPage.tsx
src/pages/AvaliacaoPublicaPage.tsx.bak-final-viva369
src/pages/AvaliacaoPublicaPage.tsx.bak-historico-publico-viva369
src/pages/AvaliacaoPublicaPage.tsx.bak.typecheck-viva369
src/pages/AvaliadorBioPage.tsx
src/pages/BioimpedanciaPage.tsx
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id
src/pages/BioimpedanciaPage.tsx.bak-final-viva369
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369
src/pages/CadastroPage.tsx
src/pages/CadastroPage.tsx.backup-legado
src/pages/CalendarioPage.tsx
src/pages/CampanhasPage.tsx
src/pages/ChatPage.tsx
src/pages/ClientesPage.tsx
src/pages/ComunidadePage.tsx
src/pages/ComunidadePage.tsx.bak.viva369
src/pages/ConfiguracoesPage.tsx
src/pages/DashboardPage.tsx
src/pages/DashboardSaudePage.tsx
src/pages/DesafiarAmigosPage.tsx
src/pages/DesafiarAmigosPage.tsx.bak.typecheck-viva369
src/pages/DesafioCoresPage.tsx
src/pages/DesafioCoresPage.tsx.bak.viva369
src/pages/FinancasPage.tsx
src/pages/FinancasPage.tsx.backup-before-viva369-financeiro
src/pages/HistoricoComissoesPage.tsx
src/pages/IndicacoesPage.tsx
src/pages/IntegracoesPage.tsx
src/pages/LandingPage.tsx
src/pages/LimpezaHepaticaPage.tsx
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369
src/pages/LivesPage.tsx
src/pages/LoginPage.tsx
src/pages/MetaPage.tsx
src/pages/not-found.tsx
src/pages/NovaSenhaPage.tsx
src/pages/PaginaPublicaBio.tsx
src/pages/PdvPage.tsx
src/pages/PdvPage.tsx.bak.typecheck-viva369
src/pages/PdvPage.tsx.bak.viva369
src/pages/PerfilPage.tsx
src/pages/PremiacoesPage.tsx
src/pages/PremiacoesPage.tsx.backup-ranking-mock
src/pages/ReceitasPage.tsx
src/pages/RecuperarSenhaPage.tsx
src/pages/RedeSocialPage.tsx
src/pages/RegistrarPage.tsx
src/pages/RegistrarPage.tsx.backup-indicacao
src/pages/SegurancaPage.tsx
src/pages/TourAppPage.tsx
src/pages/TreinosPage.tsx
src/pages/UserDashboardPage.tsx
src/pages/VendasPage.tsx
src/pages/VendasVivaPlus.tsx
src/pages/VendasVivaPlus.tsx.bak
src/pages/VerificarAcessoPage.tsx
src/pages/VerificarAcessoPage.tsx.backup-before-ton-rpc
src/pages/VerificarAcessoPage.tsx.backup-pagamento-real-20260807
src/vite-env.d.ts

### Situação do Git
 M src/pages/BioimpedanciaPage.tsx
?? RELATORIO_VARREDURA_COMPLETA_VIVA369.md
?? src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id

## 2. PÁGINAS E ROTAS

### Arquivos de páginas
src/pages/AnamneseAdesaoPage.tsx
src/pages/AreaLiderPage.tsx
src/pages/AtividadeFisicaPage.tsx
src/pages/AvaliacaoPublicaPage.tsx
src/pages/AvaliadorBioPage.tsx
src/pages/BioimpedanciaPage.tsx
src/pages/CadastroPage.tsx
src/pages/CalendarioPage.tsx
src/pages/CampanhasPage.tsx
src/pages/ChatPage.tsx
src/pages/ClientesPage.tsx
src/pages/ComunidadePage.tsx
src/pages/ConfiguracoesPage.tsx
src/pages/DashboardPage.tsx
src/pages/DashboardSaudePage.tsx
src/pages/DesafiarAmigosPage.tsx
src/pages/DesafioCoresPage.tsx
src/pages/FinancasPage.tsx
src/pages/HistoricoComissoesPage.tsx
src/pages/IndicacoesPage.tsx
src/pages/IntegracoesPage.tsx
src/pages/LandingPage.tsx
src/pages/LimpezaHepaticaPage.tsx
src/pages/LivesPage.tsx
src/pages/LoginPage.tsx
src/pages/MetaPage.tsx
src/pages/NovaSenhaPage.tsx
src/pages/PdvPage.tsx
src/pages/PerfilPage.tsx
src/pages/PremiacoesPage.tsx
src/pages/ReceitasPage.tsx
src/pages/RecuperarSenhaPage.tsx
src/pages/RedeSocialPage.tsx
src/pages/RegistrarPage.tsx
src/pages/SegurancaPage.tsx
src/pages/TourAppPage.tsx
src/pages/TreinosPage.tsx
src/pages/UserDashboardPage.tsx
src/pages/VendasPage.tsx
src/pages/VerificarAcessoPage.tsx

### Rotas encontradas no código
src/App.tsx:50:    <Routes>
src/App.tsx:52:      <Route path="/" element={<VendasPage />} />
src/App.tsx:53:      <Route path="/login" element={<LoginPage />} />
src/App.tsx:54:      <Route path="/registrar" element={<RegistrarPage />} />
src/App.tsx:55:      <Route path="/cadastro" element={<CadastroPage />} />
src/App.tsx:56:      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
src/App.tsx:57:      <Route path="/nova-senha" element={<NovaSenhaPage />} />
src/App.tsx:58:      <Route path="/landing" element={<LandingPage />} />
src/App.tsx:59:<Route path="/publico/:id" element={<AvaliacaoPublicaPage />} />
src/App.tsx:60:<Route path="/anamnese-adesao" element={<AnamneseAdesaoPage />} />
src/App.tsx:61:<Route path="/desafiar-amigos" element={<ProtectedRoute><Sidebar><DesafiarAmigosPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:62:<Route path="/tour" element={<TourAppPage />} />
src/App.tsx:63:      <Route path="/verificar-acesso" element={<VerificarAcessoPage />} />
src/App.tsx:66:      <Route path="/dashboard" element={<ProtectedRoute><Sidebar><UserDashboardPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:67:      <Route path="/pdv" element={<ProtectedRoute><Sidebar><PdvPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:68:      <Route path="/clientes" element={<ProtectedRoute><Sidebar><ClientesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:69:      <Route path="/financas" element={<ProtectedRoute><Sidebar><FinancasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:70:      <Route path="/meta" element={<ProtectedRoute><Sidebar><MetaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:71:      <Route path="/calendario" element={<ProtectedRoute><Sidebar><CalendarioPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:72:      <Route path="/indicacoes" element={<ProtectedRoute><Sidebar><IndicacoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:73:      <Route path="/campanhas" element={<ProtectedRoute><Sidebar><CampanhasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:74:      <Route path="/saude" element={<ProtectedRoute><Sidebar><DashboardSaudePage /></Sidebar></ProtectedRoute>} />
src/App.tsx:75:      <Route path="/bioimpedancia" element={<ProtectedRoute><Sidebar><BioimpedanciaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:76:      <Route path="/rede-social" element={<ProtectedRoute><Sidebar><RedeSocialPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:77:      <Route path="/lives" element={<ProtectedRoute><Sidebar><LivesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:78:      <Route path="/premiacoes" element={<ProtectedRoute><Sidebar><PremiacoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:79:      <Route path="/area-lider" element={<ProtectedRoute><Sidebar><AreaLiderPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:80:      <Route path="/historico-comissoes" element={<ProtectedRoute><Sidebar><HistoricoComissoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:81:      <Route path="/perfil" element={<ProtectedRoute><Sidebar><PerfilPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:82:      <Route path="/seguranca" element={<ProtectedRoute><Sidebar><SegurancaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:83:      <Route path="/vendas-viva-plus" element={<ProtectedRoute><Sidebar><VendasVivaPlus /></Sidebar></ProtectedRoute>} />
src/App.tsx:84:      <Route path="/comunidade" element={<ProtectedRoute><Sidebar><ComunidadePage /></Sidebar></ProtectedRoute>} />
src/App.tsx:85:      <Route path="/chat" element={<ProtectedRoute><Sidebar><ChatPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:86:      <Route path="/treinos" element={<ProtectedRoute><Sidebar><TreinosPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:87:<Route path="/atividade-fisica" element={<ProtectedRoute><Sidebar><AtividadeFisicaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:88:      <Route path="/receitas" element={<ProtectedRoute><Sidebar><ReceitasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:89:      <Route path="/configuracoes" element={<ProtectedRoute><Sidebar><ConfiguracoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:90:      <Route path="/integracoes" element={<ProtectedRoute><Sidebar><IntegracoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:91:      <Route path="/desafio-cores" element={<ProtectedRoute><Sidebar><DesafioCoresPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:92:      <Route path="/limpeza-hepatica" element={<ProtectedRoute><Sidebar><LimpezaHepaticaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx:94:      <Route path="*" element={<Navigate to="/" replace />} />
src/lib/pagamento.ts:61:        redirect: `${window.location.origin}/verificar-acesso`
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:312:    const url = `${window.location.origin}/publico/${avaliacao.token_acesso || avaliacao.id}`;
src/pages/AvaliacaoPublicaPage.tsx.bak-historico-publico-viva369:143:            <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-amber-500 text-white" onClick={() => window.location.href = '/'}>
src/pages/AvaliacaoPublicaPage.tsx.bak-historico-publico-viva369:294:              <Link to={refId ? `/registrar?ref=${refId}` : '/registrar'}>
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:312:    const url = `${window.location.origin}/publico/${avaliacao.token_acesso || avaliacao.id}`;
src/App.tsx.backup:43:    <Routes>
src/App.tsx.backup:45:      <Route path="/" element={<VendasPage />} />
src/App.tsx.backup:46:      <Route path="/login" element={<LoginPage />} />
src/App.tsx.backup:47:      <Route path="/registrar" element={<RegistrarPage />} />
src/App.tsx.backup:48:      <Route path="/cadastro" element={<CadastroPage />} />
src/App.tsx.backup:49:      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
src/App.tsx.backup:50:      <Route path="/nova-senha" element={<NovaSenhaPage />} />
src/App.tsx.backup:51:      <Route path="/landing" element={<LandingPage />} />
src/App.tsx.backup:54:      <Route path="/dashboard" element={<ProtectedRoute><Sidebar><UserDashboardPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:55:      <Route path="/pdv" element={<ProtectedRoute><Sidebar><PdvPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:56:      <Route path="/clientes" element={<ProtectedRoute><Sidebar><ClientesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:57:      <Route path="/financas" element={<ProtectedRoute><Sidebar><FinancasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:58:      <Route path="/meta" element={<ProtectedRoute><Sidebar><MetaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:59:      <Route path="/calendario" element={<ProtectedRoute><Sidebar><CalendarioPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:60:      <Route path="/indicacoes" element={<ProtectedRoute><Sidebar><IndicacoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:61:      <Route path="/campanhas" element={<ProtectedRoute><Sidebar><CampanhasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:62:      <Route path="/saude" element={<ProtectedRoute><Sidebar><DashboardSaudePage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:63:      <Route path="/bioimpedancia" element={<ProtectedRoute><Sidebar><BioimpedanciaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:64:      <Route path="/rede-social" element={<ProtectedRoute><Sidebar><RedeSocialPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:65:      <Route path="/lives" element={<ProtectedRoute><Sidebar><LivesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:66:      <Route path="/premiacoes" element={<ProtectedRoute><Sidebar><PremiacoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:67:      <Route path="/area-lider" element={<ProtectedRoute><Sidebar><AreaLiderPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:68:      <Route path="/historico-comissoes" element={<ProtectedRoute><Sidebar><HistoricoComissoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:69:      <Route path="/perfil" element={<ProtectedRoute><Sidebar><PerfilPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:70:      <Route path="/seguranca" element={<ProtectedRoute><Sidebar><SegurancaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:71:      <Route path="/vendas-viva-plus" element={<ProtectedRoute><Sidebar><VendasVivaPlus /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:74:      <Route path="/comunidade" element={<ProtectedRoute><Sidebar><ComunidadePage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:75:      <Route path="/chat" element={<ProtectedRoute><Sidebar><ChatPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:76:      <Route path="/treinos" element={<ProtectedRoute><Sidebar><TreinosPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:77:      <Route path="/receitas" element={<ProtectedRoute><Sidebar><ReceitasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:78:      <Route path="/configuracoes" element={<ProtectedRoute><Sidebar><ConfiguracoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:79:      <Route path="/integracoes" element={<ProtectedRoute><Sidebar><IntegracoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:81:      <Route path="*" element={<Navigate to="/" replace />} />
src/App.tsx.backup:100:<Route path="/desafio-cores" element={<ProtectedRoute><Sidebar><DesafioCoresPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.backup:101:<Route path="/limpeza-hepatica" element={<ProtectedRoute><Sidebar><LimpezaHepaticaPage /></Sidebar></ProtectedRoute>} />
src/components/QRCodeModal.tsx:23:  const url = `${window.location.origin}/publico/${data?.id}?ref=${userId}`;
src/components/ProtectedRoute.tsx:37:    const paginaAtual = PAGINAS_DEGUSTACAO.find(p => p.path === location.pathname);
src/components/ProtectedRoute.tsx:53:    return <Navigate to="/login" state={{ from: location }} replace />;
src/components/ProtectedRoute.tsx:63:    const pagina = PAGINAS_DEGUSTACAO.find(p => p.path === location.pathname);
src/components/ProtectedRoute.tsx:76:  return <Navigate to="/verificar-acesso" replace />;
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:310:    const url = `${window.location.origin}/publico/${avaliacao.token_acesso || avaliacao.id}`;
src/components/ui/sidebar.tsx:85:      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
src/components/DegustacaoOverlay.tsx:143:            <Link to="/anamnese-adesao" className="w-full">
src/components/Sidebar.tsx:28:    navigate('/login');
src/components/Sidebar.tsx:109:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:145:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:181:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:217:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:253:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:289:                    <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:327:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:363:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx:403:          <Link to="/perfil">
src/pages/AvaliacaoPublicaPage.tsx.bak-final-viva369:143:            <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-amber-500 text-white" onClick={() => window.location.href = '/'}>
src/pages/AvaliacaoPublicaPage.tsx.bak-final-viva369:294:              <Link to={refId ? `/registrar?ref=${refId}` : '/registrar'}>
src/pages/RegistrarPage.tsx.backup-indicacao:103:      setTimeout(() => navigate('/login'), 3000);
src/pages/RegistrarPage.tsx.backup-indicacao:182:            <Link to="/login" className="text-emerald-400 hover:underline">
src/pages/VerificarAcessoPage.tsx:44:      setTimeout(() => navigate('/dashboard'), 2000);
src/pages/VerificarAcessoPage.tsx:123:        navigate('/dashboard');
src/pages/VerificarAcessoPage.tsx:152:      window.location.href = tonUrl;
src/pages/VerificarAcessoPage.tsx:189:    navigate('/dashboard');
src/components/Sidebar.tsx.bak.typecheck-viva369:28:    navigate('/login');
src/components/Sidebar.tsx.bak.typecheck-viva369:109:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:145:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:181:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:217:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:253:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:289:                    <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:327:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:363:                <Link key={item.path} to={item.path}>
src/components/Sidebar.tsx.bak.typecheck-viva369:403:          <Link to="/perfil">
src/pages/UserDashboardPage.tsx:33:    navigate(rota);
src/pages/NovaSenhaPage.tsx:42:    navigate('/login');
src/pages/RecuperarSenhaPage.tsx:25:        redirectTo: `${window.location.origin}/nova-senha`,
src/pages/RecuperarSenhaPage.tsx:94:          <Link to="/login" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
src/pages/LandingPage.tsx:14:      navigate('/dashboard');
src/pages/LandingPage.tsx:27:            <Link to="/login">
src/pages/LandingPage.tsx:30:            <Link to="/registrar">
src/pages/LandingPage.tsx:46:            <Link to="/registrar">
src/pages/LandingPage.tsx:51:            <Link to="/cardapio">
src/pages/VendasPage.tsx:51:          onClick={() => navigate('/login')}
src/pages/AvaliacaoPublicaPage.tsx:152:            <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-amber-500 text-white" onClick={() => window.location.href = '/'}>
src/pages/AvaliacaoPublicaPage.tsx:303:              <Link to={refId ? `/registrar?ref=${refId}` : '/registrar'}>
src/pages/CampanhasPage.tsx:11:    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
src/pages/CampanhasPage.tsx:12:    textoWhats: `🥶 Promoção de Inverno na ${DADOS_EMPRESA.nome}! Aqueça suas noites com 20% OFF nos nossos caldos. Peça já o seu! \n\nAcesse nosso cardápio: ${window.location.origin}/cardapio`
src/pages/CampanhasPage.tsx:18:    imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
src/pages/CampanhasPage.tsx:19:    textoWhats: `🎉 Sexta Especial ${DADOS_EMPRESA.nome}! Peça 2 Pratos Principais e ganhe uma sobremesa incrível. Vem comemorar o início do fim de semana com a gente! \n\nAcesse nosso cardápio: ${window.location.origin}/cardapio`
src/pages/CampanhasPage.tsx:25:    imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
src/pages/CampanhasPage.tsx:26:    textoWhats: `👨‍👩‍👧‍👦 Combo Família ${DADOS_EMPRESA.nome}! Seu almoço de domingo mais gostoso e prático. Serve até 4 pessoas com aquele sabor que você já conhece. \n\nFaça sua reserva ou peça agora: ${window.location.origin}/cardapio`
src/pages/BioimpedanciaPage.tsx:312:    const url = `${window.location.origin}/publico/${avaliacao.token_acesso || avaliacao.id}`;
src/pages/PaginaPublicaBio.tsx:114:    const url = window.location.href;
src/pages/PaginaPublicaBio.tsx:124:    navigator.clipboard.writeText(window.location.href);
src/pages/PaginaPublicaBio.tsx:134:    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
src/pages/PaginaPublicaBio.tsx:139:    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
src/pages/PaginaPublicaBio.tsx:163:              onClick={() => navigate('/')}
src/pages/AvaliadorBioPage.tsx:197:    const url = `${window.location.origin}/publico/${tokenGerado}`;
src/pages/AvaliadorBioPage.tsx:259:                  value={`${window.location.origin}/publico/${tokenGerado}`}
src/pages/IndicacoesPage.tsx:57:  const linkIndicacao = `${window.location.origin}/registrar?ref=${user?.id}`;
src/pages/DashboardPage.tsx:46:    navigate('/');
src/pages/DashboardPage.tsx:70:          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-3 py-2 bg-green-500/20 text-green-500 rounded-lg text-sm">
src/pages/DashboardPage.tsx:73:          <button onClick={() => navigate('/rede-social')} className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-lg text-sm transition">
src/pages/DashboardPage.tsx:76:          <button onClick={() => navigate('/indicacoes')} className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-lg text-sm transition">
src/pages/DashboardPage.tsx:79:          <button onClick={() => navigate('/premiacoes')} className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-lg text-sm transition">
src/pages/DashboardPage.tsx:82:          <button onClick={() => navigate('/saude')} className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-lg text-sm transition">
src/pages/DashboardPage.tsx:85:          <button onClick={() => navigate('/bioimpedancia')} className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-lg text-sm transition">
src/pages/VendasVivaPlus.tsx:28:      navigate('/login?redirect=/vendas-viva-plus');
src/pages/VendasVivaPlus.tsx:57:        navigate(`/pedido/${result.pedido.id}`);
src/pages/DesafiarAmigosPage.tsx.bak.typecheck-viva369:59:      const link = `${window.location.origin}/anamnese-adesao?ref=${user?.id}&desafio=amigo`;
src/pages/RegistrarPage.tsx:101:      setTimeout(() => navigate('/login'), 3000);
src/pages/RegistrarPage.tsx:180:            <Link to="/login" className="text-emerald-400 hover:underline">
src/pages/VendasVivaPlus.tsx.bak:122:          <a href="https://payment-link-v3.ton.com.br/pl_aLlyO8bqA305RdwSDpiLMpNYvJPgjKw7" target="_blank" rel="noopener noreferrer">
src/pages/VendasVivaPlus.tsx.bak:190:              href="https://payment-link-v3.ton.com.br/pl_aLlyO8bqA305RdwSDpiLMpNYvJPgjKw7"
src/pages/VendasVivaPlus.tsx.bak:379:              href="https://payment-link-v3.ton.com.br/pl_aLlyO8bqA305RdwSDpiLMpNYvJPgjKw7"
src/pages/VendasVivaPlus.tsx.bak:423:            href="https://payment-link-v3.ton.com.br/pl_aLlyO8bqA305RdwSDpiLMpNYvJPgjKw7"
src/pages/VendasVivaPlus.tsx.bak:437:            <Link to="/login" className="text-green-600 hover:text-green-400 underline">Faça login</Link>
src/pages/CadastroPage.tsx.backup-legado:105:        window.location.href = 'https://payment-link-v3.ton.com.br/pl_aLlyO8bqA305RdwSDpiLMpNYvJPgjKw7';
src/pages/CadastroPage.tsx.backup-legado:191:              <Link to="/login" className="text-primary hover:underline font-medium">Faça login</Link>
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:310:    const url = `${window.location.origin}/publico/${avaliacao.token_acesso || avaliacao.id}`;
src/pages/AvaliacaoPublicaPage.tsx.bak.typecheck-viva369:143:            <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-amber-500 text-white" onClick={() => window.location.href = '/'}>
src/pages/AvaliacaoPublicaPage.tsx.bak.typecheck-viva369:294:              <Link to={refId ? `/registrar?ref=${refId}` : '/registrar'}>
src/pages/LoginPage.tsx:30:      navigate('/dashboard');
src/pages/LoginPage.tsx:84:              <Link to="/recuperar-senha" className="text-sm text-emerald-400 hover:underline">
src/pages/LoginPage.tsx:102:<Link to="/tour" className="text-sm text-emerald-400 hover:underline mt-2 block">
src/pages/LoginPage.tsx:105:            <Link to="/registrar" className="text-emerald-400 hover:underline">
src/pages/TourAppPage.tsx:124:            <Link to="/anamnese-adesao" className="block mt-4">
src/pages/DesafiarAmigosPage.tsx:60:      const link = `${window.location.origin}/anamnese-adesao?ref=${user?.id}&desafio=amigo`;
src/pages/AnamneseAdesaoPage.tsx:97:      navigate('/obrigado-adesao');
src/pages/VerificarAcessoPage.tsx.backup-pagamento-real-20260807:42:      setTimeout(() => navigate('/dashboard'), 2000);
src/pages/VerificarAcessoPage.tsx.backup-pagamento-real-20260807:50:    navigate('/dashboard');
src/pages/VerificarAcessoPage.tsx.backup-before-ton-rpc:42:      setTimeout(() => navigate('/dashboard'), 2000);
src/pages/VerificarAcessoPage.tsx.backup-before-ton-rpc:50:    navigate('/dashboard');
src/App.tsx.bak:38:    <Routes>
src/App.tsx.bak:40:      <Route path="/" element={<VendasPage />} />
src/App.tsx.bak:41:      <Route path="/login" element={<LoginPage />} />
src/App.tsx.bak:42:      <Route path="/registrar" element={<RegistrarPage />} />
src/App.tsx.bak:43:      <Route path="/cadastro" element={<CadastroPage />} />
src/App.tsx.bak:44:      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
src/App.tsx.bak:45:      <Route path="/nova-senha" element={<NovaSenhaPage />} />
src/App.tsx.bak:46:      <Route path="/landing" element={<LandingPage />} />
src/App.tsx.bak:49:      <Route path="/dashboard" element={<ProtectedRoute><Sidebar><UserDashboardPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:50:      <Route path="/pdv" element={<ProtectedRoute><Sidebar><PdvPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:51:      <Route path="/cardapio" element={<ProtectedRoute><Sidebar><CardapioClientePage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:52:      <Route path="/monte-sua-festa" element={<ProtectedRoute><Sidebar><MonteSuaFestaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:53:      <Route path="/catalogo" element={<ProtectedRoute><Sidebar><CatalogoPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:54:      <Route path="/gestao-cardapio" element={<ProtectedRoute><Sidebar><GestaoCardapioPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:55:      <Route path="/clientes" element={<ProtectedRoute><Sidebar><ClientesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:56:      <Route path="/financas" element={<ProtectedRoute><Sidebar><FinancasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:57:      <Route path="/meta" element={<ProtectedRoute><Sidebar><MetaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:58:      <Route path="/calendario" element={<ProtectedRoute><Sidebar><CalendarioPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:59:      <Route path="/indicacoes" element={<ProtectedRoute><Sidebar><IndicacoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:60:      <Route path="/campanhas" element={<ProtectedRoute><Sidebar><CampanhasPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:61:      <Route path="/saude" element={<ProtectedRoute><Sidebar><DashboardSaudePage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:62:      <Route path="/bioimpedancia" element={<ProtectedRoute><Sidebar><BioimpedanciaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:63:      <Route path="/rede-social" element={<ProtectedRoute><Sidebar><RedeSocialPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:64:      <Route path="/lives" element={<ProtectedRoute><Sidebar><LivesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:65:      <Route path="/premiacoes" element={<ProtectedRoute><Sidebar><PremiacoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:66:      <Route path="/area-lider" element={<ProtectedRoute><Sidebar><AreaLiderPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:67:      <Route path="/historico-comissoes" element={<ProtectedRoute><Sidebar><HistoricoComissoesPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:68:      <Route path="/perfil" element={<ProtectedRoute><Sidebar><PerfilPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:69:      <Route path="/seguranca" element={<ProtectedRoute><Sidebar><SegurancaPage /></Sidebar></ProtectedRoute>} />
src/App.tsx.bak:71:      <Route path="*" element={<Navigate to="/" replace />} />

## 3. ÁREAS FUNCIONAIS ESPERADAS

- [PRESENTE NO CÓDIGO] /login
- [PRESENTE NO CÓDIGO] /registrar
- [PRESENTE NO CÓDIGO] /recuperar-senha
- [PRESENTE NO CÓDIGO] /verificar-acesso
- [PRESENTE NO CÓDIGO] /dashboard
- [PRESENTE NO CÓDIGO] /desafio-cores
- [PRESENTE NO CÓDIGO] /limpeza-hepatica
- [PRESENTE NO CÓDIGO] /bioimpedancia
- [PRESENTE NO CÓDIGO] /comunidade
- [PRESENTE NO CÓDIGO] /pdv
- [PRESENTE NO CÓDIGO] /area-lider
- [PRESENTE NO CÓDIGO] /atividade-fisica
- [PRESENTE NO CÓDIGO] /lives
- [PRESENTE NO CÓDIGO] /indicacoes
- [PRESENTE NO CÓDIGO] /premiacoes
- [PRESENTE NO CÓDIGO] /anamnese-adesao

A presença da rota no código não confirma que o fluxo funciona no navegador.

## 4. IMPORTS LOCAIS POSSIVELMENTE QUEBRADOS

Nenhum import local ausente foi encontrado pela varredura.

## 5. ANÁLISE DE SUPABASE E BANCO

TABELAS SUPABASE ENCONTRADAS:
- acessos: src/contexts/AcessoContext.tsx, src/lib/pagamento.ts
- anamnese: src/components/Anamnese.tsx
- anamnese_adesao: src/pages/AnamneseAdesaoPage.tsx
- avaliacoes: src/pages/AvaliadorBioPage.tsx
- avaliacoes_bioimpedancia: src/pages/AvaliadorBioPage.tsx, src/pages/PaginaPublicaBio.tsx
- biofotos: src/pages/BioimpedanciaPage.tsx
- bioimpedancia: src/pages/AvaliacaoPublicaPage.tsx, src/pages/BioimpedanciaPage.tsx
- comunidade_posts: src/pages/ComunidadePage.tsx
- desafio_cores: src/pages/DesafioCoresPage.tsx
- desafios_enviados: src/pages/DesafiarAmigosPage.tsx
- historico_comissoes: src/pages/HistoricoComissoesPage.tsx
- indicacoes: src/components/MetasLider.tsx, src/pages/IndicacoesPage.tsx, src/pages/PremiacoesPage.tsx
- lideres: src/pages/AreaLiderPage.tsx, src/pages/PdvPage.tsx
- metas_indicacao: src/components/MetasLider.tsx
- notificacoes_premios: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx
- pagamentos: src/pages/FinancasPage.tsx
- pedidos: src/lib/pagamento.ts, src/pages/CalendarioPage.tsx, src/pages/MetaPage.tsx
- perfis: src/pages/AreaLiderPage.tsx, src/pages/DashboardPage.tsx, src/pages/DashboardSaudePage.tsx, src/pages/PdvPage.tsx, src/pages/PremiacoesPage.tsx
- premios_desafios: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx
- registros_diarios: src/pages/DashboardSaudePage.tsx
- usuarios: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx, src/contexts/AcessoContext.tsx, src/contexts/AuthContext.tsx, src/lib/supabase.ts, src/pages/AreaLiderPage.tsx, src/pages/AvaliacaoPublicaPage.tsx, src/pages/AvaliadorBioPage.tsx, src/pages/ClientesPage.tsx, src/pages/FinancasPage.tsx, src/pages/PerfilPage.tsx
- vendas: src/pages/PdvPage.tsx
- vouchers: src/lib/pagamento.ts

COLUNAS USADAS NAS CONSULTAS:
- ativo: src/components/MetasLider.tsx
- avaliacao_id: src/components/Anamnese.tsx
- codigo: src/lib/pagamento.ts
- created_at: src/pages/ComunidadePage.tsx
- criado_em: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx, src/pages/CalendarioPage.tsx, src/pages/ClientesPage.tsx, src/pages/FinancasPage.tsx, src/pages/HistoricoComissoesPage.tsx, src/pages/IndicacoesPage.tsx
- data: src/pages/DashboardSaudePage.tsx
- data_avaliacao: src/pages/AvaliacaoPublicaPage.tsx, src/pages/BioimpedanciaPage.tsx
- data_pedido: src/lib/pagamento.ts
- desafio_id: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx
- email: src/pages/AvaliadorBioPage.tsx
- id: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx, src/contexts/AcessoContext.tsx, src/contexts/AuthContext.tsx, src/lib/pagamento.ts, src/pages/AreaLiderPage.tsx, src/pages/AvaliacaoPublicaPage.tsx, src/pages/BioimpedanciaPage.tsx, src/pages/ComunidadePage.tsx, src/pages/DashboardPage.tsx, src/pages/DashboardSaudePage.tsx, src/pages/FinancasPage.tsx, src/pages/PdvPage.tsx, src/pages/PerfilPage.tsx, src/pages/PremiacoesPage.tsx
- indicador_id: src/pages/IndicacoesPage.tsx, src/pages/PremiacoesPage.tsx
- lider_id: src/pages/AreaLiderPage.tsx, src/pages/HistoricoComissoesPage.tsx
- oferta_codigo: src/pages/FinancasPage.tsx
- quantidade: src/components/MetasLider.tsx
- status: src/components/MetasLider.tsx, src/lib/pagamento.ts, src/pages/MetaPage.tsx, src/pages/PremiacoesPage.tsx
- tipo: src/components/SistemaPremios.tsx, src/components/SistemaPremiosGrupo.tsx
- token_acesso: src/pages/PaginaPublicaBio.tsx
- user_id: src/pages/BioimpedanciaPage.tsx
- usuario_id: src/components/MetasLider.tsx, src/contexts/AcessoContext.tsx, src/lib/pagamento.ts, src/pages/DashboardSaudePage.tsx, src/pages/DesafioCoresPage.tsx

POSSÍVEIS RISCOS DE CONSULTA:
- src/components/SistemaPremios.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/components/SistemaPremiosGrupo.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/lib/pagamento.ts: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/DashboardPage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/PdvPage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/PerfilPage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/DashboardSaudePage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/PremiacoesPage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/ComunidadePage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/AvaliadorBioPage.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/PaginaPublicaBio.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.
- src/pages/BioimpedanciaPage.tsx: O arquivo usa usuario_id e user_id; verificar se a tabela realmente possui ambos.
- src/pages/AvaliacaoPublicaPage.tsx: O arquivo usa usuario_id e user_id; verificar se a tabela realmente possui ambos.
- src/contexts/AcessoContext.tsx: Uso de .single() — pode gerar 406 se não houver exatamente um registro.

INCONSISTÊNCIAS user_id/usuario_id POR ARQUIVO:
- src/pages/AvaliacaoPublicaPage.tsx
- src/pages/BioimpedanciaPage.tsx

## 6. VARIÁVEIS DE AMBIENTE

- VITE_SUPABASE_URL: DISPONÍVEL nesta sessão
- VITE_SUPABASE_ANON_KEY: DISPONÍVEL nesta sessão
- DATABASE_URL: DISPONÍVEL nesta sessão
- SESSION_SECRET: DISPONÍVEL nesta sessão

Os valores das variáveis nunca são exibidos.

## 7. POSSÍVEIS PLACEHOLDERS E PONTOS INCOMPLETOS

src/contexts/AuthContext.tsx:27:      console.log('Buscando role para usuário:', userId);
src/contexts/AuthContext.tsx:35:        console.log('Role encontrada:', data.role);
src/contexts/AuthContext.tsx:38:        console.log('Nenhuma role encontrada, usando default');
src/contexts/AuthContext.tsx:50:    console.log('AuthProvider - Inicializando...');
src/contexts/AuthContext.tsx:53:      console.log('Sessão obtida:', session?.user?.email);
src/contexts/AuthContext.tsx:64:      console.log('Auth state changed:', _event, session?.user?.email);
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:555:                <Input type="number" step="0.1" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} placeholder="Ex: 75.5" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:559:                <Input type="number" step="0.1" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} placeholder="Ex: 170" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:563:                <Input type="number" step="0.1" value={formData.percentual_gordura} onChange={(e) => setFormData({ ...formData, percentual_gordura: e.target.value })} placeholder="Ex: 25.3" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:567:                <Input type="number" step="0.1" value={formData.massa_muscular} onChange={(e) => setFormData({ ...formData, massa_muscular: e.target.value })} placeholder="Ex: 35.2" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:571:                <Input type="number" value={formData.viscerais} onChange={(e) => setFormData({ ...formData, viscerais: e.target.value })} placeholder="Ex: 8" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak-corrige-user-id:575:                <Textarea value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Como você está se sentindo?" className="bg-slate-700 border-slate-600 text-white" />
src/pages/ComunidadePage.tsx.bak.viva369:248:            <Textarea value={novoPost} onChange={(e) => setNovoPost(e.target.value)} placeholder="O que você quer compartilhar?" className="bg-slate-700 border-slate-600 text-white min-h-[120px] resize-none" />
src/pages/AvaliadorBioPage.tsx:91:        setError('Preencha todos os campos obrigatórios');
src/pages/AvaliadorBioPage.tsx:287:                placeholder="João da Silva"
src/pages/AvaliadorBioPage.tsx:298:                placeholder="joao@email.com"
src/pages/AvaliadorBioPage.tsx:308:                placeholder="(11) 99999-9999"
src/pages/AvaliadorBioPage.tsx:328:                  <SelectValue placeholder="Selecione o gênero" />
src/pages/AvaliadorBioPage.tsx:343:                placeholder="1.75"
src/pages/AvaliadorBioPage.tsx:368:                placeholder="89.2"
src/pages/AvaliadorBioPage.tsx:380:                placeholder="26.5"
src/pages/AvaliadorBioPage.tsx:391:                placeholder="28.4"
src/pages/AvaliadorBioPage.tsx:403:                placeholder="34.8"
src/pages/AvaliadorBioPage.tsx:414:                placeholder="45.0"
src/pages/AvaliadorBioPage.tsx:425:                placeholder="15.2"
src/pages/AvaliadorBioPage.tsx:435:                placeholder="12"
src/pages/AvaliadorBioPage.tsx:445:                placeholder="1780"
src/pages/AvaliadorBioPage.tsx:455:                placeholder="49"
src/pages/AvaliadorBioPage.tsx:466:                placeholder="95.0"
src/pages/AvaliadorBioPage.tsx:477:                placeholder="88.0"
src/pages/AvaliadorBioPage.tsx:488:                placeholder="102.0"
src/pages/AvaliadorBioPage.tsx:557:              placeholder="Observações importantes sobre a avaliação..."
src/pages/VendasVivaPlus.tsx:90:        'Todos os benefícios do Plano VIVA',
src/pages/VendasVivaPlus.tsx.bak:104:    { nome: 'Marcos Andrade, 52', cidade: 'Alagoinhas - BA', texto: 'Meu médico ficou impressionado com meus exames após os 90 dias. Método sério e com resultado comprovado.', estrelas: 5, resultado: 'Saúde ✓' },
src/pages/VendasVivaPlus.tsx.bak:182:            O método Viva369 combina os <strong className="text-white">6 pilares da saúde</strong> em uma
src/pages/VendasVivaPlus.tsx.bak:249:            <Badge className="bg-green-900/30 text-green-400 border-green-700/30 mb-4">O Método</Badge>
src/pages/VendasVivaPlus.tsx.bak:404:              { p: 'E se eu não obtiver resultados?', r: 'O método é comprovado. Mas o que sabemos é que quem segue os 90 dias sempre obtém resultados. Seu comprometimento é a única variável.' },
src/pages/VendasVivaPlus.tsx.bak:433:            © 2026 Viva369 · Feira de Santana, BA · Todos os direitos reservados
src/pages/VerificarAcessoPage.tsx.backup-before-ton-rpc:118:                placeholder="Ex: VIVA369-001"
src/pages/VerificarAcessoPage.tsx.backup-pagamento-real-20260807:118:                placeholder="Ex: VIVA369-001"
src/pages/PremiacoesPage.tsx.backup-ranking-mock:89:  const rankingMock: RankingItem[] = [
src/pages/PremiacoesPage.tsx.backup-ranking-mock:193:                {rankingMock.map(r => (
src/pages/AreaLiderPage.tsx.backup-pre-correcao:314:                placeholder="Ex: 71999999999 ou seu@email.com"
src/pages/CadastroPage.tsx.backup-legado:98:        metodo: 'ton',
src/pages/CadastroPage.tsx.backup-legado:149:                    <FormControl><Input placeholder="Seu nome" {...field} className="bg-background border-border" /></FormControl>
src/pages/CadastroPage.tsx.backup-legado:156:                    <FormControl><Input type="email" placeholder="seu@email.com" {...field} className="bg-background border-border" /></FormControl>
src/pages/CadastroPage.tsx.backup-legado:163:                    <FormControl><Input placeholder="(71) 99999-9999" {...field} className="bg-background border-border" /></FormControl>
src/pages/CadastroPage.tsx.backup-legado:170:                    <FormControl><Input type="password" placeholder="Mínimo 6 caracteres" {...field} className="bg-background border-border" /></FormControl>
src/pages/CadastroPage.tsx.backup-legado:177:                    <FormControl><Input type="password" placeholder="Repita a senha" {...field} className="bg-background border-border" /></FormControl>
src/pages/VerificarAcessoPage.tsx:257:                placeholder="Ex: VIVA369-001"
src/pages/ReceitasPage.tsx:73:      'Lave bem todos os ingredientes',
src/pages/LimpezaHepaticaPage.tsx:212:            preparo: 'Misture todos os ingredientes e sirva em temperatura ambiente' 
src/pages/LimpezaHepaticaPage.tsx:217:            preparo: 'Bata todos os ingredientes no liquidificador até ficar homogêneo' 
src/pages/LimpezaHepaticaPage.tsx:242:            preparo: 'Cozinhe todos os ingredientes e bata no liquidificador' 
src/pages/LimpezaHepaticaPage.tsx:279:            preparo: 'Misture todos os ingredientes em uma tigela' 
src/pages/LimpezaHepaticaPage.tsx:361:            preparo: 'Misture todos os ingredientes e tempere com azeite e limão' 
src/pages/LimpezaHepaticaPage.tsx:415:        <p className="text-slate-400">Receitas para este dia em breve</p>
src/pages/ChatPage.tsx:78:              placeholder="Digite sua mensagem..."
src/pages/ComunidadePage.tsx:248:            <Textarea value={novoPost} onChange={(e) => setNovoPost(e.target.value)} placeholder="O que você quer compartilhar?" className="bg-slate-700 border-slate-600 text-white min-h-[120px] resize-none" />
src/pages/UserDashboardPage.tsx:81:      {/* Cards de Métricas - TODOS COM CLIQUE */}
src/pages/UserDashboardPage.tsx:266:            Ver todos os desafios
src/pages/NovaSenhaPage.tsx:71:                        <Input type="password" placeholder="******" {...field} className="bg-background border-border" />
src/pages/NovaSenhaPage.tsx:84:                        <Input type="password" placeholder="******" {...field} className="bg-background border-border" />
src/pages/RecuperarSenhaPage.tsx:73:                placeholder="seu@email.com"
src/pages/LandingPage.tsx:85:        <p>&copy; {new Date().getFullYear()} {DADOS_EMPRESA.nome}. Todos os direitos reservados.</p>
src/pages/VendasPage.tsx:36:          MÉTODO COMPROVADO DE 90 DIAS
src/pages/AnamneseAdesaoPage.tsx:22:  { id: 'nome', titulo: '🌟 Qual é o seu nome?', descricao: 'Queremos te chamar pelo nome nessa jornada', tipo: 'input', placeholder: 'Digite seu nome completo', obrigatorio: true },
src/pages/AnamneseAdesaoPage.tsx:23:  { id: 'email', titulo: '📧 Qual é o seu email?', descricao: 'Vamos te manter informado sobre sua jornada', tipo: 'input', placeholder: 'seu@email.com', obrigatorio: true },
src/pages/AnamneseAdesaoPage.tsx:24:  { id: 'telefone', titulo: '📱 Qual é o seu WhatsApp?', descricao: 'Para falarmos com você pessoalmente', tipo: 'input', placeholder: '(11) 99999-9999', obrigatorio: true },
src/pages/AnamneseAdesaoPage.tsx:30:  { id: 'mensagem', titulo: '💌 O que você quer DIZER para si mesmo(a)?', descricao: 'Deixe uma mensagem para o seu EU do futuro', tipo: 'texto', placeholder: 'Daqui a 90 dias, eu vou estar...', obrigatorio: false }
src/pages/AnamneseAdesaoPage.tsx:110:    const { id, titulo, descricao, tipo, opcoes, placeholder } = perguntaAtual;
src/pages/AnamneseAdesaoPage.tsx:123:              placeholder={placeholder}
src/pages/AnamneseAdesaoPage.tsx:135:                <SelectValue placeholder="Selecione uma opção..." />
src/pages/AnamneseAdesaoPage.tsx:188:              placeholder={placeholder}
src/pages/AreaLiderPage.tsx:397:                placeholder="Ex: 71999999999 ou seu@email.com"
src/pages/BioimpedanciaPage.tsx:555:                <Input type="number" step="0.1" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} placeholder="Ex: 75.5" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx:559:                <Input type="number" step="0.1" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} placeholder="Ex: 170" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx:563:                <Input type="number" step="0.1" value={formData.percentual_gordura} onChange={(e) => setFormData({ ...formData, percentual_gordura: e.target.value })} placeholder="Ex: 25.3" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx:567:                <Input type="number" step="0.1" value={formData.massa_muscular} onChange={(e) => setFormData({ ...formData, massa_muscular: e.target.value })} placeholder="Ex: 35.2" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx:571:                <Input type="number" value={formData.viscerais} onChange={(e) => setFormData({ ...formData, viscerais: e.target.value })} placeholder="Ex: 8" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx:575:                <Textarea value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Como você está se sentindo?" className="bg-slate-700 border-slate-600 text-white" />
src/pages/DesafiarAmigosPage.tsx:53:      alert('Preencha o nome e telefone de todos os amigos');
src/pages/DesafiarAmigosPage.tsx:84:      setMensagem('✅ Desafios enviados para todos os amigos!');
src/pages/DesafiarAmigosPage.tsx:147:                    placeholder="Nome do amigo"
src/pages/DesafiarAmigosPage.tsx:156:                    placeholder="(11) 99999-9999"
src/pages/LoginPage.tsx:65:                placeholder="seu@email.com"
src/pages/LoginPage.tsx:77:                placeholder="••••••••"
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369:212:            preparo: 'Misture todos os ingredientes e sirva em temperatura ambiente' 
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369:217:            preparo: 'Bata todos os ingredientes no liquidificador até ficar homogêneo' 
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369:242:            preparo: 'Cozinhe todos os ingredientes e bata no liquidificador' 
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369:279:            preparo: 'Misture todos os ingredientes em uma tigela' 
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369:361:            preparo: 'Misture todos os ingredientes e tempere com azeite e limão' 
src/pages/LimpezaHepaticaPage.tsx.bak.typecheck-viva369:415:        <p className="text-slate-400">Receitas para este dia em breve</p>
src/pages/DesafiarAmigosPage.tsx.bak.typecheck-viva369:52:      alert('Preencha o nome e telefone de todos os amigos');
src/pages/DesafiarAmigosPage.tsx.bak.typecheck-viva369:83:      setMensagem('✅ Desafios enviados para todos os amigos!');
src/pages/DesafiarAmigosPage.tsx.bak.typecheck-viva369:146:                    placeholder="Nome do amigo"
src/pages/DesafiarAmigosPage.tsx.bak.typecheck-viva369:155:                    placeholder="(11) 99999-9999"
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:553:                <Input type="number" step="0.1" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} placeholder="Ex: 75.5" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:557:                <Input type="number" step="0.1" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} placeholder="Ex: 170" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:561:                <Input type="number" step="0.1" value={formData.percentual_gordura} onChange={(e) => setFormData({ ...formData, percentual_gordura: e.target.value })} placeholder="Ex: 25.3" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:565:                <Input type="number" step="0.1" value={formData.massa_muscular} onChange={(e) => setFormData({ ...formData, massa_muscular: e.target.value })} placeholder="Ex: 35.2" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:569:                <Input type="number" value={formData.viscerais} onChange={(e) => setFormData({ ...formData, viscerais: e.target.value })} placeholder="Ex: 8" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak.typecheck-viva369:573:                <Textarea value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Como você está se sentindo?" className="bg-slate-700 border-slate-600 text-white" />
src/pages/AtividadeFisicaPage.tsx.bak.typecheck-viva369:41:    descricao: 'Caminhadas para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak.typecheck-viva369:48:    descricao: 'Treinos de bike para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak.typecheck-viva369:200:    descricao: 'Caminhadas para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak.typecheck-viva369:259:    descricao: 'Treinos de bike para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak.typecheck-viva369:499:            Ver todos os treinos no YouTube
src/pages/PdvPage.tsx.bak.viva369:59:    descricao: 'Aprenda a se alimentar melhor todos os dias',
src/pages/PdvPage.tsx.bak.viva369:114:  const [metodoPagamento, setMetodoPagamento] = useState('pix');
src/pages/PdvPage.tsx.bak.viva369:213:          metodo_pagamento: metodoPagamento,
src/pages/PdvPage.tsx.bak.viva369:440:                      placeholder="Opcional"
src/pages/PdvPage.tsx.bak.viva369:478:              <Label className="text-slate-400">Método de Pagamento</Label>
src/pages/PdvPage.tsx.bak.viva369:479:              <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
src/pages/PdvPage.tsx.bak.viva369:491:            {metodoPagamento === 'pix' && (
src/pages/AtividadeFisicaPage.tsx.bak-final-viva369:41:    descricao: 'Caminhadas para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak-final-viva369:48:    descricao: 'Treinos de bike para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak-final-viva369:200:    descricao: 'Caminhadas para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak-final-viva369:259:    descricao: 'Treinos de bike para todos os níveis',
src/pages/AtividadeFisicaPage.tsx.bak-final-viva369:499:            Ver todos os treinos no YouTube
src/pages/AtividadeFisicaPage.tsx:42:    descricao: 'Caminhadas para todos os níveis',
src/pages/AtividadeFisicaPage.tsx:49:    descricao: 'Treinos de bike para todos os níveis',
src/pages/AtividadeFisicaPage.tsx:201:    descricao: 'Caminhadas para todos os níveis',
src/pages/AtividadeFisicaPage.tsx:260:    descricao: 'Treinos de bike para todos os níveis',
src/pages/AtividadeFisicaPage.tsx:500:            Ver todos os treinos no YouTube
src/pages/PdvPage.tsx.bak.typecheck-viva369:59:    descricao: 'Aprenda a se alimentar melhor todos os dias',
src/pages/PdvPage.tsx.bak.typecheck-viva369:114:  const [metodoPagamento, setMetodoPagamento] = useState('pix');
src/pages/PdvPage.tsx.bak.typecheck-viva369:213:          metodo_pagamento: metodoPagamento,
src/pages/PdvPage.tsx.bak.typecheck-viva369:440:                      placeholder="Opcional"
src/pages/PdvPage.tsx.bak.typecheck-viva369:478:              <Label className="text-slate-400">Método de Pagamento</Label>
src/pages/PdvPage.tsx.bak.typecheck-viva369:479:              <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
src/pages/PdvPage.tsx.bak.typecheck-viva369:491:            {metodoPagamento === 'pix' && (
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:555:                <Input type="number" step="0.1" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} placeholder="Ex: 75.5" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:559:                <Input type="number" step="0.1" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} placeholder="Ex: 170" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:563:                <Input type="number" step="0.1" value={formData.percentual_gordura} onChange={(e) => setFormData({ ...formData, percentual_gordura: e.target.value })} placeholder="Ex: 25.3" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:567:                <Input type="number" step="0.1" value={formData.massa_muscular} onChange={(e) => setFormData({ ...formData, massa_muscular: e.target.value })} placeholder="Ex: 35.2" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:571:                <Input type="number" value={formData.viscerais} onChange={(e) => setFormData({ ...formData, viscerais: e.target.value })} placeholder="Ex: 8" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak-historico-viva369:575:                <Textarea value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Como você está se sentindo?" className="bg-slate-700 border-slate-600 text-white" />
src/pages/ClientesPage.tsx:48:            placeholder="Buscar por nome ou email..." 
src/pages/PdvPage.tsx:59:    descricao: 'Aprenda a se alimentar melhor todos os dias',
src/pages/PdvPage.tsx:114:  const [metodoPagamento, setMetodoPagamento] = useState('pix');
src/pages/PdvPage.tsx:213:          metodo_pagamento: metodoPagamento,
src/pages/PdvPage.tsx:440:                      placeholder="Opcional"
src/pages/PdvPage.tsx:478:              <Label className="text-slate-400">Método de Pagamento</Label>
src/pages/PdvPage.tsx:479:              <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
src/pages/PdvPage.tsx:491:            {metodoPagamento === 'pix' && (
src/components/SistemaPremios.tsx.bak-final-viva369:295:                placeholder="Ex: Jantar Especial"
src/components/SistemaPremios.tsx.bak-final-viva369:304:                placeholder="Descreva o prêmio..."
src/components/SistemaPremios.tsx.bak-final-viva369:315:                placeholder="0,00"
src/components/SistemaPremiosGrupo.tsx.bak.typecheck-viva369:285:                placeholder="Ex: Churrasco em Grupo"
src/components/SistemaPremiosGrupo.tsx.bak.typecheck-viva369:294:                placeholder="Descreva o prêmio..."
src/components/SistemaPremiosGrupo.tsx.bak.typecheck-viva369:305:                placeholder="0,00"
src/components/SistemaPremios.tsx.bak.typecheck-viva369:295:                placeholder="Ex: Jantar Especial"
src/components/SistemaPremios.tsx.bak.typecheck-viva369:304:                placeholder="Descreva o prêmio..."
src/components/SistemaPremios.tsx.bak.typecheck-viva369:315:                placeholder="0,00"
src/components/SistemaPremiosGrupo.tsx:285:                placeholder="Ex: Churrasco em Grupo"
src/components/SistemaPremiosGrupo.tsx:294:                placeholder="Descreva o prêmio..."
src/components/SistemaPremiosGrupo.tsx:305:                placeholder="0,00"
src/components/SistemaPremios.tsx:296:                placeholder="Ex: Jantar Especial"
src/components/SistemaPremios.tsx:305:                placeholder="Descreva o prêmio..."
src/components/SistemaPremios.tsx:316:                placeholder="0,00"
src/components/DesafioDetalhes.tsx:357:                    dica: 'Reserve 5-10 minutos para meditar todos os dias. Isso ajuda a reduzir o estresse e manter o foco.' 
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:553:                <Input type="number" step="0.1" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} placeholder="Ex: 75.5" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:557:                <Input type="number" step="0.1" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} placeholder="Ex: 170" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:561:                <Input type="number" step="0.1" value={formData.percentual_gordura} onChange={(e) => setFormData({ ...formData, percentual_gordura: e.target.value })} placeholder="Ex: 25.3" className="bg-slate-700 border-slate-600 text-white" required />
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:565:                <Input type="number" step="0.1" value={formData.massa_muscular} onChange={(e) => setFormData({ ...formData, massa_muscular: e.target.value })} placeholder="Ex: 35.2" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:569:                <Input type="number" value={formData.viscerais} onChange={(e) => setFormData({ ...formData, viscerais: e.target.value })} placeholder="Ex: 8" className="bg-slate-700 border-slate-600 text-white" />
src/pages/BioimpedanciaPage.tsx.bak-final-viva369:573:                <Textarea value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Como você está se sentindo?" className="bg-slate-700 border-slate-600 text-white" />
src/components/Anamnese.tsx:170:                placeholder="Informe doenças crônicas, histórico familiar..."
src/components/Anamnese.tsx:184:                placeholder="Medicamentos que usa regularmente..."
src/components/Anamnese.tsx:198:                placeholder="Cirurgias já realizadas..."
src/components/Anamnese.tsx:212:                placeholder="Descreva seus hábitos diários..."
src/components/Anamnese.tsx:226:                placeholder="Qual seu objetivo com o projeto?"
src/components/Anamnese.tsx:240:                placeholder="Alergias, intolerâncias..."
src/components/Anamnese.tsx:256:                  <SelectValue placeholder="Selecione" />
src/components/Anamnese.tsx:277:                placeholder="Ex: 7 horas"
src/components/Anamnese.tsx:293:                  <SelectValue placeholder="Selecione" />
src/pages/CampanhasPage.tsx:10:    descricao: 'Aqueça suas noites com 20% de desconto em todo o cardápio de caldos e sopas.',
src/components/ModalRegras.tsx:49:              Todos os dados de clientes inseridos devem ser tratados com sigilo e em conformidade com as leis de proteção de dados vigentes. Não compartilhe informações de clientes com terceiros.
src/pages/IndicacoesPage.tsx:34:      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
src/pages/IndicacoesPage.tsx:87:              <Input placeholder="João da Silva" value={nome} onChange={e => setNome(e.target.value)} />
src/pages/IndicacoesPage.tsx:91:              <Input type="email" placeholder="joao@email.com" value={email} onChange={e => setEmail(e.target.value)} />
src/components/ui/textarea.tsx:11:        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
src/pages/MetaPage.tsx:111:              <p className="text-muted-foreground">Todo grande resultado começa com o primeiro passo. Vamos vender!</p>
src/components/ui/input.tsx:10:          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
src/components/ui/select.tsx:21:      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
src/components/ui/command.tsx:46:        'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
src/pages/FinancasPage.tsx:26:  metodo_pagamento: string | null;
src/pages/FinancasPage.tsx:113:          metodo_pagamento,
src/pages/FinancasPage.tsx:427:                        Método: {pagamento.metodo_pagamento || '-'}

## 8. VERIFICAÇÃO DE ERROS DE TYPESCRIPT


> @workspace/viva369@0.0.0 typecheck /home/runner/workspace/artifacts/viva369
> tsc -p tsconfig.json --noEmit


RESULTADO TYPECHECK: APROVADO — código 0

## 9. VERIFICAÇÃO DE BUILD


> @workspace/viva369@0.0.0 build /home/runner/workspace/artifacts/viva369
> vite build --config vite.config.ts

vite v7.3.6 building client environment for production...
transforming...
src/components/ui/label.tsx (2:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
src/components/ui/progress.tsx (2:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
src/components/ui/avatar.tsx (2:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
src/components/ui/select.tsx (2:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
✓ 3660 modules transformed.
rendering chunks...
computing gzip size...
dist/public/index.html                     0.74 kB │ gzip:   0.43 kB
dist/public/assets/index-DOOw9G8Z.css    107.27 kB │ gzip:  17.70 kB
dist/public/assets/index-uBuSWZYN.js   1,108.90 kB │ gzip: 318.87 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 6.21s

RESULTADO BUILD: APROVADO — código 0

## 10. CHECKLIST DE TESTES MANUAIS PENDENTES

Estes testes precisam ser feitos no navegador com uma conta autorizada:

- [ ] Login e logout
- [ ] Recuperação de senha
- [ ] Cadastro e termo de consentimento
- [ ] Voucher e liberação de acesso
- [ ] Dashboard e métricas
- [ ] Desafio das Cores
- [ ] Limpeza Hepática
- [ ] Histórico de seis avaliações da Bioimpedância
- [ ] Upload de foto da Bioimpedância
- [ ] QR Code e compartilhamento
- [ ] Comunidade: carregar, criar, curtir e comentar
- [ ] PDV: produtos, carrinho, venda e comissão
- [ ] Área do Líder e chave Pix
- [ ] Atividade Física e progresso
- [ ] Lives e lembretes
- [ ] Indicações
- [ ] Premiações
- [ ] Anamnese de Adesão

A validação do RLS precisa incluir uma inserção real feita por usuário autenticado.

## 11. RESULTADO FINAL

- Typecheck: código 0
- Build: código 0
- Relatório completo: RELATORIO_VARREDURA_COMPLETA_VIVA369.md
- Log técnico: /tmp/viva369-varredura-completa.log

Importante: nenhum comando de encerramento foi usado. O Shell continuará aberto.
