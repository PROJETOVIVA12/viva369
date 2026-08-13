import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/services/uploadService';
import {
  Package, Plus, Edit, Trash2, Upload, X,
  Loader2, CheckCircle, AlertCircle, Search,
  Filter, Grid, List, ArrowUp, ArrowDown,
  Image, Tag, DollarSign, Percent, ShoppingBag,
  Camera, Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function GestaoProdutosPage() {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editando, setEditando] = useState<any | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    comissao: '20',
    categoria: '',
    badge: ''
  });

  useEffect(() => {
    if (user) {
      carregarProdutos();
    }
  }, [user]);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('usuario_id', user?.id)
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setProdutos(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao carregar produtos' });
    } finally {
      setLoading(false);
    }
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMensagem({ tipo: 'erro', texto: 'A imagem deve ter no máximo 5MB' });
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setMensagem({ tipo: 'erro', texto: 'Formato inválido. Use JPG, PNG, WEBP ou GIF' });
      return;
    }

    setFotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setMensagem(null);
  };

  const removerImagem = () => {
    setFotoPreview(null);
    setFotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const salvarProduto = async () => {
    if (!user) {
      setMensagem({ tipo: 'erro', texto: 'Usuário não autenticado' });
      return;
    }

    if (!formData.nome.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Nome do produto é obrigatório' });
      return;
    }

    const preco = parseFloat(formData.preco.replace(',', '.'));
    if (isNaN(preco) || preco <= 0) {
      setMensagem({ tipo: 'erro', texto: 'Preço deve ser um valor válido maior que 0' });
      return;
    }

    const comissao = parseInt(formData.comissao);
    if (isNaN(comissao) || comissao < 0 || comissao > 100) {
      setMensagem({ tipo: 'erro', texto: 'Comissão deve ser entre 0 e 100' });
      return;
    }

    setSalvando(true);
    setMensagem(null);

    try {
      let imagem_url = editando?.imagem_url || null;

      if (fotoFile) {
        setUploadProgress(30);
        const { url, error: uploadError } = await uploadImage({
          bucket: 'produtos',
          folder: 'imagens',
          file: fotoFile,
          userId: user.id,
          fileName: formData.nome.toLowerCase().replace(/[^a-z0-9]/g, '-')
        });

        setUploadProgress(70);

        if (uploadError) {
          throw new Error(`Erro ao fazer upload da imagem: ${uploadError.message}`);
        }

        if (url) {
          imagem_url = url;
        }
        setUploadProgress(90);
      }

      const produtoData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim(),
        preco: preco,
        comissao: comissao,
        categoria: formData.categoria || null,
        badge: formData.badge || null,
        imagem_url: imagem_url,
        usuario_id: user.id,
        atualizado_em: new Date().toISOString()
      };

      let result;

      if (editando) {
        const { data, error } = await supabase
          .from('produtos')
          .update(produtoData)
          .eq('id', editando.id)
          .select()
          .single();

        if (error) throw error;
        result = data;
        setMensagem({ tipo: 'sucesso', texto: 'Produto atualizado com sucesso!' });
      } else {
        const { data, error } = await supabase
          .from('produtos')
          .insert({
            ...produtoData,
            criado_em: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        result = data;
        setMensagem({ tipo: 'sucesso', texto: 'Produto cadastrado com sucesso!' });
      }

      setUploadProgress(100);
      
      await carregarProdutos();
      
      setTimeout(() => {
        setShowDialog(false);
        resetForm();
        setMensagem(null);
      }, 2000);

    } catch (error: any) {
      console.error('Erro ao salvar produto:', error);
      setMensagem({ tipo: 'erro', texto: error.message || 'Erro ao salvar produto' });
      setUploadProgress(0);
    } finally {
      setSalvando(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      comissao: '20',
      categoria: '',
      badge: ''
    });
    setFotoPreview(null);
    setFotoFile(null);
    setEditando(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const editarProduto = (produto: any) => {
    setEditando(produto);
    setFormData({
      nome: produto.nome || '',
      descricao: produto.descricao || '',
      preco: produto.preco?.toString() || '',
      comissao: produto.comissao?.toString() || '20',
      categoria: produto.categoria || '',
      badge: produto.badge || ''
    });
    setFotoPreview(produto.imagem_url || null);
    setFotoFile(null);
    setShowDialog(true);
    setMensagem(null);
  };

  const excluirProduto = async (id: string, imagem_url?: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      if (imagem_url) {
        const { error: deleteError } = await deleteImage('produtos', imagem_url);
        if (deleteError) {
          console.warn('Erro ao deletar imagem:', deleteError);
        }
      }

      const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMensagem({ tipo: 'sucesso', texto: 'Produto excluído com sucesso!' });
      await carregarProdutos();
      
      setTimeout(() => setMensagem(null), 3000);
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error);
      setMensagem({ tipo: 'erro', texto: error.message || 'Erro ao excluir produto' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-400" />
            Gestão de Produtos
          </h1>
          <p className="text-slate-400">Cadastre e gerencie seus produtos com imagens</p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white hover:from-emerald-600 hover:to-amber-600"
          onClick={() => { resetForm(); setShowDialog(true); }}
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {mensagem && (
        <Alert className={cn(
          mensagem.tipo === 'sucesso' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        )}>
          <AlertDescription className="flex items-center gap-2">
            {mensagem.tipo === 'sucesso' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {mensagem.texto}
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        </div>
      ) : produtos.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-white text-lg font-medium">Nenhum produto cadastrado</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Cadastre seus produtos com imagens para vender no PDV VIVA369
            </p>
            <Button 
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
              onClick={() => { resetForm(); setShowDialog(true); }}
            >
              <Plus className="h-4 w-4" />
              Cadastrar Primeiro Produto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <Card key={produto.id} className="bg-slate-800 border-slate-700 hover:border-emerald-500/30 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-slate-600">
                      {produto.imagem_url ? (
                        <AvatarImage src={produto.imagem_url} className="object-cover" />
                      ) : (
                        <AvatarFallback className="bg-slate-700/50 text-slate-400">
                          <Package className="h-6 w-6" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-white text-sm">{produto.nome}</CardTitle>
                      <p className="text-xs text-slate-400">{produto.categoria || 'Sem categoria'}</p>
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
                <p className="text-xs text-slate-400 line-clamp-2">{produto.descricao || 'Sem descrição'}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-emerald-400">
                    R$ {produto.preco?.toFixed(2) || '0.00'}
                  </span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {produto.comissao || 0}% comissão
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-700 pt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-slate-600 text-slate-400 hover:text-white hover:border-emerald-500"
                  onClick={() => editarProduto(produto)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                  onClick={() => excluirProduto(produto.id, produto.imagem_url)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de Cadastro/Edição */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              {editando ? <Edit className="h-5 w-5 text-emerald-400" /> : <Plus className="h-5 w-5 text-emerald-400" />}
              {editando ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Preencha os dados do produto para {editando ? 'atualizar' : 'cadastrar'} no PDV
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Upload de Imagem */}
            <div className="space-y-2">
              <Label className="text-white">Imagem do Produto</Label>
              <div className="flex items-center gap-4">
                <div 
                  className={cn(
                    "relative w-24 h-24 rounded-lg border-2 border-dashed overflow-hidden",
                    fotoPreview ? "border-emerald-500/50" : "border-slate-600",
                    "hover:border-emerald-500/50 transition-colors"
                  )}
                >
                  {fotoPreview ? (
                    <>
                      <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        onClick={removerImagem}
                        className="absolute top-1 right-1 p-1 bg-red-500/90 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                      <Camera className="h-6 w-6" />
                      <span className="text-[10px] mt-1">Imagem</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                    className="hidden"
                    id="imagem-produto"
                  />
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:text-white hover:border-emerald-500"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {fotoPreview ? 'Trocar Imagem' : 'Adicionar Imagem'}
                  </Button>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Formatos: JPG, PNG, WEBP • Max: 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label className="text-white">Nome do Produto *</Label>
              <Input
                placeholder="Ex: Kit Premium VIVA369"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label className="text-white">Descrição</Label>
              <Textarea
                placeholder="Descreva seu produto..."
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 resize-none"
                rows={3}
              />
            </div>

            {/* Preço e Comissão */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Preço (R$) *</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Comissão (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="20"
                  value={formData.comissao}
                  onChange={(e) => setFormData({ ...formData, comissao: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                />
                <p className="text-[10px] text-slate-500">Quanto o vendedor ganha (1-100%)</p>
              </div>
            </div>

            {/* Categoria e Badge */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Categoria</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="kits">Kits</SelectItem>
                    <SelectItem value="suplementos">Suplementos</SelectItem>
                    <SelectItem value="roupas">Roupas</SelectItem>
                    <SelectItem value="acessorios">Acessórios</SelectItem>
                    <SelectItem value="ebooks">E-books</SelectItem>
                    <SelectItem value="cursos">Cursos</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Badge (opcional)</Label>
                <Select
                  value={formData.badge}
                  onValueChange={(value) => setFormData({ ...formData, badge: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="popular">🔥 Popular</SelectItem>
                    <SelectItem value="oferta">💎 Oferta</SelectItem>
                    <SelectItem value="premium">⭐ Premium</SelectItem>
                    <SelectItem value="novo">🆕 Novo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Progresso do Upload */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Enviando imagem...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => { setShowDialog(false); resetForm(); }}
              className="border-slate-600 text-slate-400 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white hover:from-emerald-600 hover:to-amber-600 gap-2"
              onClick={salvarProduto}
              disabled={salvando}
            >
              {salvando ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {editando ? 'Atualizar' : 'Cadastrar'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
