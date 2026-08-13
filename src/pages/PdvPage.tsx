import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingCart, Plus, Minus, Trash2, 
  CreditCard, Loader2, Award, Package,
  Zap, Heart, Shield, Sparkles, Star,
  TrendingUp, Gift, Crown
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  comissao: number;
  categoria: string;
  badge: string;
  imagem_url: string;
  ativo: boolean;
}

interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

export default function PdvPage() {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [clienteNome, setClienteNome] = useState('');
  const [showPagamento, setShowPagamento] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [salvando, setSalvando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true)
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setProdutos(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => {
      const existente = prev.find(item => item.produto.id === produto.id);
      if (existente) {
        return prev.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: string) => {
    setCarrinho(prev => {
      const existente = prev.find(item => item.produto.id === produtoId);
      if (existente && existente.quantidade > 1) {
        return prev.map(item =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        );
      }
      return prev.filter(item => item.produto.id !== produtoId);
    });
  };

  const removerItemCompleto = (produtoId: string) => {
    setCarrinho(prev => prev.filter(item => item.produto.id !== produtoId));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  };

  const calcularComissaoTotal = () => {
    return carrinho.reduce((total, item) => {
      const comissaoProduto = (item.produto.preco * item.produto.comissao) / 100;
      return total + (comissaoProduto * item.quantidade);
    }, 0);
  };

  const finalizarPedido = async () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    setShowPagamento(true);
  };

  const confirmarPagamento = async () => {
    setSalvando(true);
    setError(null);

    try {
      const total = calcularTotal();
      const comissao = calcularComissaoTotal();
      const plataforma = total - comissao;

      const { error: insertError } = await supabase
        .from('vendas')
        .insert({
          usuario_id: user?.id,
          cliente_nome: clienteNome || 'Anônimo',
          produtos: carrinho.map(item => ({
            id: item.produto.id,
            nome: item.produto.nome,
            preco: item.produto.preco,
            comissao: item.produto.comissao,
            quantidade: item.quantidade
          })),
          total: total,
          comissao_vendedor: comissao,
          comissao_plataforma: plataforma,
          metodo_pagamento: metodoPagamento,
          status: 'concluida'
        });

      if (insertError) throw insertError;

      alert(`✅ Pedido finalizado com sucesso!\n\nTotal: R$ ${total.toFixed(2)}\nSua comissão: R$ ${comissao.toFixed(2)}`);
      
      setCarrinho([]);
      setClienteNome('');
      setShowPagamento(false);
      
    } catch (err: any) {
      console.error('Erro ao finalizar pedido:', err);
      setError(`Erro ao processar pagamento: ${err.message || 'Tente novamente.'}`);
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-6">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              PDV VIVA369
            </h1>
            <p className="text-white/80 text-sm">Venda produtos de saúde e bem-estar</p>
          </div>
          <Badge className="bg-white/20 text-white border-0 px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            {produtos.length} produtos disponíveis
          </Badge>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lista de Produtos */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Produtos VIVA369</h2>
          {produtos.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700">
              <Package className="h-12 w-12 mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400">Nenhum produto disponível</p>
              <p className="text-xs text-slate-500">Peça ao administrador para cadastrar produtos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {produtos.map((produto) => {
                const noCarrinho = carrinho.find(item => item.produto.id === produto.id);
                return (
                  <Card key={produto.id} className="bg-slate-800 border-slate-700 hover:border-emerald-500/30 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-slate-600">
                            {produto.imagem_url ? (
                              <AvatarImage src={produto.imagem_url} />
                            ) : (
                              <AvatarFallback className="bg-slate-700/50 text-slate-400">
                                <Package className="h-4 w-4" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <CardTitle className="text-white text-sm">{produto.nome}</CardTitle>
                            <p className="text-xs text-slate-400">{produto.categoria}</p>
                          </div>
                        </div>
                        {produto.badge && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
                            {produto.badge}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-xs text-slate-400 line-clamp-2">{produto.descricao}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-emerald-400">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-500">
                          Comissão: {produto.comissao}%
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {noCarrinho ? (
                        <div className="flex items-center gap-2 w-full">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-slate-600 text-slate-400"
                            onClick={() => removerDoCarrinho(produto.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">
                            {noCarrinho.quantidade}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-slate-600 text-slate-400"
                            onClick={() => adicionarAoCarrinho(produto)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className="w-full bg-emerald-500 hover:bg-emerald-600 gap-2"
                          onClick={() => adicionarAoCarrinho(produto)}
                        >
                          <Plus className="h-4 w-4" />
                          Adicionar
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Carrinho */}
        <div className="space-y-4">
          <Card className="bg-slate-800 border-slate-700 sticky top-4">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-400" />
                Carrinho
                {carrinho.length > 0 && (
                  <Badge className="bg-emerald-500 text-white ml-2">
                    {carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
              {carrinho.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-slate-600 mb-2" />
                  <p className="text-slate-400 text-sm">Seu carrinho está vazio</p>
                </div>
              ) : (
                carrinho.map((item) => (
                  <div key={item.produto.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30">
                    <div className="flex-1">
                      <p className="text-sm text-white">{item.produto.nome}</p>
                      <p className="text-xs text-slate-400">
                        {item.quantidade}x R$ {item.produto.preco.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                        onClick={() => removerDoCarrinho(item.produto.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-white text-sm w-6 text-center">{item.quantidade}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                        onClick={() => adicionarAoCarrinho(item.produto)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                        onClick={() => removerItemCompleto(item.produto.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
            <CardFooter className="border-t border-slate-700 pt-4 flex-col gap-3">
              {carrinho.length > 0 && (
                <>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-slate-400 text-sm">Subtotal:</span>
                    <span className="text-white font-bold">R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between w-full text-xs">
                    <span className="text-slate-500">Sua comissão:</span>
                    <span className="text-emerald-400">R$ {calcularComissaoTotal().toFixed(2)}</span>
                  </div>
                  <div className="w-full">
                    <Label className="text-slate-400 text-xs">Nome do Cliente</Label>
                    <Input
                      value={clienteNome}
                      onChange={(e) => setClienteNome(e.target.value)}
                      placeholder="Opcional"
                      className="bg-slate-700 border-slate-600 text-white text-sm mt-1"
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:opacity-90 text-white gap-2"
                    onClick={finalizarPedido}
                    disabled={carrinho.length === 0}
                  >
                    <CreditCard className="h-4 w-4" />
                    Finalizar Pedido
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Modal de Pagamento */}
      <Dialog open={showPagamento} onOpenChange={setShowPagamento}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Finalizar Pagamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-slate-700/30 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total:</span>
                <span className="text-white font-bold">R$ {calcularTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Sua comissão:</span>
                <span className="text-emerald-400">R$ {calcularComissaoTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <Label className="text-slate-400">Método de Pagamento</Label>
              <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="credito">Cartão de Crédito</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {metodoPagamento === 'pix' && (
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <p className="text-xs text-slate-400 mb-2">QR Code PIX</p>
                <div className="bg-white p-2 rounded-lg inline-block">
                  <div className="w-32 h-32 bg-slate-200 rounded flex items-center justify-center text-slate-400 text-xs">
                    QR CODE
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Chave PIX: viva369@pagamento.com</p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPagamento(false)} className="border-slate-600 text-slate-400">
              Cancelar
            </Button>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={confirmarPagamento}
              disabled={salvando}
            >
              {salvando ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar Pagamento'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
