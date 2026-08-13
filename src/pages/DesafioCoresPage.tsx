import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Calendar, CheckCircle, Circle, Clock, Flame,
  Leaf, Apple, Droplet, Moon, Sun, Zap,
  Award, Crown, Gem, Sparkles, Target,
  Users, Share2, Lock, Unlock, Star,
  Camera, Send, Image, Upload, Copy, Check,
  Utensils, Coffee, Soup, Salad, GlassWater,
  ChevronDown, ChevronUp, Timer, TrendingUp,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

// ============================================
// ESTRUTURA DO DESAFIO DAS CORES
// ============================================

const DESAFIO_CORES = {
  verde: {
    id: 'verde',
    nome: 'DESAFIO VERDE',
    cor: 'from-green-500 to-emerald-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    icone: Leaf,
    emoji: '🌿',
    duracao: '7 dias',
    descricao: 'Fase de desintoxicação e limpeza profunda',
    beneficios: 'Eliminação de toxinas, redução de inchaço, pele mais clara',
    premio: '🏆 Kit Detox VIVA369 + Certificado',
    nivel: 'Iniciante'
  },
  vermelho: {
    id: 'vermelho',
    nome: 'DESAFIO VERMELHO',
    cor: 'from-red-500 to-rose-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icone: Flame,
    emoji: '🔥',
    duracao: '7 dias',
    descricao: 'Fase de aceleração do metabolismo',
    beneficios: 'Queima de gordura, aumento de energia, foco mental',
    premio: '🏆 Kit Energia VIVA369 + Certificado',
    nivel: 'Intermediário'
  },
  amarelo: {
    id: 'amarelo',
    nome: 'DESAFIO AMARELO',
    cor: 'from-yellow-500 to-amber-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    icone: Sun,
    emoji: '☀️',
    duracao: '7 dias',
    descricao: 'Fase de fortalecimento e tonificação',
    beneficios: 'Aumento de massa muscular, definição corporal, vitalidade',
    premio: '🏆 Kit Fitness VIVA369 + Certificado',
    nivel: 'Avançado'
  },
  roxo: {
    id: 'roxo',
    nome: 'DESAFIO ROXO',
    cor: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    icone: Sparkles,
    emoji: '💜',
    duracao: '9 dias',
    descricao: 'Fase de consolidação e manutenção',
    beneficios: 'Hábitos consolidados, resultados permanentes, nova identidade',
    premio: '🏆 Kit Premium VIVA369 + Certificado',
    nivel: 'Mestre'
  }
};

// ============================================
// CRONOGRAMA DO DESAFIO DAS CORES
// ============================================

