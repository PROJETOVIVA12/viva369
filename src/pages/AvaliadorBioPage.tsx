import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  User, Mail, Phone, Calendar, FileText,
  Save, Loader2, CheckCircle, AlertCircle,
  Users, Clipboard, Activity, Scale, QrCode,
  Camera, Image, Upload, X, Eye, Link2,
  Share2, Download, Printer, Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import QRCode from 'qrcode.react';

export default function AvaliadorBioPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [error, setError] = useState('');
  const [tokenGerado, setTokenGerado] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Formulário do cliente
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    genero: ''
  });

  // Dados da bioimpedância (OMRON HBF-514C)
  const [bioData, setBioData] = useState({
    altura: '',
    peso_total: '',
    imc: '',
    percentual_gordura: '',
    massa_muscular_esqueletica: '',
    massa_magra: '',
    massa_gorda: '',
    gordura_visceral: '',
    metabolismo_basal: '',
    idade_corporal: '',
    circunferencia_abdomen: '',
    circunferencia_cintura: '',
    circunferencia_quadril: '',
    observacoes_equipe: ''
  });

  // Foto do cliente
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removerFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSucesso(false);
    setShowQRCode(false);

    try {
      if (!cliente.nome || !cliente.email || !bioData.peso_total || !bioData.percentual_gordura) {
        setError('Preencha todos os campos obrigatórios');
        setLoading(false);
        return;
      }

      // 1. Buscar ou criar usuário
      let usuarioId = null;
      const { data: existingUser } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', cliente.email)
        .single();

      if (existingUser) {
        usuarioId = existingUser.id;
      } else {
        const { data: newUser, error: userError } = await supabase.auth.signUp({
          email: cliente.email,
          password: 'temp123456',
          options: {
            data: {
              nome: cliente.nome,
              role: 'cliente'
            }
          }
        });
        if (userError) throw userError;
        usuarioId = newUser.user?.id;
      }

      // 2. Upload da foto (se houver)
      let fotoUrl = null;
      if (fotoFile) {
        const fileExt = fotoFile.name.split('.').pop();
        const fileName = `cliente_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avaliacoes')
          .upload(fileName, fotoFile);
        
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('avaliacoes')
            .getPublicUrl(fileName);
          fotoUrl = urlData.publicUrl;
        }
      }

      // 3. Gerar token e salvar avaliação
      const token = `VIVA-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
      setTokenGerado(token);

      const { data: avaliacao, error: bioError } = await supabase
        .from('avaliacoes_bioimpedancia')
        .insert({
          usuario_id: usuarioId,
          token_acesso: token,
          data_avaliacao: new Date().toISOString().split('T')[0],
          genero: cliente.genero || null,
          altura: parseFloat(bioData.altura) || null,
          peso_total: parseFloat(bioData.peso_total) || null,
          imc: parseFloat(bioData.imc) || null,
          percentual_gordura: parseFloat(bioData.percentual_gordura) || null,
          massa_muscular_esqueletica: parseFloat(bioData.massa_muscular_esqueletica) || null,
          massa_magra: parseFloat(bioData.massa_magra) || null,
          massa_gorda: parseFloat(bioData.massa_gorda) || null,
          gordura_visceral: parseInt(bioData.gordura_visceral) || null,
          metabolismo_basal: parseInt(bioData.metabolismo_basal) || null,
          idade_corporal: parseInt(bioData.idade_corporal) || null,
          circunferencia_abdomen: parseFloat(bioData.circunferencia_abdomen) || null,
          circunferencia_cintura: parseFloat(bioData.circunferencia_cintura) || null,
          circunferencia_quadril: parseFloat(bioData.circunferencia_quadril) || null,
          foto_url: fotoUrl,
          avaliador_id: user?.id,
          observacoes_equipe: bioData.observacoes_equipe || null,
          expira_em: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (bioError) throw bioError;

      setSucesso(true);
      setShowQRCode(true);
      
      setCliente({ nome: '', email: '', telefone: '', data_nascimento: '', genero: '' });
      setBioData({
        altura: '', peso_total: '', imc: '', percentual_gordura: '', massa_muscular_esqueletica: '',
        massa_magra: '', massa_gorda: '', gordura_visceral: '', metabolismo_basal: '',
        idade_corporal: '', circunferencia_abdomen: '', circunferencia_cintura: '',
        circunferencia_quadril: '', observacoes_equipe: ''
      });
      setFotoFile(null);
      setFotoPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      setError(error.message || 'Erro ao salvar avaliação');
    } finally {
      setLoading(false);
    }
  };

  const compartilharAvaliacao = () => {
    const url = `${window.location.origin}/publico/${tokenGerado}`;
    const mensagem = `🌟 *VIVA369 - Avaliação Física*\n\n`
      + `Olá! Aqui está o resultado da sua avaliação física.\n\n`
      + `🔗 ${url}\n\n`
      + `💚 VIVA369 - Sua jornada de saúde`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-6">
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="h-6 w-6" />
              Avaliação Bioimpedância
            </h1>
            <p className="text-white/80 text-sm">Cadastre o cliente e realize a avaliação</p>
          </div>
          <Badge className="bg-white/20 text-white border-0">
            <Activity className="h-4 w-4 mr-2" />
            OMRON HBF-514C
          </Badge>
        </div>
      </div>

      {error && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      )}

      {sucesso && showQRCode && (
        <Card className="bg-emerald-500/10 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto md:mx-0 mb-4" />
                <h3 className="text-white text-lg font-medium">✅ Avaliação salva com sucesso!</h3>
                <p className="text-slate-400 text-sm">QR Code gerado para o cliente</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
                    onClick={() => window.open(`/publico/${tokenGerado}`, '_blank')}
                  >
                    <Globe className="h-4 w-4" />
                    Abrir Página Pública
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-slate-600 text-slate-400 hover:text-white gap-2"
                    onClick={compartilharAvaliacao}
                  >
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <QRCode 
                  value={`${window.location.origin}/publico/${tokenGerado}`}
                  size={120}
                  level="H"
                />
                <p className="text-xs text-slate-500 text-center mt-2">Válido por 90 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-400" />
              Dados do Cliente
            </CardTitle>
            <CardDescription className="text-slate-400">
              Informações do participante para cadastro
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-400">Nome Completo *</Label>
              <Input
                value={cliente.nome}
                onChange={(e) => setCliente({...cliente, nome: e.target.value})}
                placeholder="João da Silva"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-slate-400">Email *</Label>
              <Input
                type="email"
                value={cliente.email}
                onChange={(e) => setCliente({...cliente, email: e.target.value})}
                placeholder="joao@email.com"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-slate-400">Telefone</Label>
              <Input
                value={cliente.telefone}
                onChange={(e) => setCliente({...cliente, telefone: e.target.value})}
                placeholder="(11) 99999-9999"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">Data de Nascimento</Label>
              <Input
                type="date"
                value={cliente.data_nascimento}
                onChange={(e) => setCliente({...cliente, data_nascimento: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">Gênero / Sexo</Label>
              <Select 
                value={cliente.genero} 
                onValueChange={(value) => setCliente({...cliente, genero: value})}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-400">Altura (m)</Label>
              <Input
                type="number"
                step="0.01"
                value={bioData.altura}
                onChange={(e) => setBioData({...bioData, altura: e.target.value})}
                placeholder="1.75"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-emerald-400" />
              Bioimpedância - OMRON HBF-514C
            </CardTitle>
            <CardDescription className="text-slate-400">
              Preencha exatamente os valores da balança na ordem correta
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-slate-400">1. ⚖️ Peso Total (kg) *</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.peso_total}
                onChange={(e) => setBioData({...bioData, peso_total: e.target.value})}
                placeholder="89.2"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-slate-400">2. 📊 IMC</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.imc}
                onChange={(e) => setBioData({...bioData, imc: e.target.value})}
                placeholder="26.5"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">3. 🔥 % Gordura Corporal *</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.percentual_gordura}
                onChange={(e) => setBioData({...bioData, percentual_gordura: e.target.value})}
                placeholder="28.4"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-slate-400">4. 💪 Massa Muscular Esquelética (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.massa_muscular_esqueletica}
                onChange={(e) => setBioData({...bioData, massa_muscular_esqueletica: e.target.value})}
                placeholder="34.8"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">5. 💪 Massa Magra (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.massa_magra}
                onChange={(e) => setBioData({...bioData, massa_magra: e.target.value})}
                placeholder="45.0"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">6. 🫀 Massa Gorda (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.massa_gorda}
                onChange={(e) => setBioData({...bioData, massa_gorda: e.target.value})}
                placeholder="15.2"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">7. 🫀 Gordura Visceral</Label>
              <Input
                type="number"
                value={bioData.gordura_visceral}
                onChange={(e) => setBioData({...bioData, gordura_visceral: e.target.value})}
                placeholder="12"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">8. ⚡ Metabolismo Basal (kcal)</Label>
              <Input
                type="number"
                value={bioData.metabolismo_basal}
                onChange={(e) => setBioData({...bioData, metabolismo_basal: e.target.value})}
                placeholder="1780"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">9. 🧬 Idade Corporal</Label>
              <Input
                type="number"
                value={bioData.idade_corporal}
                onChange={(e) => setBioData({...bioData, idade_corporal: e.target.value})}
                placeholder="49"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">10. 📏 Circunferência Abdômen</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.circunferencia_abdomen}
                onChange={(e) => setBioData({...bioData, circunferencia_abdomen: e.target.value})}
                placeholder="95.0"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">11. 📏 Circunferência Cintura</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.circunferencia_cintura}
                onChange={(e) => setBioData({...bioData, circunferencia_cintura: e.target.value})}
                placeholder="88.0"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">12. 📏 Circunferência Quadril</Label>
              <Input
                type="number"
                step="0.1"
                value={bioData.circunferencia_quadril}
                onChange={(e) => setBioData({...bioData, circunferencia_quadril: e.target.value})}
                placeholder="102.0"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="h-5 w-5 text-emerald-400" />
              Foto do Cliente
            </CardTitle>
            <CardDescription className="text-slate-400">
              Tire uma foto do cliente para o QR Code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoUpload}
                className="hidden"
                id="foto-upload"
                ref={fileInputRef}
              />
              {fotoPreview ? (
                <div className="relative">
                  <img 
                    src={fotoPreview} 
                    alt="Cliente" 
                    className="w-32 h-32 rounded-full object-cover border-2 border-emerald-500/30"
                  />
                  <button
                    type="button"
                    onClick={removerFoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label 
                  htmlFor="foto-upload" 
                  className="w-32 h-32 rounded-full border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/30 transition-colors"
                >
                  <Upload className="h-8 w-8 text-slate-500" />
                  <span className="text-xs text-slate-500 mt-2">Clique para adicionar</span>
                </label>
              )}
              <p className="text-xs text-slate-500">
                A foto aparecerá no QR Code e na página pública
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-400" />
              Observações da Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={bioData.observacoes_equipe}
              onChange={(e) => setBioData({...bioData, observacoes_equipe: e.target.value})}
              placeholder="Observações importantes sobre a avaliação..."
              className="bg-slate-700 border-slate-600 text-white"
            />
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white py-6 text-lg gap-2"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {loading ? 'Salvando...' : 'Salvar Avaliação e Gerar QR Code'}
        </Button>
      </form>
    </div>
  );
}
