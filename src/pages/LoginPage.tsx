import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600/10 via-slate-900 to-emerald-500/10 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-emerald-500/20 w-16 h-16 flex items-center justify-center">
            <LogIn className="h-8 w-8 text-emerald-400" />
          </div>
          <CardTitle className="text-2xl text-white">VIVA369</CardTitle>
          <CardDescription className="text-slate-400">
            Faça login para continuar sua jornada
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert className="mb-4 bg-red-500/10 border-red-500/30">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
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

            <div>
              <Label className="text-slate-400">Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div className="text-right">
              <Link to="/recuperar-senha" className="text-sm text-emerald-400 hover:underline">
                Esqueceu sua senha?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-center border-t border-slate-700 pt-4">
          <p className="text-sm text-slate-400">
            Não tem uma conta?{' '}
<Link to="/tour" className="text-sm text-emerald-400 hover:underline mt-2 block">
  👀 Conhecer o App
</Link>
            <Link to="/registrar" className="text-emerald-400 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
