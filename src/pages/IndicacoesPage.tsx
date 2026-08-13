import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Users, Copy, Loader2, Send } from 'lucide-react';
import { DADOS_EMPRESA } from '@/config/empresa';

export default function IndicacoesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [indicados, setIndicados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSaving] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) fetchIndicacoes();
  }, [user]);

  const fetchIndicacoes = async () => {
    setLoading(true);
    const { data } = await supabase.from('indicacoes').select('*').eq('indicador_id', user?.id).order('criado_em', { ascending: false });
    if (data) setIndicados(data);
    setLoading(false);
  };

  const handleIndicar = async () => {
    if (!nome || !email) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from('indicacoes').insert([{
        indicador_id: user?.id,
        indicado_nome: nome,
        indicado_email: email,
        status: 'pendente'
      }]);
      if (error) throw error;
      toast({ title: 'Indicação enviada com sucesso!' });
      setNome('');
      setEmail('');
      fetchIndicacoes();
    } catch (e: any) {
      toast({ title: 'Erro ao indicar', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const linkIndicacao = `${window.location.origin}/registrar?ref=${user?.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(linkIndicacao);
    toast({ title: 'Link copiado!' });
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Olá! Quero te convidar para conhecer a ${DADOS_EMPRESA.nome}. Cadastre-se pelo meu link e aproveite: ${linkIndicacao}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Indicações</h2>
        <p className="text-muted-foreground">Indique amigos e ganhe recompensas.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Gift className="w-5 h-5" /> Nova Indicação
            </CardTitle>
            <CardDescription>Preencha os dados do seu amigo para enviar um convite exclusivo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Amigo</label>
              <Input placeholder="João da Silva" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail do Amigo</label>
              <Input type="email" placeholder="joao@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <Button onClick={handleIndicar} disabled={salvando} className="w-full">
              {salvando && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enviar Convite
            </Button>

            <div className="pt-6 border-t border-border mt-4">
              <label className="text-sm font-medium mb-2 block">Ou compartilhe seu link:</label>
              <div className="flex gap-2">
                <Input readOnly value={linkIndicacao} className="bg-muted" />
                <Button variant="outline" size="icon" onClick={copyLink}><Copy className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" onClick={shareWhatsApp} className="text-[#25D366] border-[#25D366] hover:bg-[#25D366]/10"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" /> Suas Indicações
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-10 text-muted-foreground">Carregando...</div>
            ) : indicados.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">Você ainda não fez nenhuma indicação.</div>
            ) : (
              <div className="space-y-3">
                {indicados.map(i => (
                  <div key={i.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                    <div>
                      <div className="font-semibold">{i.indicado_nome}</div>
                      <div className="text-xs text-muted-foreground">{i.indicado_email}</div>
                    </div>
                    <Badge variant={i.status === 'confirmado' ? 'default' : 'secondary'}>
                      {i.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
