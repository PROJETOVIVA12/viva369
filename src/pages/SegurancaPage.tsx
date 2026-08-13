import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Loader2 } from 'lucide-react';

export default function SegurancaPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [passwords, setPasswords] = useState({ nova: '', confirma: '' });

  const handleUpdatePassword = async () => {
    if (passwords.nova.length < 6) {
      toast({ title: 'A senha deve ter no mínimo 6 caracteres', variant: 'destructive' });
      return;
    }
    if (passwords.nova !== passwords.confirma) {
      toast({ title: 'As senhas não conferem', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.nova });
      if (error) throw error;
      toast({ title: 'Senha atualizada com sucesso!' });
      setPasswords({ nova: '', confirma: '' });
    } catch (e: any) {
      toast({ title: 'Erro ao atualizar senha', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Segurança</h2>
        <p className="text-muted-foreground">Proteja sua conta alterando sua senha regularmente.</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Alterar Senha
          </CardTitle>
          <CardDescription>Digite a nova senha para sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nova Senha</Label>
            <Input type="password" value={passwords.nova} onChange={e => setPasswords({...passwords, nova: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Confirmar Nova Senha</Label>
            <Input type="password" value={passwords.confirma} onChange={e => setPasswords({...passwords, confirma: e.target.value})} />
          </div>
          <Button onClick={handleUpdatePassword} disabled={saving || !passwords.nova} className="mt-4">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Atualizar Senha
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
