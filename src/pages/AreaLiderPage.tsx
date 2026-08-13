import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Users, DollarSign, Wallet, Share2, 
  Copy, Check, QrCode, Send, 
  Crown, Gift, Award, TrendingUp,
  RefreshCw, AlertCircle, CheckCircle,
  UserCircle, Mail, Phone, Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import MetasLider from '@/components/MetasLider';

export default function AreaLiderPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    total_indicacoes: 0,
    total_comissoes: 0,
    saldo_disponivel: 0
  });
  const [pixKey, setPixKey] = useState('');
  const [linkIndicacao, setLinkIndicacao] = useState('');
  const [indicados, setIndicados] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<{tipo: 'sucesso' | 'erro' | 'info', texto: string} | null>(null);
  const [isLider, setIsLider] = useState(false);

  useEffect(() => {
    if (user) {
      carregarDadosLider();
    }
  }, [user]);

  const carregarDadosLider = async () => {
    setLoading(true);
    try {
      // Verificar se o usuário é líder
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('role')
        .eq('id', user?.id)
        .maybeSingle();

      if (userError) {
        console.error('Erro ao buscar usuário:', userError);
        setLoading(false);
        return;
      }

      if (!userData || (userData.role !== 'lider' && userData.role !== 'admin')) {
        setIsLider(false);
        setLoading(false);
        return;
      }

      setIsLider(true);

      // Carregar dados do líder
      const { data: liderData, error: liderError } = await supabase
        .from('lideres')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (liderError) {
        console.error('Erro ao buscar líder:', liderError);
      }

      if (liderData) {
        setStats({
          total_indicacoes: liderData.total_indicacoes || 0,
          total_comissoes: liderData.total_comissoes || 0,
          saldo_disponivel: liderData.saldo_disponivel || 0
        });
      }

      // Carregar chave Pix
      const { data: perfilData, error: perfilError } = await supabase
        .from('perfis')
        .select('chave_pix, codigo_indicacao')
        .eq('id', user?.id)
        .maybeSingle();

      if (perfilError) {
        console.error('Erro ao buscar perfil:', perfilError);
      }

      if (perfilData?.chave_pix) {
        setPixKey(perfilData.chave_pix);
      }

      // Carregar indicados
      const { data: indicadosData, error: indicadosError } = await supabase
        .from('perfis')
        .select('nome, email, criado_em')
        .eq('lider_id', user?.id)
        .limit(10);

      if (indicadosError) {
        console.error('Erro ao buscar indicados:', indicadosError);
      }

      if (indicadosData) {
        setIndicados(indicadosData);
      }

      // Gerar link de indicação
      const codigo = perfilData?.codigo_indicacao || user?.id;
      const link = `https://viva-plus--viva369oficial.replit.app/registrar?ref=${codigo}`;
      setLinkIndicacao(link);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao carregar dados do líder' });
    } finally {
      setLoading(false);
    }
  };

  const salvarPixKey = async () => {
    if (!pixKey || pixKey.length < 3) {
      setMensagem({ tipo: 'erro', texto: 'Por favor, insira uma chave Pix válida' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('perfis')
        .update({ chave_pix: pixKey })
        .eq('id', user?.id);

      if (error) throw error;

      setMensagem({ tipo: 'sucesso', texto: '✅ Chave Pix salva com sucesso!' });
      setTimeout(() => setMensagem(null), 3000);
    } catch (error) {
      console.error('Erro ao salvar chave Pix:', error);
      setMensagem({ tipo: 'erro', texto: '❌ Erro ao salvar chave Pix. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(linkIndicacao);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const compartilharWhatsApp = () => {
    const mensagemTexto = `🚀 *VIVA369 - Desafio das Cores*\n\n`
      + `Olá! Estou fazendo parte do Desafio das Cores do VIVA369 e quero te convidar!\n\n`
      + `🎯 *Desafio:* Transformação em 30, 60 e 90 dias\n`
      + `💚 *Benefícios:* Saúde, bem-estar e comunidade\n\n`
      + `🔗 *Link para participar:* ${linkIndicacao}\n\n`
      + `Vamos juntos nessa jornada de transformação! 💪`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagemTexto)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-emerald-400" />
          <p className="text-slate-400">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!isLider) {
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 p-6">
          <div className="relative">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="h-6 w-6" />
              Área exclusiva para líderes
            </h1>
            <p className="text-white/80 text-sm">Seja um líder e transforme vidas</p>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-amber-500/10">
                <Crown className="h-12 w-12 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Área Restrita a Líderes</h3>
              <p className="text-slate-400 max-w-md">
                Sua conta ainda não possui um cadastro de líder ativo no VIVA369.
                Quando seu perfil for habilitado como líder, seu código de indicação,
                comissões e chave Pix aparecerão aqui.
              </p>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 text-white gap-2"
                onClick={() => window.open('https://wa.me/557598125249', '_blank')}
              >
                <Send className="h-4 w-4" />
                Falar com o Administrador
              </Button>
            </div>
          </CardContent>
        </Card>

        <MetasLider />
      </div>
    );
  }

  // Renderizar usando objetos de forma segura
  const userEmail = user?.email || 'Email não disponível';
  const userName = user?.user_metadata?.nome || 'Usuário';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 p-6">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="h-6 w-6" />
              Área do Líder
            </h1>
            <p className="text-white/80 text-sm">Seu painel de indicações e comissões</p>
          </div>
          <Badge className="bg-white/20 text-white border-0 px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Nível: {stats.total_indicacoes >= 50 ? 'Mestre' : 
                   stats.total_indicacoes >= 30 ? 'Líder' :
                   stats.total_indicacoes >= 15 ? 'Premium' : 'Afiliado'}
          </Badge>
        </div>
      </div>

      {/* Mensagem */}
      {mensagem && (
        <Alert className={cn(
          mensagem.tipo === 'sucesso' ? 'bg-emerald-500/10 border-emerald-500/30' :
          mensagem.tipo === 'erro' ? 'bg-red-500/10 border-red-500/30' :
          'bg-blue-500/10 border-blue-500/30'
        )}>
          <AlertDescription className={cn(
            mensagem.tipo === 'sucesso' ? 'text-emerald-400' :
            mensagem.tipo === 'erro' ? 'text-red-400' :
            'text-blue-400'
          )}>
            {mensagem.texto}
          </AlertDescription>
        </Alert>
      )}

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total_indicacoes}</p>
                <p className="text-sm text-slate-400">Total de Indicações</p>
                <p className="text-xs text-slate-500">Pessoas cadastradas pelo seu link</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">
                  R$ {stats.total_comissoes.toFixed(2)}
                </p>
                <p className="text-sm text-slate-400">Comissões Geradas</p>
                <p className="text-xs text-slate-500">R$ 125 por indicação confirmada</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-400">
                  R$ {stats.saldo_disponivel.toFixed(2)}
                </p>
                <p className="text-sm text-slate-400">Saldo Disponível</p>
                <p className="text-xs text-slate-500">Aguardando saque via Pix</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Progresso para Próximo Nível</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Meta: 15 indicações</span>
              <span className="text-emerald-400">{stats.total_indicacoes} / 15</span>
            </div>
            <Progress value={Math.min((stats.total_indicacoes / 15) * 100, 100)} className="h-2" />
            <p className="text-xs text-slate-500 mt-2">
              {stats.total_indicacoes < 15 ? 
                `Faltam ${15 - stats.total_indicacoes} indicações para atingir o nível Premium` :
                '🎉 Parabéns! Você já é Premium!'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Link Exclusivo */}
      <Card className="bg-slate-800 border-emerald-500/20 border-2">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Share2 className="h-5 w-5 text-emerald-400" />
            Seu Link Exclusivo
          </CardTitle>
          <CardDescription className="text-slate-400">
            Compartilhe este link. Toda venda feita por ele gera R$ 125,00 para você.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input 
              value={linkIndicacao}
              readOnly
              className="bg-slate-700/50 border-slate-600 text-white flex-1"
            />
            <Button 
              variant="outline" 
              size="icon"
              className="border-slate-600 hover:border-emerald-500"
              onClick={copiarLink}
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button className="bg-green-500 hover:bg-green-600 gap-2" onClick={compartilharWhatsApp}>
              <Send className="h-4 w-4" />
              Compartilhar no WhatsApp
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white gap-2" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkIndicacao)}`, '_blank')}>
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chave Pix */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <QrCode className="h-5 w-5 text-emerald-400" />
            Chave Pix para Recebimento
          </CardTitle>
          <CardDescription className="text-slate-400">
            Cadastre sua chave Pix para receber suas comissões
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-slate-400">Chave Pix (CPF, e-mail, telefone ou aleatória)</Label>
            <div className="flex gap-2 mt-1">
              <Input 
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="Ex: 71999999999 ou seu@email.com"
                className="bg-slate-700 border-slate-600 text-white flex-1"
              />
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600"
                onClick={salvarPixKey}
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar Chave Pix'}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {pixKey ? '✅ Chave Pix cadastrada' : '⚠️ Nenhuma chave Pix cadastrada'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Últimos Indicados */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-400" />
            Últimas Indicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {indicados.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-slate-600 mb-2" />
              <p className="text-slate-400 text-sm">Nenhuma indicação ainda</p>
              <p className="text-slate-500 text-xs">Compartilhe seu link e comece a indicar!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {indicados.map((indicado, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white text-sm">{indicado.nome || 'Anônimo'}</p>
                    <p className="text-xs text-slate-400">{indicado.email}</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {indicado.criado_em ? new Date(indicado.criado_em).toLocaleDateString('pt-BR') : 'Data desconhecida'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Metas do Líder */}
      <MetasLider />
    </div>
  );
}
