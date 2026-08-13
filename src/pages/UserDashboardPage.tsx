import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, Users, Gift, Trophy, Compass, Activity,
  Zap, Flame, Heart, Calendar, Target, 
  CheckCircle, Dumbbell, Brain, Coffee, Sparkle,
  ChevronRight, Rocket, Gem, Crown, Award,
  TrendingUp, Star, Medal, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function UserDashboardPage() {
  console.log('🚀 UserDashboardPage - Renderizando...');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats] = useState({
    streak: 7,
    pontos: 450,
    nivel_saude: 'Ouro',
    dias_jornada: 23
  });

  console.log('📋 UserDashboardPage - user:', user);

  const userName = user?.user_metadata?.nome || user?.email?.split('@')[0] || 'Usuário';
  const userInitial = userName.charAt(0).toUpperCase();

  // Funções para navegação
  const irPara = (rota: string) => {
    navigate(rota);
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/80 to-secondary p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/50">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-white/20 text-white text-xl">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                Bem-vindo, {userName}!
                <Crown className="h-5 w-5 text-amber-300" />
              </h1>
              <p className="text-white/80 text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-300" />
                Nível {stats.nivel_saude}
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <Calendar className="h-3 w-3" />
                {stats.dias_jornada} dias na jornada
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <Zap className="h-3 w-3 text-yellow-300" />
                {stats.pontos} pts
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white border-0 px-4 py-2">
              <Flame className="h-4 w-4 mr-2 text-orange-300 animate-pulse" />
              Sequência: {stats.streak} dias
            </Badge>
            <Badge className="bg-white/20 text-white border-0 px-4 py-2">
              <Zap className="h-4 w-4 mr-2 text-yellow-300" />
              {stats.pontos} pts
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          onClick={() => irPara('/meta')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">{stats.streak}</p>
                <p className="text-xs text-muted-foreground">Sequência de Dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
