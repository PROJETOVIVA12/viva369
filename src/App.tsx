import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AcessoProvider } from './contexts/AcessoContext';
import { Sidebar } from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import LiveStatus from "./components/LiveStatus";
import VendasPage from './pages/VendasPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistrarPage from './pages/RegistrarPage';
import CadastroPage from './pages/CadastroPage';
import RecuperarSenhaPage from './pages/RecuperarSenhaPage';
import NovaSenhaPage from './pages/NovaSenhaPage';
import DashboardPage from './pages/DashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import VerificarAcessoPage from './pages/VerificarAcessoPage';
import PdvPage from './pages/PdvPage';
import GestaoProdutosPage from "./pages/GestaoProdutosPage";
import ClientesPage from './pages/ClientesPage';
import FinancasPage from './pages/FinancasPage';
import MetaPage from './pages/MetaPage';
import CalendarioPage from './pages/CalendarioPage';
import IndicacoesPage from './pages/IndicacoesPage';
import CampanhasPage from './pages/CampanhasPage';
import DashboardSaudePage from './pages/DashboardSaudePage';
import BioimpedanciaPage from './pages/BioimpedanciaPage';
import RedeSocialPage from './pages/RedeSocialPage';
import LivesPage from './pages/LivesPage';
import PremiacoesPage from './pages/PremiacoesPage';
import AreaLiderPage from './pages/AreaLiderPage';
import HistoricoComissoesPage from './pages/HistoricoComissoesPage';
import PerfilPage from './pages/PerfilPage';
import SegurancaPage from './pages/SegurancaPage';
import VendasVivaPlus from './pages/VendasVivaPlus';
import ComunidadePage from './pages/ComunidadePage';
import ChatPage from './pages/ChatPage';
import TreinosPage from './pages/TreinosPage';
import AtividadeFisicaPage from "./pages/AtividadeFisicaPage";
import ReceitasPage from './pages/ReceitasPage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';
import IntegracoesPage from './pages/IntegracoesPage';
import DesafioCoresPage from './pages/DesafioCoresPage';
import LimpezaHepaticaPage from './pages/LimpezaHepaticaPage';
import AvaliacaoPublicaPage from "./pages/AvaliacaoPublicaPage";
import AnamneseAdesaoPage from "./pages/AnamneseAdesaoPage";
import DesafiarAmigosPage from "./pages/DesafiarAmigosPage";
import TourAppPage from "./pages/TourAppPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<VendasPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registrar" element={<RegistrarPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
      <Route path="/nova-senha" element={<NovaSenhaPage />} />
      <Route path="/landing" element={<LandingPage />} />
<Route path="/publico/:id" element={<AvaliacaoPublicaPage />} />
      <Route path="/avaliacao-publica" element={<AvaliacaoPublicaPage />} />
      <Route path="/avaliacao-resultado" element={<AvaliacaoResultadoPage />} />
<Route path="/anamnese-adesao" element={<AnamneseAdesaoPage />} />
<Route path="/desafiar-amigos" element={<ProtectedRoute><Sidebar><DesafiarAmigosPage /></Sidebar></ProtectedRoute>} />
<Route path="/tour" element={<TourAppPage />} />
      <Route path="/verificar-acesso" element={<VerificarAcessoPage />} />

      {/* Rotas Protegidas com Sidebar */}
      <Route path="/dashboard" element={<ProtectedRoute><Sidebar><UserDashboardPage /></Sidebar></ProtectedRoute>} />
      <Route path="/pdv" element={<ProtectedRoute><Sidebar><PdvPage /></Sidebar></ProtectedRoute>} />
<Route path="/gestao-produtos" element={<ProtectedRoute><Sidebar><GestaoProdutosPage /></Sidebar></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><Sidebar><ClientesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/financas" element={<ProtectedRoute><Sidebar><FinancasPage /></Sidebar></ProtectedRoute>} />
      <Route path="/meta" element={<ProtectedRoute><Sidebar><MetaPage /></Sidebar></ProtectedRoute>} />
      <Route path="/calendario" element={<ProtectedRoute><Sidebar><CalendarioPage /></Sidebar></ProtectedRoute>} />
      <Route path="/indicacoes" element={<ProtectedRoute><Sidebar><IndicacoesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/campanhas" element={<ProtectedRoute><Sidebar><CampanhasPage /></Sidebar></ProtectedRoute>} />
      <Route path="/saude" element={<ProtectedRoute><Sidebar><DashboardSaudePage /></Sidebar></ProtectedRoute>} />
      <Route path="/bioimpedancia" element={<ProtectedRoute><Sidebar><BioimpedanciaPage /></Sidebar></ProtectedRoute>} />
      <Route path="/rede-social" element={<ProtectedRoute><Sidebar><RedeSocialPage /></Sidebar></ProtectedRoute>} />
      <Route path="/lives" element={<ProtectedRoute><Sidebar><LivesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/premiacoes" element={<ProtectedRoute><Sidebar><PremiacoesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/area-lider" element={<ProtectedRoute><Sidebar><AreaLiderPage /></Sidebar></ProtectedRoute>} />
      <Route path="/historico-comissoes" element={<ProtectedRoute><Sidebar><HistoricoComissoesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Sidebar><PerfilPage /></Sidebar></ProtectedRoute>} />
      <Route path="/seguranca" element={<ProtectedRoute><Sidebar><SegurancaPage /></Sidebar></ProtectedRoute>} />
      <Route path="/vendas-viva-plus" element={<ProtectedRoute><Sidebar><VendasVivaPlus /></Sidebar></ProtectedRoute>} />
      <Route path="/comunidade" element={<ProtectedRoute><Sidebar><ComunidadePage /></Sidebar></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><Sidebar><ChatPage /></Sidebar></ProtectedRoute>} />
      <Route path="/treinos" element={<ProtectedRoute><Sidebar><TreinosPage /></Sidebar></ProtectedRoute>} />
<Route path="/atividade-fisica" element={<ProtectedRoute><Sidebar><AtividadeFisicaPage /></Sidebar></ProtectedRoute>} />
      <Route path="/receitas" element={<ProtectedRoute><Sidebar><ReceitasPage /></Sidebar></ProtectedRoute>} />
      <Route path="/configuracoes" element={<ProtectedRoute><Sidebar><ConfiguracoesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/integracoes" element={<ProtectedRoute><Sidebar><IntegracoesPage /></Sidebar></ProtectedRoute>} />
      <Route path="/desafio-cores" element={<ProtectedRoute><Sidebar><DesafioCoresPage /></Sidebar></ProtectedRoute>} />
      <Route path="/limpeza-hepatica" element={<ProtectedRoute><Sidebar><LimpezaHepaticaPage /></Sidebar></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AcessoProvider>
          <AppRoutes />
        </AcessoProvider>
<LiveStatus />
      </AuthProvider>
    </BrowserRouter>
  );
}
