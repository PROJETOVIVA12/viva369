import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Heart, Pill, Scissors, Activity, Target, 
  Apple, Battery, Moon, Brain, Save, 
  Loader2, CheckCircle, AlertCircle, Edit,
  X, FileText, Clipboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnamneseData {
  id?: string;
  doencas: string;
  medicamentos: string;
  cirurgias: string;
  habitos: string;
  objetivo_principal: string;
  restricoes_alimentares: string;
  nivel_atividade: string;
  horas_sono: string;
  estresse: string;
}

interface AnamneseProps {
  avaliacaoId: string;
}

export default function Anamnese({ avaliacaoId }: AnamneseProps) {
  const [open, setOpen] = useState(false);
  const [dados, setDados] = useState<AnamneseData>({
    doencas: '',
    medicamentos: '',
    cirurgias: '',
    habitos: '',
    objetivo_principal: '',
    restricoes_alimentares: '',
    nivel_atividade: '',
    horas_sono: '',
    estresse: ''
  });
  const [loading, setLoading] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [temAnamnese, setTemAnamnese] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  useEffect(() => {
    if (avaliacaoId) {
      carregarAnamnese();
    }
  }, [avaliacaoId]);

  const carregarAnamnese = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('anamnese')
        .select('*')
        .eq('avaliacao_id', avaliacaoId)
        .maybeSingle();

      if (data) {
        setDados(data);
        setTemAnamnese(true);
      } else {
        setTemAnamnese(false);
      }
    } catch (error) {
      console.error('Erro ao carregar anamnese:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarAnamnese = async () => {
    setSalvando(true);
    setMensagem(null);
    try {
      const { error } = await supabase
        .from('anamnese')
        .upsert({
          avaliacao_id: avaliacaoId,
          ...dados
        });

      if (error) throw error;
      setTemAnamnese(true);
      setMensagem({ tipo: 'sucesso', texto: '✅ Anamnese salva com sucesso!' });
      setTimeout(() => setMensagem(null), 3000);
      setTimeout(() => setOpen(false), 1500);
    } catch (error) {
      console.error('Erro ao salvar anamnese:', error);
      setMensagem({ tipo: 'erro', texto: '❌ Erro ao salvar anamnese. Tente novamente.' });
    } finally {
      setSalvando(false);
    }
  };

  const handleChange = (campo: keyof AnamneseData, valor: string) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      <Button
        variant="outline"
        className={cn(
          "gap-2 border-slate-600 hover:border-emerald-500",
          temAnamnese ? "text-emerald-400" : "text-slate-400"
        )}
        onClick={() => setOpen(true)}
      >
        {temAnamnese ? (
          <>
            <Clipboard className="h-4 w-4" />
            <span>Anamnese Preenchida ✅</span>
          </>
        ) : (
          <>
            <FileText className="h-4 w-4" />
            <span>Preencher Anamnese</span>
          </>
        )}
      </Button>

      {/* Modal/Dialog da Anamnese */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-emerald-400" />
              Anamnese
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Histórico de saúde e hábitos do cliente
            </DialogDescription>
          </DialogHeader>

          {mensagem && (
            <Alert className={cn(
              mensagem.tipo === 'sucesso' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30',
              'mb-4'
            )}>
              <AlertDescription className={cn(
                mensagem.tipo === 'sucesso' ? 'text-emerald-400' : 'text-red-400'
              )}>
                {mensagem.texto}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            {/* Linha 1 - Doenças */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Heart className="h-4 w-4 text-emerald-400" />
                Doenças e Histórico de Saúde
              </Label>
              <Textarea
                value={dados.doencas}
                onChange={(e) => handleChange('doencas', e.target.value)}
                placeholder="Informe doenças crônicas, histórico familiar..."
                className="bg-slate-700 border-slate-600 text-white min-h-[60px] mt-1"
              />
            </div>

            {/* Linha 2 - Medicamentos */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Pill className="h-4 w-4 text-emerald-400" />
                Medicamentos Contínuos
              </Label>
              <Textarea
                value={dados.medicamentos}
                onChange={(e) => handleChange('medicamentos', e.target.value)}
                placeholder="Medicamentos que usa regularmente..."
                className="bg-slate-700 border-slate-600 text-white min-h-[60px] mt-1"
              />
            </div>

            {/* Linha 3 - Cirurgias */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Scissors className="h-4 w-4 text-emerald-400" />
                Cirurgias ou Procedimentos
              </Label>
              <Textarea
                value={dados.cirurgias}
                onChange={(e) => handleChange('cirurgias', e.target.value)}
                placeholder="Cirurgias já realizadas..."
                className="bg-slate-700 border-slate-600 text-white min-h-[60px] mt-1"
              />
            </div>

            {/* Linha 4 - Hábitos */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                Hábitos Alimentares e de Vida
              </Label>
              <Textarea
                value={dados.habitos}
                onChange={(e) => handleChange('habitos', e.target.value)}
                placeholder="Descreva seus hábitos diários..."
                className="bg-slate-700 border-slate-600 text-white min-h-[60px] mt-1"
              />
            </div>

            {/* Linha 5 - Objetivo */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-400" />
                Objetivo Principal
              </Label>
              <Textarea
                value={dados.objetivo_principal}
                onChange={(e) => handleChange('objetivo_principal', e.target.value)}
                placeholder="Qual seu objetivo com o projeto?"
                className="bg-slate-700 border-slate-600 text-white min-h-[60px] mt-1"
              />
            </div>

            {/* Linha 6 - Restrições */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Apple className="h-4 w-4 text-emerald-400" />
                Restrições Alimentares ou Alergias
              </Label>
              <Textarea
                value={dados.restricoes_alimentares}
                onChange={(e) => handleChange('restricoes_alimentares', e.target.value)}
                placeholder="Alergias, intolerâncias..."
                className="bg-slate-700 border-slate-600 text-white min-h-[60px] mt-1"
              />
            </div>

            {/* Linha 7 - Nível de Atividade */}
            <div>
              <Label className="text-slate-400 flex items-center gap-2">
                <Battery className="h-4 w-4 text-emerald-400" />
                Nível de Atividade Física
              </Label>
              <Select 
                value={dados.nivel_atividade}
                onValueChange={(v) => handleChange('nivel_atividade', v)}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="Sedentário">Sedentário</SelectItem>
                  <SelectItem value="Leve">Leve (1-2x/semana)</SelectItem>
                  <SelectItem value="Moderado">Moderado (3-4x/semana)</SelectItem>
                  <SelectItem value="Intenso">Intenso (5+ x/semana)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Linha 8 - Horas de Sono */}
            <div>
              <Label className="text-slate-400 flex items-center gap-2">
                <Moon className="h-4 w-4 text-emerald-400" />
                Média de Horas de Sono
              </Label>
              <Input
                type="text"
                value={dados.horas_sono}
                onChange={(e) => handleChange('horas_sono', e.target.value)}
                placeholder="Ex: 7 horas"
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            {/* Linha 9 - Nível de Estresse */}
            <div className="md:col-span-2">
              <Label className="text-slate-400 flex items-center gap-2">
                <Brain className="h-4 w-4 text-emerald-400" />
                Nível de Estresse
              </Label>
              <Select 
                value={dados.estresse}
                onValueChange={(v) => handleChange('estresse', v)}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="Baixo">Baixo</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="border-slate-600 text-slate-400"
            >
              Fechar
            </Button>
            <Button 
              className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2"
              onClick={salvarAnamnese}
              disabled={salvando}
            >
              {salvando ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {salvando ? 'Salvando...' : 'Salvar Anamnese'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
