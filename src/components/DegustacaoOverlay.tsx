import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Unlock, Eye, Sparkles, Crown, 
  Gift, ArrowRight, X, Heart, Zap,
  Users, Target, Award, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DegustacaoOverlayProps {
  children: React.ReactNode;
  pagina: string;
  titulo: string;
  descricao: string;
  mostraBotao?: boolean;
}

export default function DegustacaoOverlay({ 
  children, 
  pagina, 
  titulo, 
  descricao, 
  mostraBotao = true 
}: DegustacaoOverlayProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInfo(true);
  };

  return (
    <>
      <div className="relative group">
        {/* Conteúdo com blur */}
        <div className="relative">
          <div className="filter blur-sm opacity-50 pointer-events-none select-none">
            {children}
          </div>
          
          {/* Overlay de bloqueio */}
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handleClick}
          >
            <div className="bg-gradient-to-r from-emerald-600/90 via-amber-500/90 to-purple-600/90 backdrop-blur-sm p-6 rounded-2xl text-center max-w-sm border border-white/20 shadow-2xl">
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg">🔒 Área Restrita</h3>
              <p className="text-white/80 text-sm mt-2">
                Faça parte do VIVA369 para acessar esta funcionalidade
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                <Badge className="bg-white/20 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Transformação
                </Badge>
                <Badge className="bg-white/20 text-white border-0">
                  <Users className="h-3 w-3 mr-1" />
                  Comunidade
                </Badge>
                <Badge className="bg-white/20 text-white border-0">
                  <Award className="h-3 w-3 mr-1" />
                  Resultados
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/70 text-xs">
                <Eye className="h-3 w-3" />
                <span>Você está visualizando em modo degustação</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge de degustação */}
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 animate-pulse">
            <Eye className="h-3 w-3 mr-1" />
            Degustação
          </Badge>
        </div>
      </div>

      {/* Modal de informação */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              {titulo}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {descricao}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 p-4 rounded-xl border border-emerald-500/20">
              <h4 className="text-white font-medium flex items-center gap-2">
                <Gift className="h-4 w-4 text-emerald-400" />
                O que você vai ganhar ao aderir?
              </h4>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Acesso completo a todas as funcionalidades</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Acompanhamento personalizado da sua saúde</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Comunidade exclusiva VIVA+</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Desafios e premiações exclusivas</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
              <p className="text-sm text-slate-300">
                💰 <span className="text-emerald-400 font-medium">R$ 250,00</span> - Investimento único 
                para transformar sua vida para sempre
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Parcelamento disponível no cartão
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2">
            <Link to="/anamnese-adesao" className="w-full">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2 py-6 text-lg">
                <Unlock className="h-5 w-5" />
                QUERO PARTICIPAR AGORA
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => setShowInfo(false)}
              className="w-full border-slate-600 text-slate-400"
            >
              Continuar visualizando
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
