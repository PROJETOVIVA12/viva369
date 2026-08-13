import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, DollarSign, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

interface Comissao {
  id: string;
  valor: number;
  status: 'pendente' | 'pago';
  criado_em: string;
  pago_em: string | null;
  pagamentos: {
    usuarios: { nome: string; email: string } | null;
  } | null;
}

export default function HistoricoComissoesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [comissoes, setComissoes] = useState<Comissao[]>([]);
  const [totais, setTotais] = useState({ total: 0, pago: 0, pendente: 0 });

  useEffect(() => {
    if (user) fetchComissoes();
  }, [user]);

  const fetchComissoes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('historico_comissoes')
      .select(`
        id, valor, status, criado_em, pago_em,
        pagamentos (
          usuario_id,
          perfis:usuario_id ( nome, email )
        )
      `)
      .eq('lider_id', user?.id)
      .order('criado_em', { ascending: false });

    if (data) {
      setComissoes(data as any);
      const total = data.reduce((s, c) => s + Number(c.valor), 0);
      const pago = data.filter(c => c.status === 'pago').reduce((s, c) => s + Number(c.valor), 0);
      setTotais({ total, pago, pendente: total - pago });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Histórico de Comissões</h2>
        <p className="text-muted-foreground">Todas as comissões geradas pelas suas indicações.</p>
      </div>

      {/* Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Gerado</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {totais.total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{comissoes.length} comissão(ões)</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Já Recebido</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">R$ {totais.pago.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{comissoes.filter(c => c.status === 'pago').length} pago(s)</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">R$ {totais.pendente.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{comissoes.filter(c => c.status === 'pendente').length} pendente(s)</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" /> Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : comissoes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhuma comissão registrada ainda.</p>
              <p className="text-sm mt-1">Compartilhe seu link para começar a ganhar!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {comissoes.map(c => {
                const perfil = (c.pagamentos as any)?.perfis;
                return (
                  <div key={c.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${c.status === 'pago' ? 'bg-green-900/30' : 'bg-amber-900/30'}`}>
                        <DollarSign className={`w-4 h-4 ${c.status === 'pago' ? 'text-green-400' : 'text-amber-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {perfil?.nome || 'Cliente'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {perfil?.email || '—'} · {new Date(c.criado_em).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">R$ {Number(c.valor).toFixed(2)}</p>
                      <Badge
                        className={c.status === 'pago'
                          ? 'bg-green-900/40 text-green-400 border-green-700/30'
                          : 'bg-amber-900/40 text-amber-400 border-amber-700/30'
                        }
                      >
                        {c.status === 'pago' ? '✅ Pago' : '⏳ Pendente'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
