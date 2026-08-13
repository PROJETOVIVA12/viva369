import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: string;
  criado_em: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientes() {
      const { data } = await supabase.from('usuarios').select('*').order('criado_em', { ascending: false });
      if (data) setClientes(data);
      setLoading(false);
    }
    fetchClientes();
  }, []);

  const clientesFiltrados = clientes.filter(c => 
    (c.nome?.toLowerCase() || '').includes(busca.toLowerCase()) || 
    (c.email?.toLowerCase() || '').includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">Gerencie os usuários cadastrados na plataforma.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome ou email..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Carregando clientes...</div>
          ) : (
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3 font-medium">Cliente</th>
                    <th className="px-6 py-3 font-medium">Contato</th>
                    <th className="px-6 py-3 font-medium">Tipo</th>
                    <th className="px-6 py-3 font-medium">Cadastro em</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {clientesFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                        Nenhum cliente encontrado.
                      </td>
                    </tr>
                  ) : (
                    clientesFiltrados.map(c => (
                      <tr key={c.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                              <UserCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{c.nome}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-foreground">{c.email}</span>
                            <span className="text-muted-foreground text-xs">{c.telefone || 'Sem telefone'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={c.role === 'admin' ? 'default' : 'secondary'}>
                            {c.role === 'admin' ? 'Administrador' : 'Cliente'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {c.criado_em ? format(new Date(c.criado_em), "dd 'de' MMM, yyyy", { locale: ptBR }) : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
