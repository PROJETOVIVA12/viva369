import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Video, Mic, MicOff, VideoOff, 
  Users, Clock, Calendar, Share2,
  Copy, Check, Eye, EyeOff,
  Loader2, AlertCircle, CheckCircle,
  Radio, Zap, Sparkles, Crown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface LiveStatus {
  id: string;
  ativo: boolean;
  titulo: string;
  descricao: string;
  link_meet: string;
  url_imagem: string;
  iniciada_em: string;
}

export default function LiveStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [live, setLive] = useState<LiveStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    titulo: 'Live VIVA369 - Transformação e Saúde',
    descricao: 'Acompanhe conteúdos exclusivos sobre saúde, bem-estar e transformação pessoal',
    link_meet: '',
    url_imagem: ''
  });
  const [erro, setErro] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verificarStatus();
    verificarAdmin();
  }, [user]);

  const verificarAdmin = async () => {
    try {
      const { data } = await supabase
        .from('usuarios')
        .select('role')
        .eq('id', user?.id)
        .single();
      setIsAdmin(data?.role === 'admin' || data?.role === 'lider');
    } catch (error) {
      console.error('Erro ao verificar admin:', error);
    }
  };

  const verificarStatus = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('live_status')
        .select('*')
        .eq('ativo', true)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setLive(data);
    } catch (error) {
      console.error('Erro ao verificar status da live:', error);
    } finally {
      setLoading(false);
    }
  };

  const iniciarLive = async () => {
    if (!formData.link_meet) {
      setErro('Por favor, insira o link do Google Meet');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('live_status')
        .insert({
          usuario_id: user?.id,
          ativo: true,
          titulo: formData.titulo,
          descricao: formData.descricao,
          link_meet: formData.link_meet,
          url_imagem: formData.url_imagem || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop',
          iniciada_em: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setLive(data);
      setShowDialog(false);
      setErro('');
      window.open(formData.link_meet, '_blank');
    } catch (error) {
      console.error('Erro ao iniciar live:', error);
      setErro('Erro ao iniciar live. Tente novamente.');
    }
  };

  const finalizarLive = async () => {
    if (!live) return;

    try {
      // Salvar no histórico
      await supabase
        .from('lives_historico')
        .insert({
          usuario_id: user?.id,
          titulo: live.titulo,
          descricao: live.descricao,
          participantes: 0,
          duracao: Math.floor((Date.now() - new Date(live.iniciada_em).getTime()) / 60000),
          iniciada_em: live.iniciada_em,
          finalizada_em: new Date().toISOString()
        });

      // Desativar live
      await supabase
        .from('live_status')
        .update({
          ativo: false,
          finalizada_em: new Date().toISOString()
        })
        .eq('id', live.id);

      setLive(null);
    } catch (error) {
      console.error('Erro ao finalizar live:', error);
    }
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const compartilharWhatsApp = () => {
    const mensagem = `🔴 *AO VIVO - VIVA369*\n\n`
      + `${live?.titulo || 'Live VIVA369'}\n\n`
      + `${live?.descricao || 'Acompanhe conteúdos exclusivos de saúde'}\n\n`
      + `🔗 ${window.location.href}\n\n`
      + `💚 VIVA369 - Sua jornada de saúde`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  // Se não tem live ativa e não é admin, não mostra nada
  if (!live && !isAdmin) {
    return null;
  }

  // Se tem live ativa
  if (live) {
    return (
      <div className="fixed bottom-20 right-4 z-50 max-w-sm w-full">
        <Card className="bg-gradient-to-r from-red-600/90 via-red-500/90 to-amber-500/90 backdrop-blur-sm border-red-500/50 shadow-2xl shadow-red-500/20 animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute -top-1 -right-1" />
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="mt-1 text-[10px] text-white/70 font-oswald">AO VIVO</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500/30 text-white border-0 text-[10px] animate-pulse">
                    <Radio className="h-3 w-3 mr-1" />
                    AO VIVO
                  </Badge>
                  {live.titulo && (
                    <p className="text-sm font-medium text-white truncate">
                      {live.titulo}
                    </p>
                  )}
                </div>
                {live.descricao && (
                  <p className="text-xs text-white/70 line-clamp-2 mt-1">
                    {live.descricao}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Button 
                    size="sm" 
                    className="bg-white text-red-600 hover:bg-white/90 gap-1 text-xs h-7 px-3"
                    onClick={() => window.open(live.link_meet, '_blank')}
                  >
                    <Video className="h-3 w-3" />
                    Assistir
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 gap-1 text-xs h-7 px-2"
                    onClick={compartilharWhatsApp}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                  {isAdmin && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500/30 text-red-200 hover:bg-red-500/20 gap-1 text-xs h-7 px-2"
                      onClick={finalizarLive}
                    >
                      <VideoOff className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se é admin e não tem live ativa
  if (isAdmin && !live) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button 
          className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2 shadow-lg hover:scale-105 transition-transform"
          onClick={() => setShowDialog(true)}
        >
          <Video className="h-4 w-4" />
          Iniciar Live
        </Button>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <Video className="h-5 w-5 text-emerald-400" />
                Iniciar Live VIVA369
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Preencha os dados para iniciar uma live
              </DialogDescription>
            </DialogHeader>

            {erro && (
              <Alert className="bg-red-500/10 border-red-500/30">
                <AlertDescription className="text-red-400">{erro}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 py-4">
              <div>
                <Label className="text-slate-400">Título da Live</Label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ex: Live VIVA369 - Transformação"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-400">Descrição</Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="O que você vai falar na live?"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-400">Link do Google Meet *</Label>
                <Input
                  value={formData.link_meet}
                  onChange={(e) => setFormData({...formData, link_meet: e.target.value})}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-500 mt-1">Abra o Google Meet, clique em "Copiar link" e cole aqui</p>
              </div>
              <div>
                <Label className="text-slate-400">URL da Imagem (opcional)</Label>
                <Input
                  value={formData.url_imagem}
                  onChange={(e) => setFormData({...formData, url_imagem: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)} className="border-slate-600 text-slate-400">
                Cancelar
              </Button>
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2"
                onClick={iniciarLive}
              >
                <Video className="h-4 w-4" />
                Iniciar Live
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
}
