import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MetaPage() {
  const [meta, setMeta] = useState(5000);
  const [receitaMes, setReceitaMes] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const metaSalva = localStorage.getItem('viva_meta_mensal');
    if (metaSalva) setMeta(Number(metaSalva));

    async function fetchReceitaMes() {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const { data } = await supabase
        .from('pedidos')
        .select('total')
        .gte('criado_em', firstDay.toISOString())
        .neq('status', 'cancelado');

      if (data) {
        const total = data.reduce((acc, curr) => acc + Number(curr.total), 0);
        setReceitaMes(total);
      }
      setLoading(false);
    }
    fetchReceitaMes();
  }, []);

  const handleSaveMeta = () => {
    localStorage.setItem('viva_meta_mensal', meta.toString());
    toast({ title: 'Meta atualizada!' });
  };

  const progresso = meta > 0 ? Math.min(Math.round((receitaMes / meta) * 100), 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Metas e Objetivos</h2>
        <p className="text-muted-foreground">Acompanhe o desempenho do mês atual.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Target className="w-5 h-5" /> Meta do Mês (R$)
            </CardTitle>
            <CardDescription>Defina o objetivo de faturamento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              type="number" 
              value={meta} 
              onChange={e => setMeta(Number(e.target.value))} 
              className="text-2xl font-bold h-14"
            />
            <Button onClick={handleSaveMeta} className="w-full">Salvar Meta</Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Realizado
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">Faturamento até o momento.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-2xl font-black">...</div>
            ) : (
              <div className="text-4xl font-black">R$ {receitaMes.toFixed(2)}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Progresso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progresso} className="h-4 bg-muted border border-border" />
          <div className="flex justify-between text-sm font-medium">
            <span className="text-muted-foreground">0%</span>
            <span className="text-primary font-bold text-lg">{progresso}% concluído</span>
            <span className="text-muted-foreground">100%</span>
          </div>

          <div className="p-4 bg-muted rounded-lg border border-border text-center">
            {progresso >= 100 ? (
              <p className="text-amber-400 font-bold text-lg">Parabéns! Meta do mês alcançada! 🎉</p>
            ) : progresso >= 80 ? (
              <p className="text-foreground">Quase lá! Falta pouco para batermos a meta. Continue focado!</p>
            ) : progresso >= 50 ? (
              <p className="text-foreground">Estamos na metade do caminho. O ritmo está bom!</p>
            ) : (
              <p className="text-muted-foreground">Todo grande resultado começa com o primeiro passo. Vamos vender!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
