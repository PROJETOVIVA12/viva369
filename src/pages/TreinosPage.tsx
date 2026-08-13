import React from 'react';
import { Dumbbell, Clock, Flame, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function TreinosPage() {
  const treinos = [
    { id: 1, nome: 'Treino A - Superiores', duracao: '45min', calorias: 350, nivel: 'Iniciante' },
    { id: 2, nome: 'Treino B - Inferiores', duracao: '40min', calorias: 400, nivel: 'Intermediário' },
    { id: 3, nome: 'Treino C - Core', duracao: '30min', calorias: 250, nivel: 'Iniciante' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Treinos</h1>
          <p className="text-slate-400">Escolha seu treino e comece agora!</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          <Flame className="h-3 w-3 mr-1" />
          Hoje: 280 calorias
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {treinos.map((treino) => (
          <Card key={treino.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-xs border-slate-600">
                  {treino.nivel}
                </Badge>
              </div>
              <CardTitle className="text-white">{treino.nome}</CardTitle>
              <CardDescription className="text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {treino.duracao}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {treino.calorias} cal
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 gap-2">
                <CheckCircle className="h-4 w-4" />
                Iniciar Treino
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progresso */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Progresso da Semana</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Segunda</span>
              <span className="text-emerald-400">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Terça</span>
              <span className="text-emerald-400">100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Quarta</span>
              <span className="text-emerald-400">50%</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
