import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserCircle, Loader2 } from 'lucide-react';

export default function PerfilPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ nome: '', telefone: '' });

  useEffect(() => {
    async function fetchPerfil() {
      if (user) {
        const { data } = await supabase.from('usuarios').select('nome, telefone').eq('id', user.id).single();
        if (data) {
          setFormData({ nome: data.nome || '', telefone: data.telefone || '' });
        }
      }
      setLoading(false);
    }
    fetchPerfil();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('usuarios').update({
        nome: formData.nome,
        telefone: formData.telefone
      }).eq('id', user?.id);

      if (error) throw error;
      toast({ title: 'Perfil atualizado com sucesso!' });
    } catch (e: any) {
      toast({ title: 'Erro ao atualizar', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Meu Perfil</h2>
        <p className="text-muted-foreground">Gerencie suas informações pessoais.</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-primary" /> Informações da Conta
          </CardTitle>
          <CardDescription>Atualize seu nome e telefone de contato.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input value={user?.email || ''} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
                <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado.</p>
              </div>
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
              </div>
              <Button onClick={handleSave} disabled={saving} className="mt-4">
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar Alterações
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
