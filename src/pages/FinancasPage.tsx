import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  RefreshCw,
  ShieldAlert,
  Users,
} from 'lucide-react';

interface Pagamento {
  id: string;
  usuario_id: string | null;
  email: string;
  valor: number | string;
  status: string;
  metodo_pagamento: string | null;
  transacao_id: string | null;
  oferta_codigo: string;
  criado_em: string;
  data_pagamento: string | null;
  data_confirmacao: string | null;
}

type Mensagem = {
  tipo: 'sucesso' | 'erro' | 'info';
  texto: string;
} | null;

const formatarMoeda = (valor: number | string | null | undefined) => {
  const numero = Number(valor ?? 0);

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const formatarData = (valor: string | null | undefined) => {
  if (!valor) return '-';

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) {
    return '-';
  }

  return data.toLocaleString('pt-BR');
};

export default function FinancasPage() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [processandoId, setProcessandoId] = useState<string | null>(null);
  const [autorizado, setAutorizado] = useState<boolean | null>(null);
  const [mensagem, setMensagem] = useState<Mensagem>(null);

  const carregarPagamentos = useCallback(async (silencioso = false) => {
    if (!silencioso) {
      setLoading(true);
    } else {
      setAtualizando(true);
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setAutorizado(false);
        setPagamentos([]);
        return;
      }

      const { data: usuario, error: usuarioError } = await supabase
        .from('usuarios')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (usuarioError) {
        throw usuarioError;
      }

      if (usuario?.role !== 'admin') {
        setAutorizado(false);
        setPagamentos([]);
        return;
      }

      setAutorizado(true);

      const { data, error } = await supabase
        .from('pagamentos')
        .select(`
          id,
          usuario_id,
          email,
          valor,
          status,
          metodo_pagamento,
          transacao_id,
          oferta_codigo,
          criado_em,
          data_pagamento,
          data_confirmacao
        `)
        .eq('oferta_codigo', 'LANCAMENTO300')
        .order('criado_em', { ascending: false });

      if (error) {
        throw error;
      }

      setPagamentos((data ?? []) as Pagamento[]);
    } catch (erro: any) {
      console.error('Erro ao carregar finanças:', erro);

      setMensagem({
        tipo: 'erro',
        texto:
          erro?.message ||
          'Não foi possível carregar os pagamentos.',
      });
    } finally {
      setLoading(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    carregarPagamentos();
  }, [carregarPagamentos]);

  const pendentes = useMemo(
    () => pagamentos.filter((p) => p.status === 'pendente'),
    [pagamentos]
  );

  const aprovados = useMemo(
    () => pagamentos.filter((p) => p.status === 'aprovado'),
    [pagamentos]
  );

  const receitaAprovada = useMemo(
    () =>
      aprovados.reduce(
        (total, pagamento) => total + Number(pagamento.valor || 0),
        0
      ),
    [aprovados]
  );

  const valorPendente = useMemo(
    () =>
      pendentes.reduce(
        (total, pagamento) => total + Number(pagamento.valor || 0),
        0
      ),
    [pendentes]
  );

  const vagasOcupadas = aprovados.length;
  const vagasRestantes = Math.max(300 - vagasOcupadas, 0);

  const confirmarPagamento = async (pagamento: Pagamento) => {
    if (processandoId) return;

    const confirmar = window.confirm(
      [
        'CONFIRMAÇÃO DE PAGAMENTO VIVA369',
        '',
        `Cliente: ${pagamento.email}`,
        `Valor: ${formatarMoeda(pagamento.valor)}`,
        `Pagamento: ${pagamento.id}`,
        '',
        'Confirme SOMENTE se você verificou na Ton que o pagamento realmente foi recebido.',
        '',
        'Deseja liberar o acesso por 36 meses agora?',
      ].join('\n')
    );

    if (!confirmar) {
      return;
    }

    setProcessandoId(pagamento.id);
    setMensagem({
      tipo: 'info',
      texto: 'Confirmando pagamento e liberando acesso...',
    });

    try {
      const { data, error } = await supabase.rpc(
        'aprovar_pagamento_viva369',
        {
          p_pagamento_id: pagamento.id,
        }
      );

      if (error) {
        throw error;
      }

      const resultado = data as any;

      if (!resultado?.ok) {
        throw new Error(
          resultado?.mensagem ||
          'O pagamento não pôde ser aprovado.'
        );
      }

      setMensagem({
        tipo: 'sucesso',
        texto:
          `Pagamento de ${pagamento.email} confirmado. ` +
          'Acesso liberado por 36 meses.',
      });

      await carregarPagamentos(true);
    } catch (erro: any) {
      console.error('Erro ao aprovar pagamento:', erro);

      setMensagem({
        tipo: 'erro',
        texto:
          erro?.message ||
          'Não foi possível confirmar o pagamento.',
      });
    } finally {
      setProcessandoId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Carregando painel financeiro...
        </div>
      </div>
    );
  }

  if (autorizado === false) {
    return (
      <div className="space-y-6">
        <Card className="border-red-500/30 bg-card">
          <CardContent className="py-10 text-center">
            <ShieldAlert className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold">
              Área administrativa
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Você não possui permissão para acessar as finanças do VIVA369.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Finanças VIVA369
          </h1>
          <p className="text-muted-foreground">
            Pagamentos da oferta de lançamento — primeiros 300 participantes.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => carregarPagamentos(true)}
          disabled={atualizando || !!processandoId}
          className="gap-2"
        >
          {atualizando ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Atualizar
        </Button>
      </div>

      {mensagem && (
        <div
          className={[
            'rounded-lg border p-4 text-sm',
            mensagem.tipo === 'sucesso'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : mensagem.tipo === 'erro'
              ? 'border-red-500/30 bg-red-500/10 text-red-400'
              : 'border-blue-500/30 bg-blue-500/10 text-blue-400',
          ].join(' ')}
        >
          {mensagem.texto}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita confirmada
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatarMoeda(receitaAprovada)}
            </div>
            <p className="text-xs text-muted-foreground">
              Somente pagamentos aprovados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aguardando confirmação
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendentes.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatarMoeda(valorPendente)} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vagas ocupadas
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vagasOcupadas} / 300
            </div>
            <p className="text-xs text-muted-foreground">
              {vagasRestantes} vagas restantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagamentos aprovados
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {aprovados.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Oferta LANCAMENTO300
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Pagamentos aguardando confirmação
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Confirme somente depois de verificar o recebimento diretamente na Ton.
          </p>
        </CardHeader>

        <CardContent>
          {pendentes.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              <CheckCircle className="h-9 w-9 mx-auto mb-3 text-emerald-500" />
              Nenhum pagamento aguardando confirmação.
            </div>
          ) : (
            <div className="space-y-4">
              {pendentes.map((pagamento) => (
                <div
                  key={pagamento.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold">
                        {pagamento.email}
                      </p>

                      <p className="text-xl font-bold">
                        {formatarMoeda(pagamento.valor)}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Criado em: {formatarData(pagamento.criado_em)}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Método: {pagamento.metodo_pagamento || '-'}
                      </p>

                      <p className="text-xs text-muted-foreground break-all">
                        ID interno: {pagamento.id}
                      </p>

                      {pagamento.transacao_id && (
                        <p className="text-xs text-muted-foreground break-all">
                          Transação: {pagamento.transacao_id}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => confirmarPagamento(pagamento)}
                      disabled={!!processandoId}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {processandoId === pagamento.id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Confirmando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Confirmar pagamento
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Últimos pagamentos aprovados
          </CardTitle>
        </CardHeader>

        <CardContent>
          {aprovados.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">
              Ainda não existem pagamentos aprovados nesta oferta.
            </p>
          ) : (
            <div className="space-y-3">
              {aprovados.slice(0, 20).map((pagamento) => (
                <div
                  key={pagamento.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {pagamento.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Confirmado em:{' '}
                      {formatarData(
                        pagamento.data_confirmacao ||
                        pagamento.data_pagamento
                      )}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-bold text-emerald-500">
                      {formatarMoeda(pagamento.valor)}
                    </p>
                    <p className="text-xs text-emerald-500">
                      Aprovado
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
