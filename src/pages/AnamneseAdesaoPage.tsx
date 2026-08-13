import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  Heart, Target, Users, Award, Sparkles,
  CheckCircle, ArrowRight, User, Mail, Phone,
  Calendar, Clock, Brain, Star, Zap,
  Shield, Crown, Gem, Sun, Moon, HeartPulse,
  Activity, Scale, Droplet, Flame, Wind
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const PERGUNTAS = [
  { id: 'nome', titulo: '🌟 Qual é o seu nome?', descricao: 'Queremos te chamar pelo nome nessa jornada', tipo: 'input', placeholder: 'Digite seu nome completo', obrigatorio: true },
  { id: 'email', titulo: '📧 Qual é o seu email?', descricao: 'Vamos te manter informado sobre sua jornada', tipo: 'input', placeholder: 'seu@email.com', obrigatorio: true },
  { id: 'telefone', titulo: '📱 Qual é o seu WhatsApp?', descricao: 'Para falarmos com você pessoalmente', tipo: 'input', placeholder: '(11) 99999-9999', obrigatorio: true },
  { id: 'objetivo', titulo: '🎯 Qual é o seu PROPÓSITO no VIVA369?', descricao: 'O que você realmente quer transformar em você?', tipo: 'select', opcoes: ['💪 Emagrecer e definir o corpo', '🔄 Mudar hábitos alimentares', '🧠 Melhorar a saúde mental', '⚡ Aumentar energia e disposição', '❤️ Prevenir doenças', '🏆 Superar um desafio pessoal', '🌟 Transformar minha vida por completo', '🎯 Ter mais qualidade de vida'], obrigatorio: true },
  { id: 'motivacao', titulo: '🔥 O que te MOTIVA a mudar?', descricao: 'Qual é o gatilho que te trouxe até aqui?', tipo: 'select', opcoes: ['😔 Insatisfação com meu corpo', '💔 Problemas de saúde na família', '👨‍👩‍👧‍👦 Quero viver mais e melhor para minha família', '🚀 Quero alcançar meu melhor eu', '🏋️‍♂️ Quero voltar a praticar atividades', '😌 Quero me sentir bem comigo mesmo', '💪 Quero me desafiar', '🌟 Quero inspirar outras pessoas'], obrigatorio: true },
  { id: 'desafio', titulo: '🏆 Qual o seu DESAFIO PRINCIPAL?', descricao: 'O que você considera mais difícil de superar?', tipo: 'select', opcoes: ['🍔 Falta de disciplina alimentar', '⏰ Falta de tempo para me cuidar', '😩 Procrastinação e preguiça', '📱 Dependência de telas e redes sociais', '🍷 Hábitos nocivos (álcool, tabaco)', '😰 Ansiedade e estresse', '💤 Falta de sono e descanso', '🤔 Falta de motivação'], obrigatorio: true },
  { id: 'compromisso', titulo: '💚 Qual o seu NÍVEL DE COMPROMISSO?', descricao: 'Quanto você está disposto(a) a se dedicar?', tipo: 'select', opcoes: ['🌟 100% - Vou transformar minha vida!', '🔥 80% - Estou muito motivado(a)!', '💪 60% - Vou dar o meu melhor!', '🌱 40% - Estou começando devagar...', '🌿 20% - Quero tentar...'], obrigatorio: true },
  { id: 'metas', titulo: '🎯 Quais são suas METAS ESPECÍFICAS?', descricao: 'Selecione as que mais combinam com você', tipo: 'multiselect', opcoes: ['📉 Perder 5-10kg', '📉 Perder 10-20kg', '📉 Perder mais de 20kg', '💪 Ganhar massa muscular', '🧘 Reduzir estresse', '😴 Melhorar qualidade do sono', '🥗 Melhorar alimentação', '🏃 Correr 5km', '🏋️ Fazer exercícios regularmente', '🧠 Melhorar foco e concentração'], obrigatorio: true },
  { id: 'mensagem', titulo: '💌 O que você quer DIZER para si mesmo(a)?', descricao: 'Deixe uma mensagem para o seu EU do futuro', tipo: 'texto', placeholder: 'Daqui a 90 dias, eu vou estar...', obrigatorio: false }
];

