import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/supabase';
import {
  LayoutDashboard, Users, Gift, Trophy, Compass, Activity,
  ShoppingCart, UserCircle, LogOut, Menu, X,
  Sparkles, BookOpen, Crown, Settings, Briefcase,
  Package, Heart, Scale, Share2, Video, DollarSign,
  MessageCircle, Dumbbell, Utensils, Cloud, Shield,
  TrendingUp, CalendarDays, Megaphone, LineChart,
  Target, Award, Gem, Star
} from 'lucide-react';
import { DADOS_EMPRESA } from '@/config/empresa';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { pathname: location } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, role } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // ============ MENU PRINCIPAL ============
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Comunidade', icon: Users, path: '/comunidade' },
    { label: 'Indicações', icon: Gift, path: '/indicacoes' },
    { label: 'Premiações', icon: Trophy, path: '/premiacoes' },
    { label: 'Jornada', icon: Compass, path: '/meta' },
    { label: 'Bioimpedância', icon: Activity, path: '/bioimpedancia' },
  ];

  // ============ DESAFIOS ============
  const menuDesafios = [
    { label: 'Desafio das Cores', icon: Sparkles, path: '/desafio-cores' },
    { label: 'Limpeza Hepática', icon: BookOpen, path: '/limpeza-hepatica' },
  ];

  // ============ VENDAS ============
  const menuVendas = [
    { label: 'PDV', icon: ShoppingCart, path: '/pdv' },
    { label: "Gestão Produtos", icon: Package, path: "/gestao-produtos" },
    { label: 'Vendas Viva+', icon: TrendingUp, path: '/vendas-viva-plus' },
  ];

  // ============ SAÚDE ============
  const menuSaude = [
    { label: 'Dashboard Saúde', icon: Heart, path: '/saude' },
    { label: 'Bioimpedância', icon: Scale, path: '/bioimpedancia' },
    { label: 'Treinos', icon: Dumbbell, path: '/treinos' },
    { label: 'Atividade Física', icon: Activity, path: '/atividade-fisica' },
    { label: 'Receitas', icon: Utensils, path: '/receitas' },
    { label: 'Rede VIVA+', icon: Share2, path: '/rede-social' },
  ];

  // ============ COMUNICAÇÃO ============
  const menuComunicacao = [
    { label: 'Chat', icon: MessageCircle, path: '/chat' },
    { label: 'Lives', icon: Video, path: '/lives' },
  ];

  // ============ GESTÃO (Admin) ============
  const menuGestao = [
    { label: 'Finanças', icon: LineChart, path: '/financas' },
    { label: 'Calendário', icon: CalendarDays, path: '/calendario' },
    { label: 'Campanhas', icon: Megaphone, path: '/campanhas' },
    { label: 'Clientes', icon: Users, path: '/clientes' },
  ];

  // ============ LÍDER ============
  const menuLider = [
    { label: 'Área do Líder', icon: Crown, path: '/area-lider' },
    { label: 'Comissões', icon: DollarSign, path: '/historico-comissoes' },
    { label: 'Parceria VIVA', icon: Briefcase, path: '/parceria-viva' },
  ];

  // ============ CONFIGURAÇÕES ============
  const menuConfiguracoes = [
    { label: 'Configurações', icon: Settings, path: '/configuracoes' },
    { label: 'Integrações', icon: Cloud, path: '/integracoes' },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-slate-900 border-r border-white/5">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="bg-gradient-to-br from-emerald-500 to-amber-500 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">VIVA369</h1>
          <p className="text-xs text-slate-400">Sua jornada de saúde</p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {/* Menu Principal */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Separador DESAFIOS */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Desafios</span>
            </div>
          </div>

          {/* Menu DESAFIOS */}
          <div className="space-y-1">
            {menuDesafios.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Separador VENDAS */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Vendas</span>
            </div>
          </div>

          {/* Menu VENDAS */}
          <div className="space-y-1">
            {menuVendas.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Separador SAÚDE */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Saúde</span>
            </div>
          </div>

          {/* Menu SAÚDE */}
          <div className="space-y-1">
            {menuSaude.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Separador COMUNICAÇÃO */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Comunicação</span>
            </div>
          </div>

          {/* Menu COMUNICAÇÃO */}
          <div className="space-y-1">
            {menuComunicacao.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Separador GESTÃO - só para admin */}
          {(role === 'admin' || role === 'gestor') && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500">Gestão</span>
                </div>
              </div>
              <div className="space-y-1">
                {menuGestao.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <div
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                          isActive
                            ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        <item.icon className={cn(
                          "h-4 w-4",
                          isActive ? "text-emerald-400" : "text-slate-500"
                        )} />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* Separador LÍDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Líder</span>
            </div>
          </div>

          {/* Menu LÍDER */}
          <div className="space-y-1">
            {menuLider.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Separador CONFIGURAÇÕES */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Configurações</span>
            </div>
          </div>

          {/* Menu CONFIGURAÇÕES */}
          <div className="space-y-1">
            {menuConfiguracoes.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-emerald-500/20 text-white border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-emerald-400" : "text-slate-500"
                    )} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer com Perfil */}
      <div className="border-t border-white/5 p-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 border-2 border-emerald-500/30">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-sm">
              {user?.user_metadata?.nome?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.user_metadata?.nome || user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
          <Link to="/perfil">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5">
              <UserCircle className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-slate-950">
      {/* Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-slate-900 shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-50 text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-72 flex-col fixed inset-y-0 z-10">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-slate-900/90 px-4 backdrop-blur-sm md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-amber-500 p-1.5 rounded-lg text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-bold text-white text-sm">VIVA369</div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
