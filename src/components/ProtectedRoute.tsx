import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAcesso } from '@/contexts/AcessoContext';
import { Loader2 } from 'lucide-react';
import DegustacaoOverlay from './DegustacaoOverlay';

// Páginas que podem ser visualizadas em modo degustação
const PAGINAS_DEGUSTACAO = [
  { path: '/dashboard', titulo: 'Dashboard', descricao: 'Visualize suas métricas e progresso em tempo real' },
  { path: '/comunidade', titulo: 'Comunidade', descricao: 'Conecte-se com outras pessoas na mesma jornada' },
  { path: '/desafio-cores', titulo: 'Desafio das Cores', descricao: 'Transforme sua vida em 30, 60 e 90 dias' },
  { path: '/limpeza-hepatica', titulo: 'Limpeza Hepática', descricao: 'Protocolo completo de desintoxicação' },
  { path: '/bioimpedancia', titulo: 'Bioimpedância', descricao: 'Acompanhe sua evolução corporal' },
  { path: '/indicacoes', titulo: 'Indicações', descricao: 'Convide amigos e ganhe recompensas' },
  { path: '/premiacoes', titulo: 'Premiações', descricao: 'Suas conquistas e recompensas' },
  { path: '/area-lider', titulo: 'Área do Líder', descricao: 'Gerencie suas comissões e indicações' },
  { path: '/pdv', titulo: 'PDV', descricao: 'Produtos e suplementos para sua saúde' },
  { path: '/treinos', titulo: 'Treinos', descricao: 'Planos de treino personalizados' },
  { path: '/receitas', titulo: 'Receitas', descricao: 'Receitas saudáveis para sua dieta' },
];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { temAcesso, loading: acessoLoading, verificarAcesso } = useAcesso();
  const location = useLocation();
  const [isDegustacao, setIsDegustacao] = useState(false);

  useEffect(() => {
    if (user) {
      verificarAcesso();
    }
  }, [user]);

  // Verificar se a página atual está na lista de degustação
  useEffect(() => {
    const paginaAtual = PAGINAS_DEGUSTACAO.find(p => p.path === location.pathname);
    setIsDegustacao(!!paginaAtual);
  }, [location.pathname]);

  if (authLoading || acessoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          <p className="text-slate-400 text-sm">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se tem acesso, mostra o conteúdo normalmente
  if (temAcesso) {
    return <>{children}</>;
  }

  // Se está em modo degustação, mostra com overlay
  if (isDegustacao) {
    const pagina = PAGINAS_DEGUSTACAO.find(p => p.path === location.pathname);
    return (
      <DegustacaoOverlay 
        pagina={location.pathname}
        titulo={pagina?.titulo || 'Área Restrita'}
        descricao={pagina?.descricao || 'Faça adesão para acessar esta funcionalidade'}
      >
        {children}
      </DegustacaoOverlay>
    );
  }

  // Se não tem acesso e não está em degustação, redireciona para verificar acesso
  return <Navigate to="/verificar-acesso" replace />;
}
