import React, { useState } from 'react';
import {
  Calendar, Clock, Target, Award, Crown, 
  Star, Sparkles, CheckCircle, 
  Utensils, Coffee, Soup, Salad,
  GlassWater, Moon, Sun, Flame, Leaf,
  Zap, Brain, Heart, Activity, Scale, Trophy,
  Users, Gift
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import SistemaPremios from './SistemaPremios';

interface DesafioDetalhesProps {
  desafio: {
    id: string;
    nome: string;
    cor: string;
    emoji: string;
    duracao: string;
    descricao: string;
    beneficios: string[];
    premio: string;
    nivel: string;
    icone: any;
  };
  diasCompletos: number;
  onMarcarDia: () => void;
}

export default function DesafioDetalhes({ 
  desafio, 
  diasCompletos, 
  onMarcarDia 
}: DesafioDetalhesProps) {
  const [premiosAtualizados, setPremiosAtualizados] = useState(0);

  const dias = Array.from({ length: 30 }, (_, i) => i + 1);
  const progresso = Math.min((diasCompletos / 30) * 100, 100);
  const Icon = desafio.icone;

  return (
    <div className="space-y-6">
      {/* Header do Desafio */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl p-6 border-2",
        desafio.cor
      )}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl bg-gradient-to-r text-white shadow-lg",
              desafio.cor
            )}>
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {desafio.emoji} {desafio.nome}
              </h2>
              <p className="text-slate-300 text-sm">{desafio.descricao}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white border-0">
              <Clock className="h-3 w-3 mr-1" />
              {desafio.duracao}
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Award className="h-3 w-3 mr-1" />
              {desafio.nivel}
            </Badge>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-white/80 mb-1">
            <span>Progresso</span>
            <span>{Math.round(progresso)}% ({diasCompletos}/30 dias)</span>
          </div>
          <Progress value={progresso} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="cronograma" className="w-full">
        <TabsList className="grid grid-cols-6 bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="cronograma" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Calendar className="h-4 w-4 mr-2" />
            Cronograma
          </TabsTrigger>
          <TabsTrigger value="passoapasso" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Target className="h-4 w-4 mr-2" />
            Passo a Passo
          </TabsTrigger>
          <TabsTrigger value="receitas" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Utensils className="h-4 w-4 mr-2" />
            Receitas
          </TabsTrigger>
          <TabsTrigger value="premios" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Trophy className="h-4 w-4 mr-2" />
            Prêmios
          </TabsTrigger>
          <TabsTrigger value="dicas" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Sparkles className="h-4 w-4 mr-2" />
            Dicas
          </TabsTrigger>
        </TabsList>

        {/* TAB 1 - CRONOGRAMA */}
        <TabsContent value="cronograma" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                Cronograma de 30 Dias
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {dias.map((dia) => {
                  const isCompleted = dia <= diasCompletos;
                  const isCurrent = dia === diasCompletos + 1;
                  return (
                    <div 
                      key={dia} 
                      className={cn(
                        "text-center p-1 rounded-lg transition-all",
                        isCompleted ? "bg-emerald-500/20 border border-emerald-500/30" :
                        isCurrent ? "bg-amber-500/20 border border-amber-500/30 animate-pulse" :
                        "bg-slate-700/30 border border-slate-600"
                      )}
                    >
                      <div className="text-xs text-slate-400">Dia</div>
                      <div className={cn(
                        "text-sm font-bold",
                        isCompleted ? "text-emerald-400" :
                        isCurrent ? "text-amber-400" :
                        "text-slate-500"
                      )}>
                        {dia}
                      </div>
                      {isCompleted && <CheckCircle className="h-3 w-3 text-emerald-400 mx-auto" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2 - PASSO A PASSO */}
        <TabsContent value="passoapasso" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                Passo a Passo do Desafio
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {[
                  { 
                    semana: 'Semana 1 - Adaptação',
                    passos: [
                      '🌅 Acordar e beber 500ml de água com limão',
                      '🥗 Café da manhã: Frutas + Aveia',
                      '🏃 30 minutos de caminhada',
                      '🥤 Suco detox no meio da manhã',
                      '🍲 Almoço: Salada + Proteína magra',
                      '☕ Chá digestivo após o almoço',
                      '🌙 Jantar leve até 20h',
                      '🧘 5 minutos de meditação antes de dormir'
                    ]
                  },
                  { 
                    semana: 'Semana 2 - Intensificação',
                    passos: [
                      '🌅 500ml de água com limão + gengibre',
                      '🥗 Café da manhã: Ovos + Vegetais',
                      '🏃 45 minutos de caminhada ou corrida',
                      '🥤 Suco verde com clorofila',
                      '🍲 Almoço: Salada + Peixe grelhado',
                      '☕ Chá de hibisco à tarde',
                      '🌙 Jantar: Sopa de legumes',
                      '🧘 10 minutos de meditação'
                    ]
                  },
                  { 
                    semana: 'Semana 3 - Consolidação',
                    passos: [
                      '🌅 500ml de água com limão + cúrcuma',
                      '🥗 Café da manhã: Smoothie de frutas',
                      '🏃 1 hora de atividade física',
                      '🥤 Suco detox com beterraba',
                      '🍲 Almoço: Salada + Frango grelhado',
                      '☕ Chá de erva-doce à tarde',
                      '🌙 Jantar: Sopa de abóbora',
                      '🧘 15 minutos de meditação'
                    ]
                  },
                  { 
                    semana: 'Semana 4 - Transformação',
                    passos: [
                      '🌅 500ml de água com limão + canela',
                      '🥗 Café da manhã: Omelete de claras',
                      '🏃 1 hora de treino intenso',
                      '🥤 Suco detox com couve',
                      '🍲 Almoço: Salada + Carne magra',
                      '☕ Chá de boldo à tarde',
                      '🌙 Jantar: Sopa de legumes',
                      '🧘 20 minutos de meditação'
                    ]
                  }
                ].map((semana, idx) => (
                  <AccordionItem key={idx} value={`semana-${idx}`} className="border-slate-700">
                    <AccordionTrigger className="text-white hover:text-emerald-400">
                      {semana.semana}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {semana.passos.map((passo, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-emerald-400 mt-0.5">•</span>
                            {passo}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3 - RECEITAS */}
        <TabsContent value="receitas" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-emerald-400" />
                Receitas Exclusivas
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-slate-700/30 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GlassWater className="h-5 w-5 text-emerald-400" />
                      <h4 className="text-white font-medium">Suco Detox</h4>
                    </div>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                      <li>1 maçã verde</li>
                      <li>1 punhado de espinafre</li>
                      <li>1/2 pepino</li>
                      <li>Suco de 1 limão</li>
                      <li>Gengibre a gosto</li>
                    </ul>
                    <p className="text-xs text-slate-400 mt-2">💚 Bata tudo no liquidificador e sirva gelado</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/30 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Salad className="h-5 w-5 text-emerald-400" />
                      <h4 className="text-white font-medium">Salada Detox</h4>
                    </div>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                      <li>Alface, rúcula e agrião</li>
                      <li>Pepino e tomate cereja</li>
                      <li>Semente de girassol</li>
                      <li>Azeite e limão</li>
                    </ul>
                    <p className="text-xs text-slate-400 mt-2">💚 Rica em fibras e vitaminas</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/30 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Soup className="h-5 w-5 text-emerald-400" />
                      <h4 className="text-white font-medium">Sopa Detox</h4>
                    </div>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                      <li>Abóbora, cenoura e batata</li>
                      <li>Cebola e alho</li>
                      <li>Caldo de legumes</li>
                      <li>Leite de coco</li>
                    </ul>
                    <p className="text-xs text-slate-400 mt-2">💚 Aquece e nutre o corpo</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/30 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Coffee className="h-5 w-5 text-emerald-400" />
                      <h4 className="text-white font-medium">Chá Detox</h4>
                    </div>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                      <li>1 colher de erva-doce</li>
                      <li>1 colher de hibisco</li>
                      <li>1 pau de canela</li>
                      <li>1 xícara de água</li>
                    </ul>
                    <p className="text-xs text-slate-400 mt-2">💚 Digestivo e calmante</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4 - PRÊMIOS */}
        <TabsContent value="premios" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <SistemaPremios 
                desafioId={desafio.id}
                tipo="individual"
                onPremioAdicionado={() => setPremiosAtualizados(prev => prev + 1)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5 - DICAS */}
        <TabsContent value="dicas" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                Dicas para o Desafio
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { 
                    titulo: '💧 Hidratação', 
                    dica: 'Beba pelo menos 2L de água por dia. A água ajuda na eliminação de toxinas e mantém o corpo funcionando bem.' 
                  },
                  { 
                    titulo: '🍽️ Alimentação', 
                    dica: 'Priorize alimentos integrais, vegetais e proteínas magras. Evite alimentos processados e açúcar refinado.' 
                  },
                  { 
                    titulo: '🏃 Exercícios', 
                    dica: 'Pratique atividades físicas regularmente. Caminhadas, corridas ou treinos leves ajudam no processo.' 
                  },
                  { 
                    titulo: '🧘 Meditação', 
                    dica: 'Reserve 5-10 minutos para meditar todos os dias. Isso ajuda a reduzir o estresse e manter o foco.' 
                  },
                  { 
                    titulo: '😴 Sono', 
                    dica: 'Durma de 7-8 horas por noite. O sono é essencial para a recuperação do corpo e da mente.' 
                  },
                  { 
                    titulo: '📝 Registro', 
                    dica: 'Anote seu progresso diariamente. Ver sua evolução motiva a continuar e alcançar seus objetivos.' 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                    <h4 className="text-white font-medium">{item.titulo}</h4>
                    <p className="text-sm text-slate-400 mt-1">{item.dica}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão Marcar Dia */}
      <Button 
        className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white py-6 text-lg gap-2"
        onClick={onMarcarDia}
        disabled={diasCompletos >= 30}
      >
        <CheckCircle className="h-5 w-5" />
        {diasCompletos >= 30 ? 'Desafio Completo! 🎉' : 'Marcar Dia Completado'}
      </Button>
    </div>
  );
}
