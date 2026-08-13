import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  Scale, Activity, Droplet, Heart, Zap, Brain, Target,
  Calendar, TrendingUp, TrendingDown, Award,
  AlertCircle, User, Clock, Share2, 
  ArrowRight, CheckCircle, Sparkles, Crown,
  Users, Gift, Instagram, MessageCircle, Youtube,
  Facebook, Linkedin, Twitter, Send, Copy, Check
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';

interface Avaliacao {
  id: string;
  data_avaliacao: string;
  peso_total: number;
  imc: number;
  percentual_gordura: number;
  massa_muscular_esqueletica: number;
  massa_magra: number;
  massa_gorda: number;
  gordura_visceral: number;
  metabolismo_basal: number;
  idade_corporal: number;
  circunferencia_abdomen: number;
  circunferencia_cintura: number;
  circunferencia_quadril: number;
  foto_url: string;
  observacoes_equipe: string;
  expira_em: string;
  criado_em: string;
  usuarios?: {
    nome: string;
    email: string;
  };
}

export default function PaginaPublicaBio() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  const [cliente, setCliente] = useState<{ nome: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (token) {
      carregarDados();
    }
  }, [token]);

  const carregarDados = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('avaliacoes_bioimpedancia')
        .select(`
          *,
          usuarios!inner (
            nome,
            email
          )
        `)
        .eq('token_acesso', token)
        .single();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('Avaliação não encontrada ou expirada');
        setLoading(false);
        return;
      }

      if (data.expira_em && new Date(data.expira_em) < new Date()) {
        setError('Este link expirou. Faça uma nova avaliação.');
        setLoading(false);
        return;
      }

      setAvaliacao(data);
      setCliente({
        nome: data.usuarios?.nome || 'Cliente',
        email: data.usuarios?.email || ''
      });
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      setError(error.message || 'Erro ao carregar avaliação');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const compartilhar = () => {
    const url = window.location.href;
    const mensagem = `🌟 *VIVA369 - Avaliação Física*\n\n`
      + `Olá! Aqui está o resultado da sua avaliação física.\n\n`
      + `🔗 ${url}\n\n`
      + `💚 VIVA369 - Sua jornada de saúde`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const compartilharInstagram = () => {
    window.open('https://instagram.com/viva369', '_blank');
  };

  const compartilharFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const compartilharTwitter = () => {
    const texto = '🌟 Descubra sua avaliação física no VIVA369!';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-slate-400">Carregando avaliação...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Link Inválido</h2>
            <p className="text-slate-400">{error}</p>
            <Button 
              className="mt-6 bg-gradient-to-r from-emerald-500 to-amber-500 text-white"
              onClick={() => navigate('/')}
            >
              Voltar para o VIVA369
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!avaliacao) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Card principal */}
        <div ref={cardRef} className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Scale className="h-6 w-6" />
                  VIVA369
                </h1>
                <p className="text-white/80 text-sm">Conheça seu corpo • Transforme sua vida</p>
              </div>
              <Badge className="bg-white/20 text-white border-0">
                <Calendar className="h-4 w-4 mr-2" />
                {formatarData(avaliacao.data_avaliacao)}
              </Badge>
            </div>
          </div>

          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              {avaliacao.foto_url ? (
                <img 
                  src={avaliacao.foto_url} 
                  alt={cliente?.nome || 'Cliente'}
                  className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/30">
                  <User className="h-10 w-10 text-emerald-400" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">{cliente?.nome || 'Cliente'}</h2>
                <p className="text-sm text-slate-400">Avaliação realizada em {formatarData(avaliacao.data_avaliacao)}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Peso" value={avaliacao.peso_total} unit="kg" icon={Scale} />
              <MetricCard label="IMC" value={avaliacao.imc} unit="" icon={Target} />
              <MetricCard label="% Gordura" value={avaliacao.percentual_gordura} unit="%" icon={Droplet} />
              <MetricCard label="Massa Muscular" value={avaliacao.massa_muscular_esqueletica} unit="kg" icon={Activity} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Gordura Visceral" value={avaliacao.gordura_visceral} unit="" icon={Heart} />
              <MetricCard label="Metabolismo" value={avaliacao.metabolismo_basal} unit="kcal" icon={Zap} />
              <MetricCard label="Idade Corporal" value={avaliacao.idade_corporal} unit="anos" icon={Brain} />
              <MetricCard label="Massa Gorda" value={avaliacao.massa_gorda} unit="kg" icon={Droplet} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard label="Abdômen" value={avaliacao.circunferencia_abdomen} unit="cm" icon={Activity} />
              <MetricCard label="Cintura" value={avaliacao.circunferencia_cintura} unit="cm" icon={Activity} />
              <MetricCard label="Quadril" value={avaliacao.circunferencia_quadril} unit="cm" icon={Activity} />
            </div>

            {avaliacao.observacoes_equipe && (
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-semibold text-emerald-400 mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Observações da Equipe
                </h3>
                <p className="text-sm text-slate-300">{avaliacao.observacoes_equipe}</p>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 p-6 rounded-xl border border-emerald-500/20 text-center">
              <h3 className="text-white text-lg font-semibold flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                Quer transformar sua saúde?
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                Faça parte da comunidade VIVA369 e comece sua jornada de transformação hoje mesmo!
              </p>
              <Button 
                className="mt-4 bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2"
                onClick={() => window.open('https://viva-plus--viva369oficial.replit.app/registrar', '_blank')}
              >
                <Users className="h-4 w-4" />
                QUERO PARTICIPAR
              </Button>
            </div>
          </div>
        </div>

        {/* Botões de Ação e Compartilhamento */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={compartilhar}>
                <Share2 className="h-4 w-4" />
                Compartilhar no WhatsApp
              </Button>
              <Button className="border-slate-700 text-slate-300 hover:text-white gap-2" onClick={copiarLink} variant="outline">
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copiado!' : 'Copiar Link'}
              </Button>
            </div>

            <div className="flex justify-center gap-4 pt-4 border-t border-slate-800 text-slate-400">
              <button onClick={compartilharInstagram} className="hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button onClick={compartilharFacebook} className="hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button onClick={compartilharTwitter} className="hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-xs text-slate-500">
            💚 VIVA369 - Sua jornada de saúde | Link válido por 90 dias
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {avaliacao.expira_em && new Date(avaliacao.expira_em) > new Date() 
              ? `Expira em: ${formatarData(avaliacao.expira_em)}` 
              : '⚠️ Este link expirou'}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, icon: Icon }: { label: string; value: number | null | undefined; unit: string; icon: any }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-between">
      <div className="flex items-center justify-between text-slate-400 mb-2">
        <span className="text-xs font-medium">{label}</span>
        <Icon className="h-4 w-4 text-emerald-400" />
      </div>
      <div>
        <span className="text-xl font-bold text-white">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </span>
        <span className="text-xs text-slate-400 ml-1">{unit}</span>
      </div>
    </div>
  );
}
