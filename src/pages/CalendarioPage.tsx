import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CalendarioPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPedidos() {
      const { data } = await supabase.from('pedidos').select('id, numero_pedido, cliente_nome, status, criado_em, total').order('criado_em', { ascending: false });
      if (data) setPedidos(data);
      setLoading(false);
    }
    fetchPedidos();
  }, []);

  const getPedidosPorData = (date: Date) => {
    const dStr = format(date, 'yyyy-MM-dd');
    return pedidos.filter(p => p.criado_em.startsWith(dStr));
  };

  const pedidosDoDia = selectedDate ? getPedidosPorData(selectedDate) : [];

  const daysWithOrders = pedidos.map(p => new Date(p.criado_em));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calendário</h2>
        <p className="text-muted-foreground">Acompanhe os pedidos por dia.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Card className="border-border bg-card shadow-sm w-full md:w-auto shrink-0">
          <CardContent className="p-4 flex justify-center">
            <style>{`
              .rdp { --rdp-cell-size: 40px; --rdp-accent-color: hsl(var(--primary)); --rdp-background-color: hsl(var(--primary)/0.2); margin: 0; }
              .rdp-day_selected { font-weight: bold; }
            `}</style>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              modifiers={{ hasOrder: daysWithOrders }}
              modifiersStyles={{ hasOrder: { borderBottom: '2px solid hsl(var(--primary))' } }}
              className="text-foreground"
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-card flex-1 min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>
              {selectedDate ? `Pedidos de ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}` : 'Selecione uma data'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[400px]">
              {loading ? (
                <div className="p-6 text-center text-muted-foreground">Carregando...</div>
              ) : pedidosDoDia.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground">Nenhum pedido registrado nesta data.</div>
              ) : (
                <div className="divide-y divide-border">
                  {pedidosDoDia.map(p => (
                    <div key={p.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-lg text-primary">#{p.numero_pedido}</div>
                        <Badge variant={p.status === 'cancelado' ? 'destructive' : p.status === 'entregue' ? 'default' : 'secondary'}>
                          {p.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{p.cliente_nome}</span>
                        <span className="font-bold text-foreground">R$ {Number(p.total).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
