import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Lock, Loader2 } from 'lucide-react';

const schema = z.object({
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }),
  confirmar: z.string(),
}).refine(d => d.password === d.confirmar, {
  message: 'As senhas não coincidem.',
  path: ['confirmar'],
});

export default function NovaSenhaPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmar: '' },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: values.password });
    setLoading(false);

    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Senha atualizada com sucesso!' });
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="bg-primary/20 p-4 rounded-full text-primary mb-4">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Nova Senha</h1>
          <p className="text-muted-foreground mt-2">Digite e confirme sua nova senha.</p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Redefinir Senha</CardTitle>
            <CardDescription>Escolha uma senha segura com pelo menos 6 caracteres.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} className="bg-background border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} className="bg-background border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Salvar Nova Senha
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
