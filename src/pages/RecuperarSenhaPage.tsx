import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nova-senha`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar email de recuperação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600/10 via-slate-900 to-emerald-500/10 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-emerald-500/20 w-16 h-16 flex items-center justify-center">
            <Mail className="h-8 w-8 text-emerald-400" />
          </div>
          <CardTitle className="text-2xl text-white">Recuperar Senha</CardTitle>
          <CardDescription className="text-slate-400">
            Digite seu email para receber o link de recuperação
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert className="mb-4 bg-red-500/10 border-red-500/30">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-emerald-500/10 border-emerald-500/30">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 inline" />
              <AlertDescription className="text-emerald-400">
                Email de recuperação enviado! Verifique sua caixa de entrada.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-400">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Enviar Link de Recuperação'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-center border-t border-slate-700 pt-4">
          <Link to="/login" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
            <ArrowLeft className="h-4 w-4 inline mr-2" />
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
