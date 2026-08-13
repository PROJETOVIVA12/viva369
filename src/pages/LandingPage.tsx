import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DADOS_EMPRESA } from '@/config/empresa';
import { PartyPopper, ArrowRight, Utensils, Star, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function LandingPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) {
      navigate('/dashboard');
    }
  }, [session, loading]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <PartyPopper className="w-6 h-6" />
            {DADOS_EMPRESA.nome}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:flex text-foreground">Entrar</Button>
            </Link>
            <Link to="/registrar">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
            Gestão inteligente para <span className="text-primary">gastronomia premium.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Organize seus pedidos, impulsione suas vendas e ofereça uma experiência inesquecível para seus clientes em Feira de Santana.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/registrar">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 gap-2">
                Começar agora <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/cardapio">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-border">
                Ver Cardápio
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32 w-full px-4 text-left">
          <div className="space-y-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl text-primary">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Gestão Completa</h3>
            <p className="text-muted-foreground">Catálogo, PDV e controle de pedidos integrados em uma plataforma rápida.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl text-primary">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Experiência Premium</h3>
            <p className="text-muted-foreground">Um visual sofisticado que reflete a qualidade dos seus produtos e fideliza clientes.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Automação de WhatsApp</h3>
            <p className="text-muted-foreground">Receba pedidos formatados diretamente no seu WhatsApp sem complicações.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-muted-foreground mt-auto">
        <p>&copy; {new Date().getFullYear()} {DADOS_EMPRESA.nome}. Todos os direitos reservados.</p>
        <p className="text-sm mt-2">{DADOS_EMPRESA.endereco} • WhatsApp: {DADOS_EMPRESA.whatsapp}</p>
      </footer>
    </div>
  );
}
