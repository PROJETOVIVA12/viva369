import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Crown, Gift, Users, Target, 
  Award, Activity, Scale, Heart, Zap,
  ArrowRight, Play, Eye, Lock, Unlock,
  CheckCircle, Star, Medal, Gem,
  Weight, Flame, Brain, Compass, Trophy
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MODULOS = [
  {
    id: 'dashboard',
    nome: '🏆 EU PERDI PESO E GANHEI SAÚDE',
    descricao: 'Acompanhe sua transformação em tempo real',
    icone: Weight,
    cor: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'desafios',
    nome: '🔥 DESAFIE-SE E VENÇA',
    descricao: 'Desafios que mudam sua vida em 30, 60 e 90 dias',
    icone: Flame,
    cor: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'bioimpedancia',
    nome: '💪 VEJA O QUE MUDA EM VOCÊ',
    descricao: 'Avaliação corporal completa e evolução',
    icone: Scale,
    cor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'comunidade',
    nome: '🌟 JUNTOS SOMOS MAIS FORTES',
    descricao: 'Conecte-se com pessoas na mesma jornada',
    icone: Users,
    cor: 'from-purple-500 to-pink-500'
  },
  {
    id: 'lider',
    nome: '💰 EU INDICO E GANHO',
    descricao: 'Comissões e indicações que geram renda',
    icone: Crown,
    cor: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'premiacoes',
    nome: '🎯 CONQUISTE SEU PRÊMIO',
    descricao: 'Suas conquistas e recompensas exclusivas',
    icone: Award,
    cor: 'from-red-500 to-rose-500'
  }
];

export default function TourAppPage() {
  const [moduloSelecionado, setModuloSelecionado] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-amber-500 p-4 rounded-2xl">
              <Eye className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Descubra o <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">VIVA369</span>
          </h1>
          <p className="text-slate-400 mt-2 max-w-lg mx-auto">
            Sua jornada de transformação começa aqui
          </p>
          <Badge className="mt-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Eye className="h-3 w-3 mr-1" />
            Modo Degustação
          </Badge>
        </div>

        {/* Módulos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULOS.map((modulo) => {
            const Icon = modulo.icone;
            const isSelected = moduloSelecionado === modulo.id;
            return (
              <Card 
                key={modulo.id}
                className={cn(
                  "bg-slate-800 border-slate-700 cursor-pointer transition-all hover:border-emerald-500/30",
                  isSelected && "border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                )}
                onClick={() => setModuloSelecionado(modulo.id)}
              >
                <CardContent className="p-4">
                  <div className={cn(
                    "p-3 rounded-xl bg-gradient-to-r text-white mb-3",
                    modulo.cor
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-medium text-sm">{modulo.nome}</h3>
                  <p className="text-xs text-slate-400 mt-1">{modulo.descricao}</p>
                  <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                    <Eye className="h-3 w-3" />
                    <span>Clique e descubra</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chamada para ação */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-white text-xl font-bold">🚀 90 DIAS PARA TRANSFORMAR SUA VIDA</h3>
            <p className="text-slate-400 text-sm mt-2">
              Entre para o VIVA369 e comece sua jornada de transformação hoje mesmo!
            </p>
            <Link to="/anamnese-adesao" className="block mt-4">
              <Button className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2 text-lg px-8 py-6">
                <Unlock className="h-5 w-5" />
                QUERO PARTICIPAR AGORA
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