const CRONOGRAMA_CORES = {
  verde: [
    { dia: 'Dia 1', titulo: '🌅 Início da Desintoxicação', descricao: 'Comece eliminando alimentos processados e açúcar.' },
    { dia: 'Dia 2', titulo: '🥗 Alimentação Leve', descricao: 'Frutas, vegetais e grãos integrais.' },
    { dia: 'Dia 3', titulo: '💧 Hidratação Intensiva', descricao: 'Aumente a ingestão de água e chás.' },
    { dia: 'Dia 4', titulo: '🌿 Limpeza Hepática', descricao: 'Sucos verdes e alimentos detox.' },
    { dia: 'Dia 5', titulo: '🍃 Desintoxicação Profunda', descricao: 'Reforço na eliminação de toxinas.' },
    { dia: 'Dia 6', titulo: '🌙 Preparação Final', descricao: 'Últimos dias de preparação.' },
    { dia: 'Dia 7', titulo: '🎯 Conclusão da Fase', descricao: 'Resultados e próximos passos.' }
  ],
  vermelho: [
    { dia: 'Dia 1', titulo: '🔥 Aceleração do Metabolismo', descricao: 'Ative seu metabolismo com exercícios.' },
    { dia: 'Dia 2', titulo: '💪 Treino Intenso', descricao: 'Aumente a intensidade dos treinos.' },
    { dia: 'Dia 3', titulo: '⚡ Energia e Foco', descricao: 'Alimentos que dão energia.' },
    { dia: 'Dia 4', titulo: '🔥 Queima de Gordura', descricao: 'Treinos para queima de gordura.' },
    { dia: 'Dia 5', titulo: '🏃 Cardio Intenso', descricao: 'Aumente o cardio.' },
    { dia: 'Dia 6', titulo: '💪 Força e Potência', descricao: 'Treinos de força.' },
    { dia: 'Dia 7', titulo: '🎯 Metabolismo Turbinado', descricao: 'Resultados e manutenção.' }
  ],
  amarelo: [
    { dia: 'Dia 1', titulo: '☀️ Fortalecimento', descricao: 'Inicie o fortalecimento muscular.' },
    { dia: 'Dia 2', titulo: '🏋️ Treino de Força', descricao: 'Foco em ganho de massa.' },
    { dia: 'Dia 3', titulo: '💪 Definição Corporal', descricao: 'Treinos para definição.' },
    { dia: 'Dia 4', titulo: '⚡ Vitalidade', descricao: 'Alimentos que dão vitalidade.' },
    { dia: 'Dia 5', titulo: '🏃 Treino Completo', descricao: 'Treino de corpo inteiro.' },
    { dia: 'Dia 6', titulo: '💪 Intensificação', descricao: 'Aumente a carga dos treinos.' },
    { dia: 'Dia 7', titulo: '🎯 Corpo Fortalecido', descricao: 'Resultados e evolução.' }
  ],
  roxo: [
    { dia: 'Dia 1', titulo: '💜 Consolidação', descricao: 'Consolide os hábitos adquiridos.' },
    { dia: 'Dia 2', titulo: '🔄 Rotina Estabelecida', descricao: 'Mantenha a nova rotina.' },
    { dia: 'Dia 3', titulo: '🌟 Resultados Permanentes', descricao: 'Resultados que ficam.' },
    { dia: 'Dia 4', titulo: '💪 Manutenção', descricao: 'Mantenha os resultados.' },
    { dia: 'Dia 5', titulo: '🎯 Novas Metas', descricao: 'Defina novos objetivos.' },
    { dia: 'Dia 6', titulo: '🔮 Evolução Contínua', descricao: 'Continue evoluindo.' },
    { dia: 'Dia 7', titulo: '👑 Nova Identidade', descricao: 'Você se transformou.' },
    { dia: 'Dia 8', titulo: '🌟 Consolidação Final', descricao: 'Consolide a nova identidade.' },
    { dia: 'Dia 9', titulo: '🎯 Missão Cumprida', descricao: 'Parabéns! Você completou!' }
  ]
};

// ============================================
// PASSOS DO DESAFIO DAS CORES
// ============================================

const PASSOS_CORES = {
  verde: [
    '🌅 Acordar e beber 500ml de água com limão',
    '🥗 Café da manhã: Frutas + Aveia',
    '🏃 30 minutos de caminhada',
    '🥤 Suco detox no meio da manhã',
    '🍲 Almoço: Salada + Proteína magra',
    '☕ Chá digestivo após o almoço',
    '🌙 Jantar leve até 20h',
    '🧘 5 minutos de meditação'
  ],
  vermelho: [
    '🌅 500ml de água com limão + gengibre',
    '🥗 Café da manhã: Ovos + Vegetais',
    '🏃 45 minutos de corrida',
    '🥤 Suco verde com clorofila',
    '🍲 Almoço: Salada + Peixe grelhado',
    '☕ Chá de hibisco à tarde',
    '🌙 Jantar: Sopa de legumes',
    '🧘 10 minutos de meditação'
  ],
  amarelo: [
    '🌅 500ml de água com limão + cúrcuma',
    '🥗 Café da manhã: Smoothie de frutas',
    '🏃 1 hora de atividade física',
    '🥤 Suco detox com beterraba',
    '🍲 Almoço: Salada + Frango grelhado',
    '☕ Chá de erva-doce à tarde',
    '🌙 Jantar: Sopa de abóbora',
    '🧘 15 minutos de meditação'
  ],
  roxo: [
    '🌅 500ml de água com limão + canela',
    '🥗 Café da manhã: Omelete de claras',
    '🏃 1 hora de treino intenso',
    '🥤 Suco detox com couve',
    '🍲 Almoço: Salada + Carne magra',
    '☕ Chá de boldo à tarde',
    '🌙 Jantar: Sopa de legumes',
    '🧘 20 minutos de meditação'
  ]
};

