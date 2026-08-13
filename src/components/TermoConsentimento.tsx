import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface TermoConsentimentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function TermoConsentimento({ open, onOpenChange, onAccept }: TermoConsentimentoProps) {
  const [aceito, setAceito] = useState(false);
  const [erro, setErro] = useState('');

  const handleAccept = () => {
    if (!aceito) {
      setErro('Você precisa aceitar os termos para continuar.');
      return;
    }
    setErro('');
    onAccept();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-amber-400" />
            Termo de Consentimento e Responsabilidade
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Leia atentamente antes de prosseguir
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-slate-300 text-sm">
          <Alert className="bg-amber-500/10 border-amber-500/30">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-400">
              ⚠️ O VIVA369 é uma plataforma de incentivo à saúde, não substitui orientação médica.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium">1. DECLARAÇÃO DE CIÊNCIA</h4>
            <p>
              Declaro que estou ciente de que o VIVA369 é uma plataforma digital que oferece 
              informações, desafios e orientações gerais sobre saúde e bem-estar, e que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>As informações aqui contidas NÃO substituem consultas médicas;</li>
              <li>Devo informar meu médico sobre qualquer mudança em minha rotina;</li>
              <li>Tenho total responsabilidade sobre as decisões que tomo em relação à minha saúde;</li>
              <li>O VIVA369 não se responsabiliza por resultados individuais;</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium">2. DECLARAÇÃO DE SAÚDE</h4>
            <p>
              Declaro que tenho ciência da importância de informar minhas condições de saúde:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Doenças crônicas (diabetes, hipertensão, etc.);</li>
              <li>Alergias alimentares ou medicamentosas;</li>
              <li>Condições específicas que possam ser afetadas por mudanças alimentares;</li>
              <li>Uso de medicamentos controlados;</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium">3. RECOMENDAÇÕES</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>✅ Consultar um médico antes de iniciar qualquer programa;</li>
              <li>✅ Informar-se sobre possíveis contraindicações;</li>
              <li>✅ Respeitar os limites do próprio corpo;</li>
              <li>✅ Buscar orientação profissional quando necessário;</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium">4. RESPONSABILIDADE</h4>
            <p className="text-slate-400">
              Ao aceitar este termo, reconheço que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Sou o único responsável por minha saúde;</li>
              <li>O VIVA369 é uma ferramenta de apoio e incentivo;</li>
              <li>Nenhum resultado é garantido;</li>
              <li>Devo buscar ajuda médica em caso de sintomas adversos;</li>
            </ul>
          </div>

          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
            <p className="text-emerald-400 text-sm font-medium">
              💚 O VIVA369 acredita que a saúde é uma jornada pessoal e única. 
              Estamos aqui para apoiar, incentivar e acompanhar você, 
              sempre respeitando suas escolhas e seu corpo.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2 w-full">
            <Checkbox 
              id="aceito" 
              checked={aceito}
              onCheckedChange={(checked) => setAceito(checked as boolean)}
            />
            <Label htmlFor="aceito" className="text-slate-300 cursor-pointer">
              Li e concordo com os termos acima
            </Label>
          </div>
          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-400"
              onClick={() => onOpenChange(false)}
            >
              Recusar
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-emerald-500 to-amber-500 text-white"
              onClick={handleAccept}
            >
              Aceitar e Continuar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
