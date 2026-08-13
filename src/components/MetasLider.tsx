import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Target, Trophy, Award, Crown, Gem, 
  Star, Sparkles, CheckCircle, Loader2,
  TrendingUp, Gift, Users, Medal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Meta {
  id: string;
  quantidade: number;
  premio: string;
  ativo: boolean;
}

export default function MetasLider() {
  const { user } = useAuth();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [totalIndicacoes, setTotalIndicacoes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      carregarDados();
    }
  }, [user]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      // Carregar metas
      const { data: metasData } = await supabase
        .from('metas_indicacao')
        .select('*')
        .eq('ativo', true)
        .order('quantidade', { ascending: true });

      setMetas(metasData || []);

      // Carregar total de indicações
      const { data: indicacoesData } = await supabase
        .from('indicacoes')
        .select('id')
        .eq('usuario_id', user?.id)
        .eq('status', 'confirmado');

      setTotalIndicacoes(indicacoesData?.length || 0);

    } catch (error) {
      console.error('Erro ao carregar metas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconeMeta = (quantidade: number) => {
    if (quantidade >= 50) return Crown;
    if (quantidade >= 30) return Trophy;
    if (quantidade >= 15) return Award;
    if (quantidade >= 5) return Star;
    return Target;
  };

  const getCorProgresso = (quantidade: number) => {
    const progresso = (totalIndicacoes / quantidade) * 100;
    if (progresso >= 100) return 'bg-gradient-to-r from-emerald-500 to-amber-500';
    if (progresso >= 75) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (progresso >= 50) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-slate-600';
  };

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
          <span className="ml-2 text-slate-400">Carregando metas...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-400" />
          Metas de Indicação e Premiações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total de Indicações</p>
              <p className="text-2xl font-bold text-white">{totalIndicacoes}</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Users className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Continue indicando para alcançar novas metas!
          </p>
        </div>

        <div className="space-y-4">
          {metas.length === 0 ? (
            <p className="text-slate-400 text-center py-4">
              Nenhuma meta definida. Aguarde novas premiações!
            </p>
          ) : (
            metas.map((meta) => {
              const Icone = getIconeMeta(meta.quantidade);
              const progresso = Math.min((totalIndicacoes / meta.quantidade) * 100, 100);
              const bateu = totalIndicacoes >= meta.quantidade;

              return (
                <div 
                  key={meta.id} 
                  className={cn(
                    "p-4 rounded-lg border transition-all",
                    bateu 
                      ? "border-emerald-500/30 bg-emerald-500/10" 
                      : "border-slate-600 bg-slate-700/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        bateu ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-600/50 text-slate-400"
                      )}>
                        <Icone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Meta: {meta.quantidade} indicações
                        </p>
                        <p className="text-sm text-slate-400 flex items-center gap-1">
                          <Gift className="h-3 w-3" />
                          Prêmio: {meta.premio}
                        </p>
                      </div>
                    </div>
                    {bateu && (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        ✅ Meta batida!
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{totalIndicacoes} / {meta.quantidade}</span>
                      <span className={cn(
                        bateu ? "text-emerald-400" : "text-slate-400"
                      )}>
                        {Math.round(progresso)}%
                      </span>
                    </div>
                    <Progress 
                      value={progresso} 
                      className={cn(
                        "h-2",
                        getCorProgresso(meta.quantidade)
                      )}
                    />
                  </div>

                  {bateu && (
                    <div className="mt-2 flex items-center gap-2 text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-medium">🏆 Prêmio liberado!</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {totalIndicacoes > 0 && metas.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Próxima meta:</span>
              <span className="text-emerald-400 font-medium">
                {metas.find(m => m.quantidade > totalIndicacoes)?.quantidade || 'Todas batidas!'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
