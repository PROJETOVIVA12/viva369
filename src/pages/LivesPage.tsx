import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Video, Calendar, Clock, Users, Play,
  Eye, Heart, Share2, Bell, CheckCircle,
  Youtube, MessageCircle, Calendar as CalendarIcon,
  ChevronRight, Sparkles, Award, Star,
  Radio, Zap, Crown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const LIVES = {
  proximas: [
    {
      id: 1,
      titulo: 'Nutrição Funcional para Iniciantes',
      descricao: 'Aprenda os fundamentos da alimentação saudável e como montar seu prato ideal.',
      data: '2026-08-23',
      hora: '20:00',
      duracao: '2h',
      palestrante: 'Dra. Carolina Nutricionista',
      link: 'https://calendar.app.google/JfVqjAkQkvVHKirU7',
      imagem: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      titulo: 'Treino HIIT para Casa — Sem equipamento',
      descricao: 'Circuito de alta intensidade que você pode fazer em qualquer lugar.',
      data: '2026-08-30',
      hora: '19:00',
      duracao: '1h',
      palestrante: 'Prof. Carlos Educação Física',
      link: 'https://calendar.app.google/JfVqjAkQkvVHKirU7',
      imagem: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      titulo: 'Mindfulness e Saúde Mental',
      descricao: 'Técnicas de meditação e mindfulness para reduzir o estresse diário.',
      data: '2026-09-07',
      hora: '20:00',
      duracao: '1h30',
      palestrante: 'Dra. Patricia Psicóloga',
      link: 'https://calendar.app.google/JfVqjAkQkvVHKirU7',
      imagem: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=200&fit=crop'
    }
  ],
  gravadas: [
    {
      id: 4,
      titulo: 'Hidratação e Performance — Mitos e Verdades',
      descricao: 'Descubra a quantidade ideal de água para seu biotipo e estilo de vida.',
      data: '2026-07-28',
      duracao: '1h',
      visualizacoes: 247,
      palestrante: 'Dra. Patricia Saúde',
      link: 'https://youtube.com/@wearestrongnation'
    },
    {
      id: 5,
      titulo: 'Sono Reparador — A Base da Saúde',
      descricao: 'Como melhorar a qualidade do sono em 7 dias com técnicas simples.',
      data: '2026-07-21',
      duracao: '1h15',
      visualizacoes: 189,
      palestrante: 'Dra. Paula Sono',
      link: 'https://youtube.com/@wearestrongnation'
    },
    {
      id: 6,
      titulo: 'Alimentação Anti-inflamatória',
      descricao: 'Alimentos que combatem inflamações e melhoram sua saúde geral.',
      data: '2026-07-14',
      duracao: '1h',
      visualizacoes: 312,
      palestrante: 'Dr. Ricardo Nutricionista',
      link: 'https://youtube.com/@wearestrongnation'
    }
  ]
};

export default function LivesPage() {
  const { user } = useAuth();
  const [lembretes, setLembretes] = useState<number[]>([]);

  const toggleLembrete = (id: number) => {
    setLembretes(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const entrarLive = (link: string) => {
    if (link.includes('calendar.app.google')) {
      window.open(link, '_blank');
    } else if (link.includes('youtube.com')) {
      window.open(link, '_blank');
    } else {
      window.open(link, '_blank');
    }
  };

  const formatarData = (data: string) => {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const isAdmin = user?.email === 'jocimarmachado1618@gmail.com';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-6">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Video className="h-6 w-6" />
              Lives Exclusivas
            </h1>
            <p className="text-white/80 text-sm">
              Conteúdo ao vivo com especialistas em saúde e bem-estar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-0">
              <Users className="h-4 w-4 mr-2" />
              {LIVES.proximas.length + LIVES.gravadas.length} conteúdos
            </Badge>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white hover:bg-white/20 border-0"
              onClick={() => window.open('https://youtube.com/@wearestrongnation', '_blank')}
            >
              <Youtube className="h-4 w-4 mr-2" />
              Canal Oficial
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="proximas" className="w-full">
        <TabsList className="grid grid-cols-2 bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="proximas" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Clock className="h-4 w-4 mr-2" />
            Próximas ({LIVES.proximas.length})
          </TabsTrigger>
          <TabsTrigger value="gravadas" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Play className="h-4 w-4 mr-2" />
            Gravadas ({LIVES.gravadas.length})
          </TabsTrigger>
        </TabsList>

        {/* Próximas Lives */}
        <TabsContent value="proximas" className="mt-6">
          <div className="grid gap-6">
            {LIVES.proximas.map((live) => (
              <Card key={live.id} className="bg-slate-800 border-slate-700 overflow-hidden hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto bg-slate-700/50 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <span className="animate-pulse">●</span> AO VIVO
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{live.titulo}</h3>
                        <p className="text-sm text-slate-400 mt-1">{live.descricao}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "gap-1",
                          lembretes.includes(live.id) ? "text-emerald-400" : "text-slate-400"
                        )}
                        onClick={() => toggleLembrete(live.id)}
                      >
                        <Bell className="h-4 w-4" />
                        {lembretes.includes(live.id) ? 'Lembrete ativado' : 'Lembrar'}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                      <div className="flex items-center gap-1 text-slate-400">
                        <CalendarIcon className="h-4 w-4" />
                        {formatarData(live.data)} às {live.hora}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-4 w-4" />
                        {live.duracao}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users className="h-4 w-4" />
                        {live.palestrante}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2"
                        onClick={() => entrarLive(live.link)}
                      >
                        <Calendar className="h-4 w-4" />
                        Entrar na Live
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-slate-600 text-slate-400 hover:text-white gap-2"
                        onClick={() => window.open(live.link, '_blank')}
                      >
                        <Sparkles className="h-4 w-4" />
                        Adicionar ao Calendário
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lives Gravadas */}
        <TabsContent value="gravadas" className="mt-6">
          <div className="grid gap-4">
            {LIVES.gravadas.map((live) => (
              <Card key={live.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium">{live.titulo}</h4>
                      <p className="text-sm text-slate-400 mt-1">{live.descricao}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                        <span>{formatarData(live.data)}</span>
                        <span>• {live.duracao}</span>
                        <span>• <Eye className="h-3 w-3 inline mr-1" />{live.visualizacoes} assistiram</span>
                        <span>• {live.palestrante}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="border-slate-600 text-slate-400 hover:text-white gap-2"
                        onClick={() => window.open(live.link, '_blank')}
                      >
                        <Play className="h-4 w-4" />
                        Assistir
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-slate-600 text-slate-400 hover:text-white gap-2"
                        onClick={() => window.open('https://youtube.com/@wearestrongnation', '_blank')}
                      >
                        <Youtube className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Status da Live ao Vivo - Componente já está no App.tsx */}
    </div>
  );
}
