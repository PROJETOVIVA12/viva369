import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useLiveStatus } from '@/services/liveStatusService';
import { LiveStatusBadge } from '@/components/LiveStatusBadge';
import {
  LayoutDashboard, Users, Gift, Trophy, Compass, Activity,
  ShoppingCart, UserCircle, LogOut, Menu, X,
  Sparkles, BookOpen, Crown, Settings, Briefcase,
  Package, Heart, Scale, Share2, Video, DollarSign,
  MessageCircle, Dumbbell, Utensils, Cloud, Shield,
  TrendingUp, CalendarDays, Megaphone, LineChart,
  Target, Award, Gem, Star, Radio, Zap, Calendar,
  CheckCircle, Clock, Flame, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, role } = useAuth();
  const { isLive } = useLiveStatus();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    sequencia: 7,
    pontos: 450,
    nivel: 'Ouro',
    dias: 23
  });
  const [desafio, setDesafio] = useState({
    titulo: 'Complete 10 minutos de exercício',
    descricao: 'Faça qualquer atividade física hoje',
    pontos: 10,
    feito: false
  });

  useEffect(() => {
    // Carregar dados do usuário
    const carregarDados = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', user.id)
            .single();

          if (data) {
            setStats({
              sequencia: data.sequencia || 7,
              pontos: data.pontos || 450,
              nivel: data.nivel || 'Ouro',
              dias: data.dias_jornada || 23
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header com Botão AO VIVO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-emerald-400" />
            Bem-vindo, {user?.user_metadata?.nome || user?.email?.split('@')[0]}! 🎉
          </h1>
          <p className="text-slate-400 flex items-center gap-2 flex-wrap">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              🇳🇱 Nível {stats.nivel}
            </Badge>
            <span className="text-sm">•</span>
            <span className="text-sm">📅 {stats.dias} dias na jornada</span>
            <span className="text-sm">•</span>
            <span className="text-sm">🎯 {stats.pontos} pts</span>
          </p>
        </div>
        <LiveStatusBadge />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Sequência de Dias</p>
                <p className="text-2xl font-bold text-white">{stats.sequencia}</p>
              </div>
              <div className="bg-orange-500/20 p-2 rounded-full">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Pontuação VIVA+</p>
                <p className="text-2xl font-bold text-white">{stats.pontos}</p>
              </div>
              <div className="bg-emerald-500/20 p-2 rounded-full">
                <Star className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Nível de Saúde</p>
                <p className="text-2xl font-bold text-amber-400">{stats.nivel}</p>
              </div>
              <div className="bg-amber-500/20 p-2 rounded-full">
                <Award className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Dias na Jornada</p>
                <p className="text-2xl font-bold text-white">{stats.dias}</p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-full">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desafio do Dia */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-400" />
            Seu Próximo Desafio
          </CardTitle>
          <CardDescription className="text-slate-400">
            Complete o desafio de hoje para ganhar pontos!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="p-2 bg-emerald-500/20 rounded-full">
              <Activity className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">{desafio.titulo}</h4>
              <p className="text-sm text-slate-400">{desafio.descricao}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                +{desafio.pontos} pts
              </Badge>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white hover:from-emerald-600 hover:to-amber-600 gap-2"
                onClick={() => setDesafio({ ...desafio, feito: true })}
              >
                {desafio.feito ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Feito!
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Marcar como feito
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicador de Live no Dashboard */}
      {isLive && (
        <Card className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/30 animate-pulse">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </div>
              <span className="text-white font-bold">🔴 AO VIVO AGORA!</span>
              <span className="text-slate-300 text-sm">Clique no botão vermelho para assistir</span>
            </div>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white gap-2"
              onClick={() => window.location.href = '/lives'}
            >
              <Radio className="h-4 w-4" />
              Assistir Live
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
