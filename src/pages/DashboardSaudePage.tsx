import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Loader2, Droplets, Footprints, Moon, Smile, Flame, Heart, Dumbbell, Apple, Brain, Zap, Save } from 'lucide-react';

const PILARES = [
  { key: 'agua', label: 'Hidratação', icon: Droplets, cor: '#3b82f6', meta: 3000, unidade: 'ml', desc: 'Água por dia' },
  { key: 'passos', label: 'Movimento', icon: Footprints, cor: '#10b981', meta: 8000, unidade: 'passos', desc: 'Passos diários' },
  { key: 'sono', label: 'Sono', icon: Moon, cor: '#8b5cf6', meta: 8, unidade: 'h', desc: 'Horas de sono' },
  { key: 'nutricao', label: 'Nutrição', icon: Apple, cor: '#f59e0b', meta: 5, unidade: '/5', desc: 'Qualidade das refeições' },
  { key: 'mentalidade', label: 'Mentalidade', icon: Brain, cor: '#ec4899', meta: 5, unidade: '/5', desc: 'Saúde mental' },
  { key: 'energia', label: 'Energia', icon: Zap, cor: '#f97316', meta: 5, unidade: '/5', desc: 'Nível de energia' },
];

interface RegistroDiario {
  agua_ml: number;
  passos: number;
  sono_horas: number;
  humor: number;
  nutricao?: number;
  mentalidade?: number;
  energia?: number;
}