// ============================================
// RECEITAS DO DESAFIO DAS CORES
// ============================================

const RECEITAS_CORES = {
  verde: [
    { nome: 'Suco Verde Detox', ingredientes: 'Maçã, espinafre, pepino, limão, gengibre', beneficio: 'Desintoxica o corpo' },
    { nome: 'Salada Detox', ingredientes: 'Alface, rúcula, pepino, tomate', beneficio: 'Rica em fibras e vitaminas' },
    { nome: 'Sopa Verde', ingredientes: 'Couve, espinafre, cebola, caldo de legumes', beneficio: 'Desintoxica e aquece' },
    { nome: 'Chá de Erva Doce', ingredientes: 'Sementes de erva doce', beneficio: 'Digestivo e calmante' }
  ],
  vermelho: [
    { nome: 'Suco de Beterraba', ingredientes: 'Beterraba, laranja, gengibre', beneficio: 'Aumenta energia e circulação' },
    { nome: 'Salada de Grão-de-bico', ingredientes: 'Grão-de-bico, tomate, cebola', beneficio: 'Proteína vegetal' },
    { nome: 'Sopa de Tomate', ingredientes: 'Tomate, manjericão, cebola', beneficio: 'Rica em licopeno' },
    { nome: 'Chá de Hibisco', ingredientes: 'Flores de hibisco', beneficio: 'Auxilia na perda de peso' }
  ],
  amarelo: [
    { nome: 'Suco de Cenoura', ingredientes: 'Cenoura, laranja, gengibre', beneficio: 'Fortalece a imunidade' },
    { nome: 'Salada de Quinoa', ingredientes: 'Quinoa, cenoura, pimentão', beneficio: 'Rica em proteínas' },
    { nome: 'Sopa de Abóbora', ingredientes: 'Abóbora, cebola, alho, leite de coco', beneficio: 'Rica em vitaminas A e C' },
    { nome: 'Chá de Capim Santo', ingredientes: 'Capim santo', beneficio: 'Calmante natural' }
  ],
  roxo: [
    { nome: 'Suco de Uva Roxa', ingredientes: 'Uva roxa, beterraba, maçã', beneficio: 'Poderoso antioxidante' },
    { nome: 'Salada de Repolho Roxo', ingredientes: 'Repolho roxo, cenoura, nozes', beneficio: 'Anti-inflamatório' },
    { nome: 'Sopa de Legumes Roxa', ingredientes: 'Cenoura, abobrinha, repolho roxo', beneficio: 'Rica em fibras' },
    { nome: 'Chá de Canela', ingredientes: 'Pau de canela', beneficio: 'Acelera o metabolismo' }
  ]
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function DesafioCoresPage() {
  const { user } = useAuth();
  const [diasCompletos, setDiasCompletos] = useState(0);
  const [desafioAtivo, setDesafioAtivo] = useState(false);
  const [selectedColor, setSelectedColor] = useState('verde');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [fotoComprovante, setFotoComprovante] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [passoExpandido, setPassoExpandido] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      carregarProgresso();
    }
  }, [user]);

  const carregarProgresso = async () => {
    try {
      const { data, error } = await supabase
        .from('desafio_cores')
        .select('*')
        .eq('usuario_id', user?.id)
        .maybeSingle();

      if (data) {
        setDiasCompletos(data.dias_completos || 0);
        setDesafioAtivo(data.ativo || false);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
  };

  const salvarProgresso = async () => {
    try {
      await supabase
        .from('desafio_cores')
        .upsert({
          usuario_id: user?.id,
          dias_completos: diasCompletos,
          ativo: desafioAtivo,
          ultima_atualizacao: new Date().toISOString()
        });
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  const iniciarDesafio = async () => {
    setDesafioAtivo(true);
    setDiasCompletos(0);
    await salvarProgresso();
  };

  const marcarDia = async () => {
    if (diasCompletos < 30 && desafioAtivo) {
      const novoDias = diasCompletos + 1;
      setDiasCompletos(novoDias);
      await salvarProgresso();
    }
  };

  const desafiarAmigo = () => {
    setDialogType('amigo');
    setShowDialog(true);
  };

  const desafiarGrupo = () => {
    setDialogType('grupo');
    setShowDialog(true);
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoComprovante(e.target.files[0]);
    }
  };

  const enviarComprovante = async () => {
    if (!fotoComprovante) {
      alert('Por favor, selecione uma foto de comprovação');
      return;
    }

    setLoading(true);
    try {
      const fileExt = fotoComprovante.name.split('.').pop();
      const fileName = `${user?.id}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('desafios')
        .upload(fileName, fotoComprovante);

      if (uploadError) throw uploadError;

      await supabase
        .from('desafio_dias')
        .insert({
          usuario_id: user?.id,
          dia: diasCompletos + 1,
          foto_url: fileName,
          data_comprovacao: new Date().toISOString()
        });

      alert('✅ Comprovante enviado com sucesso!');
      setShowDialog(false);
      setFotoComprovante(null);
      await marcarDia();
    } catch (error) {
      console.error('Erro ao enviar comprovante:', error);
      alert('Erro ao enviar comprovante. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const enviarConvite = () => {
    const linkConvite = `https://viva-plus--viva369oficial.replit.app/registrar?ref=${user?.id}`;
    const mensagem = `🚀 *DESAFIO VIVA369*\n\n`
      + `Olá! Estou te desafiando a participar do Desafio das Cores do VIVA369!\n\n`
      + `🎯 *Desafio:* ${DESAFIO_CORES[selectedColor as keyof typeof DESAFIO_CORES].nome}\n`
      + `📅 *Duração:* ${DESAFIO_CORES[selectedColor as keyof typeof DESAFIO_CORES].duracao}\n\n`
      + `🔗 *Link para participar:* ${linkConvite}\n\n`
      + `Vamos juntos nessa jornada de transformação! 💪`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
    setShowDialog(false);
  };

  const progressoTotal = Math.min((diasCompletos / 30) * 100, 100);
  const info = DESAFIO_CORES[selectedColor as keyof typeof DESAFIO_CORES];
  const Icon = info?.icone || Leaf;
  const cronograma = CRONOGRAMA_CORES[selectedColor as keyof typeof CRONOGRAMA_CORES] || [];
  const passos = PASSOS_CORES[selectedColor as keyof typeof PASSOS_CORES] || [];
  const receitas = RECEITAS_CORES[selectedColor as keyof typeof RECEITAS_CORES] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-6">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              Desafio das Cores
            </h1>
            <p className="text-white/80 text-sm">30, 60 e 90 dias de transformação</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-0 px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              {diasCompletos} / 30 dias
            </Badge>
            <Badge className="bg-white/20 text-white border-0 px-4 py-2">
              {desafioAtivo ? '🔥 Ativo' : '⏸️ Pausado'}
            </Badge>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-white/70 mb-1">
            <span>Início</span>
            <span>{Math.round(progressoTotal)}%</span>
            <span>Meta</span>
          </div>
          <Progress value={progressoTotal} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-wrap gap-3">
        {!desafioAtivo ? (
          <Button className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white" onClick={iniciarDesafio}>
            <Unlock className="h-4 w-4 mr-2" />
            Iniciar Desafio
          </Button>
        ) : (
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => setShowDialog(true)}>
            <Camera className="h-4 w-4 mr-2" />
            Completar Dia
          </Button>
        )}
        <Button 
          variant="outline" 
          className="border-slate-600 text-slate-400 hover:text-white gap-2"
          onClick={desafiarAmigo}
        >
          <Share2 className="h-4 w-4" />
          Desafiar Amigo
        </Button>
        <Button 
          variant="outline" 
          className="border-slate-600 text-slate-400 hover:text-white gap-2"
          onClick={desafiarGrupo}
        >
          <Users className="h-4 w-4" />
          Desafiar Grupo
        </Button>
      </div>

      {/* Fase Atual */}
      {desafioAtivo && info && (
        <Card className={cn("border-2", info.border, info.bg)}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={cn("p-3 rounded-xl bg-gradient-to-r", info.cor, "text-white")}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className={cn("text-xl", info.text)}>{info.nome}</CardTitle>
                <CardDescription className="text-slate-400">{info.descricao}</CardDescription>
              </div>
              <Badge className={cn("ml-auto", info.border, info.text)}>
                {info.duracao}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">{info.beneficios}</p>
          </CardContent>
        </Card>
      )}

      {/* Tabs - ESTRUTURA IGUAL À LIMPEZA HEPÁTICA */}
      <Tabs defaultValue="conograma" className="w-full">
        <TabsList className="grid grid-cols-4 bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="conograma" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <BookOpen className="h-4 w-4 mr-2" />
            Conograma
          </TabsTrigger>
          <TabsTrigger value="receitas" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Utensils className="h-4 w-4 mr-2" />
            Receitas
          </TabsTrigger>
          <TabsTrigger value="passoapasso" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
            <Target className="h-4 w-4 mr-2" />
            Passo a Passo
          </TabsTrigger>
          <TabsTrigger value="progresso" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
            <TrendingUp className="h-4 w-4 mr-2" />
            Progresso
          </TabsTrigger>
        </TabsList>

        {/* TAB 1 - CONOGRAMA */}
        <TabsContent value="conograma" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Timer className="h-5 w-5 text-emerald-400" />
                Conograma - {info?.duracao || '30 Dias'}
              </CardTitle>
              <CardDescription className="text-slate-400">
                Acompanhe seu progresso dia a dia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Progresso</span>
                  <span className="text-sm text-emerald-400">{diasCompletos} / 30 dias</span>
                </div>
                <Progress value={progressoTotal} className="h-2 bg-slate-700" />
              </div>

              {/* Lista de dias do cronograma */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {cronograma.map((item, idx) => {
                  const isCompleted = idx < diasCompletos;
                  const isCurrent = idx === diasCompletos;
                  return (
                    <div 
                      key={idx} 
                      className={cn(
                        "border rounded-lg p-4 transition-all",
                        isCompleted ? "border-emerald-500/30 bg-emerald-500/5" :
                        isCurrent ? "border-amber-500/30 bg-amber-500/5" :
                        "border-slate-700 bg-slate-800/50"
                      )}
                      onClick={() => setPassoExpandido(passoExpandido === item.dia ? null : item.dia)}
                    >
                      <div className="flex items-center gap-3 cursor-pointer">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                          isCompleted ? "bg-emerald-500 text-white" :
                          isCurrent ? "bg-amber-500 text-white animate-pulse" :
                          "bg-slate-700 text-slate-400"
                        )}>
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className={cn(
                            "font-medium",
                            isCompleted ? "text-emerald-400" :
                            isCurrent ? "text-amber-400" :
                            "text-white"
                          )}>
                            {item.dia}
                          </p>
                          <p className="text-sm text-slate-400">{item.titulo}</p>
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 text-slate-400 transition-transform",
                          passoExpandido === item.dia && "rotate-180"
                        )} />
                      </div>

                      {passoExpandido === item.dia && (
                        <div className="mt-3 pl-11">
                          <p className="text-sm text-slate-300">{item.descricao}</p>
                          <div className="mt-2 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                            <p className="text-xs text-emerald-400">📋 Dica do dia</p>
                            <p className="text-sm text-slate-300 mt-1">{item.descricao}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2 - RECEITAS */}
        <TabsContent value="receitas" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Utensils className="h-5 w-5 text-emerald-400" />
                Receitas da Fase
              </CardTitle>
              <CardDescription className="text-slate-400">
                Receitas exclusivas para o {info?.nome || 'Desafio'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {receitas.map((receita, idx) => (
                  <Card key={idx} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium">{receita.nome}</h4>
                      <p className="text-xs text-slate-400 mt-1">🍽️ {receita.ingredientes}</p>
                      <p className="text-xs text-emerald-400 mt-2">💚 {receita.beneficio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3 - PASSO A PASSO */}
        <TabsContent value="passoapasso" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                Passo a Passo
              </CardTitle>
              <CardDescription className="text-slate-400">
                Siga os passos diários do desafio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {passos.map((passo, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-300">{passo}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4 - PROGRESSO */}
        <TabsContent value="progresso" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Seu Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Dias Completos</span>
                    <span className="text-emerald-400">{diasCompletos}/30</span>
                  </div>
                  <Progress value={progressoTotal} className="h-3 bg-slate-700" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(DESAFIO_CORES).map((key) => {
                    const c = DESAFIO_CORES[key as keyof typeof DESAFIO_CORES];
                    const isActive = key === selectedColor;
                    const corObj = DESAFIO_CORES[key as keyof typeof DESAFIO_CORES];
                    return (
                      <div 
                        key={key} 
                        className={cn(
                          "text-center p-3 rounded-lg border transition-all cursor-pointer",
                          isActive ? "border-emerald-500/30 bg-emerald-500/10" : "bg-slate-700/30 border-slate-600"
                        )}
                        onClick={() => setSelectedColor(key)}
                      >
                        <div className="text-2xl">{corObj.emoji}</div>
                        <p className={cn("text-xs", isActive ? corObj.text : "text-slate-500")}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <p className="text-sm text-slate-400 text-center">
                    {diasCompletos === 0 ? 'Comece seu desafio hoje!' :
                     diasCompletos >= 30 ? '🎉 Você completou o desafio!' :
                     `Continue assim! Você já completou ${diasCompletos} dias!`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog - Completar Dia / Desafiar */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              {dialogType === 'amigo' || dialogType === 'grupo' ? (
                <>
                  <Share2 className="h-5 w-5 text-emerald-400" />
                  {dialogType === 'amigo' ? 'Desafiar Amigo' : 'Desafiar Grupo'}
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5 text-emerald-400" />
                  Completar Dia
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {dialogType === 'amigo' ? 'Compartilhe o desafio com seu amigo' :
               dialogType === 'grupo' ? 'Desafie um grupo no WhatsApp' :
               'Envie uma foto comprovando que completou o dia'}
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'amigo' || dialogType === 'grupo' ? (
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <p className="text-sm text-slate-300">
                  {dialogType === 'amigo' ? 
                    'Você vai enviar um convite para seu amigo participar do desafio!' :
                    'Você vai enviar um convite para um grupo participar do desafio!'}
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2" onClick={enviarConvite}>
                <Send className="h-4 w-4" />
                Enviar Convite
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoUpload}
                  className="hidden"
                  id="foto-upload"
                />
                <label htmlFor="foto-upload" className="cursor-pointer">
                  {fotoComprovante ? (
                    <div>
                      <Image className="h-12 w-12 mx-auto text-emerald-400" />
                      <p className="text-sm text-slate-300 mt-2">{fotoComprovante.name}</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 mx-auto text-slate-500" />
                      <p className="text-sm text-slate-400 mt-2">Clique para selecionar uma foto</p>
                      <p className="text-xs text-slate-500">Tire uma foto comprovando sua atividade</p>
                    </div>
                  )}
                </label>
              </div>
              <p className="text-xs text-slate-500 text-center">
                A foto será compartilhada com seu amigo ou grupo como comprovação
              </p>
              <Button 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
                onClick={enviarComprovante}
                disabled={!fotoComprovante || loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Confirmar Dia
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