export default function AnamneseAdesaoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const refId = searchParams.get('ref') || '';
  const desafio = searchParams.get('desafio') || '';

  const handleResposta = (id: string, valor: any) => {
    setRespostas(prev => ({ ...prev, [id]: valor }));
    setErro('');
  };

  const proximo = () => {
    const perguntaAtual = PERGUNTAS[etapa];
    if (perguntaAtual.obrigatorio && !respostas[perguntaAtual.id]) {
      setErro('Por favor, responda esta pergunta antes de continuar.');
      return;
    }
    setErro('');
    if (etapa < PERGUNTAS.length - 1) {
      setEtapa(etapa + 1);
    } else {
      finalizar();
    }
  };

  const voltar = () => {
    if (etapa > 0) setEtapa(etapa - 1);
  };

  const finalizar = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('anamnese_adesao')
        .insert({
          nome: respostas.nome,
          email: respostas.email,
          telefone: respostas.telefone,
          objetivo: respostas.objetivo,
          motivacao: respostas.motivacao,
          desafio: respostas.desafio,
          compromisso: respostas.compromisso,
          metas: respostas.metas,
          mensagem: respostas.mensagem || '',
          ref_id: refId,
          desafio_id: desafio,
          criado_em: new Date().toISOString()
        });

      if (error) throw error;

      // Abrir WhatsApp do Diretor com mensagem automática
      const mensagemWhatsApp = `Olá! Acabei de preencher minha anamnese no VIVA369 e quero iniciar minha jornada! 🚀`;
      const url = `https://wa.me/557598125249?text=${encodeURIComponent(mensagemWhatsApp)}`;
      
      // Abrir em nova aba
      window.open(url, '_blank');
      
      // Redirecionar para página de sucesso
      navigate('/obrigado-adesao');
    } catch (err) {
      console.error('Erro ao salvar:', err);
      setErro('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const perguntaAtual = PERGUNTAS[etapa];
  const progresso = ((etapa + 1) / PERGUNTAS.length) * 100;

  const renderPergunta = () => {
    const { id, titulo, descricao, tipo, opcoes, placeholder } = perguntaAtual;
    const valor = respostas[id] || '';

    switch (tipo) {
      case 'input':
        return (
          <div>
            <Label className="text-white text-lg">{titulo}</Label>
            <p className="text-sm text-slate-400 mb-3">{descricao}</p>
            <Input
              type={id === 'email' ? 'email' : 'text'}
              value={valor}
              onChange={(e) => handleResposta(id, e.target.value)}
              placeholder={placeholder}
              className="bg-slate-700 border-slate-600 text-white text-lg p-6"
            />
          </div>
        );
      case 'select':
        return (
          <div>
            <Label className="text-white text-lg">{titulo}</Label>
            <p className="text-sm text-slate-400 mb-3">{descricao}</p>
            <Select value={valor} onValueChange={(v) => handleResposta(id, v)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white text-lg p-6">
                <SelectValue placeholder="Selecione uma opção..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {opcoes?.map((opcao: string) => (
                  <SelectItem key={opcao} value={opcao} className="text-white hover:bg-slate-600">
                    {opcao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'multiselect':
        return (
          <div>
            <Label className="text-white text-lg">{titulo}</Label>
            <p className="text-sm text-slate-400 mb-3">{descricao}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {opcoes?.map((opcao: string) => {
                const selecionado = Array.isArray(valor) && valor.includes(opcao);
                return (
                  <div
                    key={opcao}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2",
                      selecionado
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500"
                    )}
                    onClick={() => {
                      const current = Array.isArray(valor) ? valor : [];
                      const novo = current.includes(opcao)
                        ? current.filter((v: string) => v !== opcao)
                        : [...current, opcao];
                      handleResposta(id, novo);
                    }}
                  >
                    <Checkbox checked={selecionado} className="pointer-events-none" />
                    <span className="text-sm">{opcao}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'texto':
        return (
          <div>
            <Label className="text-white text-lg">{titulo}</Label>
            <p className="text-sm text-slate-400 mb-3">{descricao}</p>
            <textarea
              value={valor}
              onChange={(e) => handleResposta(id, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-700 border-slate-600 text-white text-lg p-4 rounded-lg min-h-[120px]"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 flex items-center justify-center">
      <Card className="bg-slate-800 border-slate-700 max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <HeartPulse className="h-6 w-6 text-emerald-400" />
                Sua Jornada VIVA369
              </CardTitle>
              <CardDescription className="text-slate-400">
                {etapa + 1} de {PERGUNTAS.length} • {Math.round(progresso)}% completo
              </CardDescription>
            </div>
            {refId && (
              <Badge className="bg-emerald-500/20 text-emerald-400">
                <Users className="h-3 w-3 mr-1" />
                Convidado por um amigo
              </Badge>
            )}
          </div>
          <Progress value={progresso} className="h-2 bg-slate-700" />
        </CardHeader>

        <CardContent className="py-6">
          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg mb-4">
              <p className="text-red-400 text-sm">{erro}</p>
            </div>
          )}
          <div className="min-h-[300px]">{renderPergunta()}</div>
        </CardContent>

        <CardFooter className="flex justify-between gap-3 pt-4 border-t border-slate-700">
          <Button variant="outline" onClick={voltar} disabled={etapa === 0} className="border-slate-600 text-slate-400">
            Voltar
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2" onClick={proximo} disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Salvando...
              </div>
            ) : etapa === PERGUNTAS.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Concluir e Falar com Especialista
              </>
            ) : (
              <>
                Próximo <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