export default function DashboardSaudePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [diasNaJornada, setDiasNaJornada] = useState(0);
  const [registro, setRegistro] = useState<RegistroDiario>({
    agua_ml: 0,
    passos: 0,
    sono_horas: 0,
    humor: 3,
    nutricao: 3,
    mentalidade: 3,
    energia: 3,
  });
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchDados();
  }, [user]);

  const fetchDados = async () => {
    setLoading(true);
    try {
      // Data de cadastro para calcular dias na jornada
      const { data: perfil } = await supabase
        .from('perfis')
        .select('criado_em')
        .eq('id', user?.id)
        .single();

      if (perfil) {
        const inicio = new Date(perfil.criado_em);
        const hoje = new Date();
        const diff = Math.floor((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
        setDiasNaJornada(Math.min(diff + 1, 90));
      }

      // Registro de hoje
      const hoje = new Date().toISOString().split('T')[0];
      const { data: regHoje } = await supabase
        .from('registros_diarios')
        .select('*')
        .eq('usuario_id', user?.id)
        .eq('data', hoje)
        .single();

      if (regHoje) {
        setRegistro({
          agua_ml: regHoje.agua_ml || 0,
          passos: regHoje.passos || 0,
          sono_horas: regHoje.sono_horas || 0,
          humor: regHoje.humor || 3,
          nutricao: regHoje.nota ? parseInt(regHoje.nota.split('|')[0] || '3') : 3,
          mentalidade: regHoje.nota ? parseInt(regHoje.nota.split('|')[1] || '3') : 3,
          energia: regHoje.nota ? parseInt(regHoje.nota.split('|')[2] || '3') : 3,
        });
      }

      // Últimos 7 dias
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
      const { data: hist } = await supabase
        .from('registros_diarios')
        .select('*')
        .eq('usuario_id', user?.id)
        .gte('data', seteDiasAtras.toISOString().split('T')[0])
        .order('data', { ascending: false });

      setHistorico(hist || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const salvarRegistro = async () => {
    setSalvando(true);
    const hoje = new Date().toISOString().split('T')[0];
    const notaExtra = `${registro.nutricao}|${registro.mentalidade}|${registro.energia}`;

    const { error } = await supabase
      .from('registros_diarios')
      .upsert({
        usuario_id: user?.id,
        data: hoje,
        agua_ml: registro.agua_ml,
        passos: registro.passos,
        sono_horas: registro.sono_horas,
        humor: registro.humor,
        nota: notaExtra,
      }, { onConflict: 'usuario_id,data' });

    setSalvando(false);
    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: '✅ Registro salvo com sucesso!' });
      fetchDados();
    }
  };

  const calcularScore = () => {
    const scores = [
      Math.min((registro.agua_ml / 3000) * 100, 100),
      Math.min((registro.passos / 8000) * 100, 100),
      Math.min((registro.sono_horas / 8) * 100, 100),
      ((registro.humor - 1) / 4) * 100,
      ((( registro.nutricao || 3) - 1) / 4) * 100,
      (((registro.mentalidade || 3) - 1) / 4) * 100,
      (((registro.energia || 3) - 1) / 4) * 100,
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const progressoJornada = Math.round((diasNaJornada / 90) * 100);
  const scoreHoje = calcularScore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard de Saúde</h2>
          <p className="text-muted-foreground">Sua jornada de transformação de 90 dias.</p>
        </div>
        <Button onClick={salvarRegistro} disabled={salvando} className="bg-primary hover:bg-primary/90 font-bold">
          {salvando ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Registro de Hoje
        </Button>
      </div>

      {/* Jornada de 90 dias */}
      <Card className="border-primary/30 bg-gradient-to-r from-card to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Jornada de 90 dias</p>
              <p className="text-2xl font-bold">
                Dia <span className="text-primary">{diasNaJornada}</span> de 90
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Score de hoje</p>
              <p className="text-3xl font-bold text-primary">{scoreHoje}%</p>
            </div>
          </div>
          <Progress value={progressoJornada} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">{progressoJornada}% da jornada concluída</p>
        </CardContent>
      </Card>

      {/* 6 Pilares */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" /> 6 Pilares da Saúde — Registro de Hoje
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Hidratação */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Droplets className="w-4 h-4 text-blue-400" /> Hidratação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-400">{registro.agua_ml} ml</span>
                <span className="text-xs text-muted-foreground">meta: 3000ml</span>
              </div>
              <Progress value={Math.min((registro.agua_ml / 3000) * 100, 100)} className="h-2" />
              <div className="flex gap-2">
                {[250, 500, 1000].map(v => (
                  <Button
                    key={v}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setRegistro(r => ({ ...r, agua_ml: Math.min(r.agua_ml + v, 5000) }))}
                  >
                    +{v >= 1000 ? '1L' : `${v}ml`}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                value={registro.agua_ml}
                onChange={e => setRegistro(r => ({ ...r, agua_ml: Number(e.target.value) }))}
                className="h-8 text-sm bg-background"
              />
            </CardContent>
          </Card>

          {/* Movimento */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Footprints className="w-4 h-4 text-green-400" /> Movimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-400">{registro.passos.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">meta: 8.000</span>
              </div>
              <Progress value={Math.min((registro.passos / 8000) * 100, 100)} className="h-2" />
              <Label className="text-xs text-muted-foreground">Passos</Label>
              <Input
                type="number"
                value={registro.passos}
                onChange={e => setRegistro(r => ({ ...r, passos: Number(e.target.value) }))}
                className="h-8 text-sm bg-background"
              />
            </CardContent>
          </Card>

          {/* Sono */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Moon className="w-4 h-4 text-purple-400" /> Sono
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-400">{registro.sono_horas}h</span>
                <span className="text-xs text-muted-foreground">meta: 8h</span>
              </div>
              <Progress value={Math.min((registro.sono_horas / 8) * 100, 100)} className="h-2" />
              <Slider
                min={0} max={12} step={0.5}
                value={[registro.sono_horas]}
                onValueChange={([v]) => setRegistro(r => ({ ...r, sono_horas: v }))}
              />
            </CardContent>
          </Card>

          {/* Nutrição */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Apple className="w-4 h-4 text-amber-400" /> Nutrição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Como foi sua alimentação hoje?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRegistro(r => ({ ...r, nutricao: n }))}
                    className={`flex-1 h-8 rounded text-sm font-bold transition-colors ${
                      (registro.nutricao || 3) >= n ? 'bg-amber-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >{n}</button>
                ))}
              </div>
              <Progress value={((registro.nutricao || 3) / 5) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Mentalidade */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-pink-400" /> Mentalidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Como está sua saúde mental?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRegistro(r => ({ ...r, mentalidade: n }))}
                    className={`flex-1 h-8 rounded text-sm font-bold transition-colors ${
                      (registro.mentalidade || 3) >= n ? 'bg-pink-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >{n}</button>
                ))}
              </div>
              <Progress value={((registro.mentalidade || 3) / 5) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Energia */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-orange-400" /> Energia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Seu nível de energia hoje?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRegistro(r => ({ ...r, energia: n }))}
                    className={`flex-1 h-8 rounded text-sm font-bold transition-colors ${
                      (registro.energia || 3) >= n ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >{n}</button>
                ))}
              </div>
              <Progress value={((registro.energia || 3) / 5) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Humor geral */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-yellow-400" /> Humor Geral
          </CardTitle>
          <CardDescription>Como você se sentiu hoje no geral?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { v: 1, emoji: '😢', label: 'Péssimo' },
              { v: 2, emoji: '😕', label: 'Ruim' },
              { v: 3, emoji: '😐', label: 'Ok' },
              { v: 4, emoji: '😊', label: 'Bem' },
              { v: 5, emoji: '😄', label: 'Ótimo' },
            ].map(({ v, emoji, label }) => (
              <button
                key={v}
                onClick={() => setRegistro(r => ({ ...r, humor: v }))}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                  registro.humor === v
                    ? 'border-primary bg-primary/10 scale-110'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico recente */}
      {historico.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" /> Últimos 7 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                const dataStr = d.toISOString().split('T')[0];
                const reg = historico.find(h => h.data === dataStr);
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                      reg ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/30 text-muted-foreground border border-border'
                    }`}>
                      {reg ? '✓' : '—'}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {d.toLocaleDateString('pt-BR', { weekday: 'narrow' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
