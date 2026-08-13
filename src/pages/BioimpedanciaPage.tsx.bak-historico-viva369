import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Scale, Activity, Droplet, Heart, Zap, Brain, Target,
  Calendar, TrendingUp, Award, User, Clock,
  Camera, QrCode, Share2,
  Loader2, Plus, Edit, Trash2,
  Upload, X, UserCircle
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Anamnese from '@/components/Anamnese';
import QRCodeModal from '@/components/QRCodeModal';

interface AvaliacaoBio {
  id: string;
  usuario_id: string;
  data_avaliacao: string;
  peso: number;
  altura: number;
  percentual_gordura: number;
  massa_muscular: number;
  massa_gordura: number;
  agua_corporal: number;
  metabolismo_basal: number;
  imc: number;
  idade_metabolica: number;
  percentual_osso: number;
  viscerais: number;
  observacoes?: string;
  foto_url?: string;
  criado_em: string;
  token_acesso?: string;
}

export default function BioimpedanciaPage() {
  const { user } = useAuth();
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoBio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [editando, setEditando] = useState<AvaliacaoBio | null>(null);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<AvaliacaoBio | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    data_avaliacao: new Date().toISOString().split('T')[0],
    peso: '',
    altura: '',
    percentual_gordura: '',
    massa_muscular: '',
    viscerais: '',
    observacoes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mensagemUpload, setMensagemUpload] = useState('');

  useEffect(() => {
    if (user) {
      carregarAvaliacoes();
    }
  }, [user]);

  const carregarAvaliacoes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bioimpedancia')
        .select('*')
        .eq('user_id', user?.id)
        .order('data_avaliacao', { ascending: false });

      if (error) throw error;
      setAvaliacoes(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        setError('A foto deve ter no máximo 5MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setError('Formato de imagem não suportado. Use JPG ou PNG.');
        return;
      }
      
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
      setMensagemUpload('📸 Foto selecionada: ' + file.name);
    }
  };

  const removerFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    setMensagemUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFoto = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `bio_${user?.id}_${Date.now()}.${fileExt}`;
      
      setUploadProgress(30);
      
      const { data, error } = await supabase.storage
        .from('biofotos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Erro no upload:', error);
        setError('Erro ao fazer upload: ' + error.message);
        return null;
      }

      setUploadProgress(80);

      const { data: urlData } = supabase.storage
        .from('biofotos')
        .getPublicUrl(fileName);

      setUploadProgress(100);
      return urlData.publicUrl;
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      setError('Erro ao fazer upload: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setError(null);
    setSuccess(false);

    try {
      const peso = parseFloat(formData.peso);
      const altura = parseFloat(formData.altura);
      const gordura = parseFloat(formData.percentual_gordura);

      if (!peso || !altura || !gordura) {
        setError('Preencha Peso, Altura e % Gordura');
        setSalvando(false);
        return;
      }

      let fotoUrl = null;
      if (fotoFile) {
        setMensagemUpload('📤 Enviando foto...');
        fotoUrl = await uploadFoto(fotoFile);
        if (!fotoUrl) {
          setError('Erro ao fazer upload da foto. Tente novamente.');
          setSalvando(false);
          return;
        }
        setMensagemUpload('✅ Foto enviada com sucesso!');
      }

      const imc = peso / ((altura / 100) ** 2);
      const massa_muscular = parseFloat(formData.massa_muscular) || 0;
      const viscerais = parseInt(formData.viscerais) || 0;
      const massa_gordura = (peso * gordura) / 100;
      const agua_corporal = (peso - massa_gordura - massa_muscular) * 0.7;
      const metabolismo_basal = (10 * peso) + (6.25 * altura) - (5 * 30) + 5;
      const idade_metabolica = 30 + (gordura - 20) * 0.5;
      const percentual_osso = (peso * 0.15) * 100 / peso;
      const token = `VIVA-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();

      const dadosParaSalvar = {
        user_id: user?.id,
        data_avaliacao: formData.data_avaliacao,
        peso,
        altura,
        percentual_gordura: gordura,
        massa_muscular,
        massa_gordura,
        agua_corporal,
        metabolismo_basal,
        imc,
        idade_metabolica,
        percentual_osso,
        viscerais,
        observacoes: formData.observacoes || '',
        foto_url: fotoUrl,
        token_acesso: token
      };

      let result;
      if (editando) {
        result = await supabase
          .from('bioimpedancia')
          .update(dadosParaSalvar)
          .eq('id', editando.id);
      } else {
        result = await supabase
          .from('bioimpedancia')
          .insert([dadosParaSalvar]);
      }

      if (result.error) throw result.error;

      setSuccess(true);
      setShowForm(false);
      setEditando(null);
      resetForm();
      carregarAvaliacoes();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      setError(err.message || 'Erro ao salvar avaliação');
    } finally {
      setSalvando(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setFormData({
      data_avaliacao: new Date().toISOString().split('T')[0],
      peso: '',
      altura: '',
      percentual_gordura: '',
      massa_muscular: '',
      viscerais: '',
      observacoes: '',
    });
    setFotoFile(null);
    setFotoPreview(null);
    setMensagemUpload('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (avaliacao: AvaliacaoBio) => {
    setEditando(avaliacao);
    setFormData({
      data_avaliacao: avaliacao.data_avaliacao.split('T')[0],
      peso: avaliacao.peso.toString(),
      altura: avaliacao.altura.toString(),
      percentual_gordura: avaliacao.percentual_gordura.toString(),
      massa_muscular: avaliacao.massa_muscular?.toString() || '',
      viscerais: avaliacao.viscerais?.toString() || '',
      observacoes: avaliacao.observacoes || '',
    });
    if (avaliacao.foto_url) {
      setFotoPreview(avaliacao.foto_url);
      setMensagemUpload('📸 Foto existente');
    }
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;
    try {
      const { error } = await supabase
        .from('bioimpedancia')
        .delete()
        .eq('id', id);
      if (error) throw error;
      carregarAvaliacoes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleQRCode = (avaliacao: AvaliacaoBio) => {
    setAvaliacaoSelecionada(avaliacao);
    setShowQRCode(true);
  };

  const handleCompartilhar = async (avaliacao: AvaliacaoBio) => {
    const url = `${window.location.origin}/publico/${avaliacao.token_acesso || avaliacao.id}`;
    const mensagem = `🌟 *VIVA369 - Avaliação Física*\n\n🔗 ${url}\n\n💚 VIVA369 - Sua jornada de saúde`;
    
    try {
      if (navigator.share) {
        await navigator.share({ title: 'VIVA369 - Avaliação Física', text: 'Acesse sua avaliação', url });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  const getUltimaAvaliacao = () => {
    if (avaliacoes.length === 0) return null;
    return avaliacoes[0];
  };

  const ultima = getUltimaAvaliacao();

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Bioimpedância</h1>
          <p className="text-slate-400">Acompanhe sua evolução corporal</p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white"
          onClick={() => { setEditando(null); resetForm(); setShowForm(true); }}
        >
          <Plus className="h-4 w-4" />
          Nova Avaliação
        </Button>
      </div>

      {/* Mensagens */}
      {error && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="bg-emerald-500/10 border-emerald-500/30">
          <AlertDescription className="text-emerald-400">✅ Avaliação salva com sucesso!</AlertDescription>
        </Alert>
      )}

      {/* Última Avaliação */}
      {ultima && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-emerald-500/30">
                  {ultima.foto_url ? (
                    <AvatarImage src={ultima.foto_url} alt="Foto" />
                  ) : (
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-lg">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-400" />
                    Última Avaliação
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {new Date(ultima.data_avaliacao).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <Calendar className="h-3 w-3 mr-1" />
                  {avaliacoes.length} avaliações
                </Badge>
                <Anamnese avaliacaoId={ultima.id} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Peso" value={ultima.peso} unit="kg" icon={Scale} color="text-blue-400" />
              <MetricCard label="% Gordura" value={ultima.percentual_gordura} unit="%" icon={Droplet} color="text-orange-400" />
              <MetricCard label="Massa Muscular" value={ultima.massa_muscular} unit="kg" icon={Activity} color="text-emerald-400" />
              <MetricCard label="IMC" value={ultima.imc} unit="" icon={Target} color="text-purple-400" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <MetricCard label="Gordura Visceral" value={ultima.viscerais} unit="" icon={Heart} color="text-red-400" />
              <MetricCard label="Metabolismo" value={ultima.metabolismo_basal} unit="kcal" icon={Zap} color="text-yellow-400" />
              <MetricCard label="Idade Corporal" value={ultima.idade_metabolica} unit="anos" icon={Brain} color="text-indigo-400" />
              <MetricCard label="Água Corporal" value={ultima.agua_corporal} unit="%" icon={Droplet} color="text-cyan-400" />
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700 pt-4 flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:text-white" onClick={() => handleEdit(ultima)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:text-white gap-2" onClick={() => handleQRCode(ultima)}>
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:text-white gap-2" onClick={() => handleCompartilhar(ultima)}>
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Histórico */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          {avaliacoes.length === 0 ? (
            <div className="text-center py-12">
              <Scale className="h-12 w-12 mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400">Nenhuma avaliação registrada.</p>
              <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white gap-2" onClick={() => { setEditando(null); resetForm(); setShowForm(true); }}>
                <Plus className="h-4 w-4" />
                Criar Primeira Avaliação
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-slate-600">
                      {avaliacao.foto_url ? (
                        <AvatarImage src={avaliacao.foto_url} />
                      ) : (
                        <AvatarFallback className="bg-slate-600/50 text-slate-400">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">
                        {new Date(avaliacao.data_avaliacao).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-slate-400">
                        {avaliacao.peso} kg • {avaliacao.percentual_gordura}% gordura
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={() => handleEdit(avaliacao)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400" onClick={() => handleDelete(avaliacao.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog - Nova/Editar Avaliação */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editando ? 'Editar Avaliação' : 'Nova Avaliação'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Preencha os dados da sua bioimpedância e adicione uma foto
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {/* Upload de Foto */}
              <div className="md:col-span-2">
                <Label className="text-slate-400">📸 Foto do Cliente</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-dashed border-slate-600">
                      {fotoPreview ? (
                        <AvatarImage src={fotoPreview} alt="Preview" />
                      ) : (
                        <AvatarFallback className="bg-slate-700/50 text-slate-500">
                          <Camera className="h-8 w-8" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {fotoPreview && (
                      <button
                        type="button"
                        onClick={removerFoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoUpload}
                      className="hidden"
                      id="foto-upload"
                      ref={fileInputRef}
                    />
                    <label htmlFor="foto-upload">
                      <Button type="button" variant="outline" className="border-slate-600 text-slate-400 hover:text-white gap-2">
                        <Upload className="h-4 w-4" />
                        {fotoPreview ? 'Trocar Foto' : 'Adicionar Foto'}
                      </Button>
                    </label>
                    <p className="text-xs text-slate-500 mt-1">Formatos: JPG, PNG • Tamanho máximo: 5MB</p>
                    {mensagemUpload && <p className="text-xs text-emerald-400 mt-1">{mensagemUpload}</p>}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-slate-400">Data</Label>
                <Input type="date" value={formData.data_avaliacao} onChange={(e) => setFormData({ ...formData, data_avaliacao: e.target.value })} className="bg-slate-700 border-slate-600 text-white" required />
              </div>
              <div>
                <Label className="text-slate-400">Peso (kg) *</Label>
                <Input type="number" step="0.1" value={formData.peso} onChange={(e) => setFormData({ ...formData, peso: e.target.value })} placeholder="Ex: 75.5" className="bg-slate-700 border-slate-600 text-white" required />
              </div>
              <div>
                <Label className="text-slate-400">Altura (cm) *</Label>
                <Input type="number" step="0.1" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} placeholder="Ex: 170" className="bg-slate-700 border-slate-600 text-white" required />
              </div>
              <div>
                <Label className="text-slate-400">% Gordura *</Label>
                <Input type="number" step="0.1" value={formData.percentual_gordura} onChange={(e) => setFormData({ ...formData, percentual_gordura: e.target.value })} placeholder="Ex: 25.3" className="bg-slate-700 border-slate-600 text-white" required />
              </div>
              <div>
                <Label className="text-slate-400">Massa Muscular (kg)</Label>
                <Input type="number" step="0.1" value={formData.massa_muscular} onChange={(e) => setFormData({ ...formData, massa_muscular: e.target.value })} placeholder="Ex: 35.2" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <Label className="text-slate-400">Gordura Visceral</Label>
                <Input type="number" value={formData.viscerais} onChange={(e) => setFormData({ ...formData, viscerais: e.target.value })} placeholder="Ex: 8" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-slate-400">Observações</Label>
                <Textarea value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Como você está se sentindo?" className="bg-slate-700 border-slate-600 text-white" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditando(null); }} className="border-slate-600 text-slate-400">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white" disabled={salvando}>
                {salvando ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {salvando ? 'Salvando...' : (editando ? 'Atualizar' : 'Salvar')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      {avaliacaoSelecionada && (
        <QRCodeModal open={showQRCode} onOpenChange={setShowQRCode} data={avaliacaoSelecionada} title="QR Code da Avaliação" />
      )}
    </div>
  );
}

function MetricCard({ label, value, unit, icon: Icon, color }: any) {
  if (value === null || value === undefined) return null;
  return (
    <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={cn("h-4 w-4", color || "text-emerald-400")} />
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-xl font-bold text-white">{typeof value === 'number' ? value.toFixed(1) : value}</span>
        {unit && <span className="text-sm text-slate-400 mb-0.5">{unit}</span>}
      </div>
    </div>
  );
}
