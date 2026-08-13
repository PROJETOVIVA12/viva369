import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Award, Crown, Gem, Star, 
  Shield, Heart, Users, Gift, 
  TrendingUp, CheckCircle, ArrowRight,
  Sparkles, Target, Flame, Clock,
  Lock, Unlock, CreditCard, Wallet,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { criarPedido, iniciarPagamento } from '@/lib/pagamento';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VendasVivaPlus() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComprar = async () => {
    if (!user) {
      navigate('/login?redirect=/vendas-viva-plus');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nome = user.user_metadata?.nome || user.email?.split('@')[0] || 'Usuário';
      
      // 1. Criar pedido no banco
      const result = await criarPedido(
        user.id,
        user.email || '',
        nome,
        'viva'
      );

      if (!result.success) {
        setError(result.error || 'Erro ao criar pedido');
        setLoading(false);
        return;
      }

      // 2. Iniciar pagamento
      iniciarPagamento(result.pedido, nome);

      // 3. Redirecionar para página de acompanhamento
      setTimeout(() => {
        navigate(`/pedido/${result.pedido.id}`);
      }, 2000);

    } catch (error: any) {
      console.error('Erro ao processar compra:', error);
      setError(error.message || 'Erro ao processar compra');
    } finally {
      setLoading(false);
    }
  };

  const planos = [
    {
      nome: 'Plano VIVA',
      preco: 250,
      descricao: 'Acesso completo por 36 meses',
      beneficios: [
        'Dashboard personalizado',
        'Bioimpedância completa',
        'Desafio das Cores',
        'Limpeza Hepática',
        'Comunidade VIVA+',
        'Indicações e premiações',
        'Área do Líder'
      ],
      destaque: false,
      cor: 'from-emerald-500 to-emerald-600'
    },
    {
      nome: 'Plano VIVA+ PREMIUM',
      preco: 450,
      descricao: 'Acesso VIP com benefícios exclusivos',
      beneficios: [
        'Todos os benefícios do Plano VIVA',
        'Consultoria personalizada',
        'Grupo VIP exclusivo',
        'Lives com especialistas',
        'Material exclusivo',
        'Prioridade no suporte',
        'Certificado de conclusão'
      ],
      destaque: true,
      cor: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse delay-100" />
        
        <div className="relative text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Transforme sua vida
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            VIVA369
          </h1>
          <p className="text-white/80 text-lg mt-2">
            Sua jornada de saúde começa aqui
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Badge className="bg-white/20 text-white border-0">
              <Users className="h-4 w-4 mr-2" />
              50K+ membros
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Star className="h-4 w-4 mr-2" />
              4.9 estrelas
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Clock className="h-4 w-4 mr-2" />
              36 meses de acesso
            </Badge>
          </div>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      )}

      {/* Planos */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {planos.map((plano) => (
          <Card key={plano.nome} className={cn(
            "bg-slate-800 border-slate-700 relative overflow-hidden",
            plano.destaque && "border-amber-500/30 shadow-xl shadow-amber-500/10"
          )}>
            {plano.destaque && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 rounded-tl-none">
                  <Crown className="h-3 w-3 mr-1" />
                  Recomendado
                </Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg bg-gradient-to-r text-white",
                  plano.destaque ? "from-amber-500 to-yellow-500" : "from-emerald-500 to-emerald-600"
                )}>
                  {plano.destaque ? <Crown className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-white">{plano.nome}</CardTitle>
                  <CardDescription className="text-slate-400">{plano.descricao}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-3xl font-bold text-white">R$ {plano.preco}</span>
                <span className="text-slate-400 ml-2">/ acesso vitalício</span>
              </div>
              <ul className="space-y-2">
                {plano.beneficios.map((beneficio, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {beneficio}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={cn(
                  "w-full gap-2 text-white",
                  plano.destaque 
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90" 
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90"
                )}
                onClick={handleComprar}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    {user ? 'Comprar Agora' : 'Criar Conta e Comprar'}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Benefícios Extras */}
      <Card className="bg-slate-800 border-slate-700 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-center">O que você vai conquistar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Heart, label: 'Saúde em dia', desc: 'Acompanhamento completo' },
              { icon: Target, label: 'Metas diárias', desc: 'Desafios personalizados' },
              { icon: Users, label: 'Comunidade', desc: 'Apoio e motivação' },
              { icon: Award, label: 'Recompensas', desc: 'Gamificação e prêmios' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Icon className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-slate-400">
          <Shield className="h-4 w-4 inline mr-2 text-emerald-400" />
          Pagamento 100% seguro via Ton
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Ao comprar, você concorda com os Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
