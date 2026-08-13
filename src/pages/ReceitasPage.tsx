import { cn } from "@/lib/utils";
import React, { useState } from 'react';
import { Utensils, Clock, Flame, Heart, Star, ChevronDown, ChevronUp, Users, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Receitas completas dos desafios
const RECEITAS = [
  { 
    id: 1, 
    nome: 'Salada de Quinoa com Legumes', 
    tempo: '20min', 
    calorias: 250,
    dificuldade: 'Fácil',
    tags: ['Vegetariano', 'Vegano', 'Sem Glúten'],
    ingredientes: [
      '1 xícara de quinoa',
      '2 xícaras de água',
      '1 cenoura ralada',
      '1 pepino em cubos',
      '1 tomate picado',
      'Suco de limão',
      'Azeite, sal e pimenta'
    ],
    preparo: [
      'Lave bem a quinoa e cozinhe em água fervente por 15 minutos',
      'Deixe esfriar e misture com os legumes',
      'Tempere com suco de limão, azeite, sal e pimenta',
      'Sirva gelado como refeição leve'
    ],
    beneficios: 'Rica em proteínas, fibras e vitaminas. Ideal para recuperação muscular.'
  },
  {
    id: 2,
    nome: 'Frango Grelhado com Abóbora',
    tempo: '30min',
    calorias: 320,
    dificuldade: 'Médio',
    tags: ['Proteico', 'Low Carb', 'Sem Glúten'],
    ingredientes: [
      '2 filés de peito de frango',
      '200g de abóbora em cubos',
      '1 colher de azeite',
      'Ervas finas a gosto',
      'Sal e pimenta'
    ],
    preparo: [
      'Tempere o frango com sal, pimenta e ervas',
      'Grelhe em fogo médio até dourar',
      'Asse a abóbora no forno com azeite e sal',
      'Sirva com salada verde'
    ],
    beneficios: 'Alto teor de proteína, baixo carboidrato, rico em vitamina A.'
  },
  {
    id: 3,
    nome: 'Smoothie Verde Detox',
    tempo: '10min',
    calorias: 180,
    dificuldade: 'Fácil',
    tags: ['Detox', 'Vitaminas', 'Vegano'],
    ingredientes: [
      '1 maçã verde',
      '1 punhado de espinafre',
      '1/2 pepino',
      'Suco de 1 limão',
      '1 colher de gengibre ralado',
      '200ml de água de coco'
    ],
    preparo: [
      'Lave bem todos os ingredientes',
      'Bata no liquidificador com a água de coco',
      'Coe se preferir e sirva gelado'
    ],
    beneficios: 'Desintoxica o fígado, rico em antioxidantes e vitaminas.'
  },
  {
    id: 4,
    nome: 'Omelete de Claras com Vegetais',
    tempo: '15min',
    calorias: 220,
    dificuldade: 'Fácil',
    tags: ['Proteico', 'Low Carb', 'Cetogênico'],
    ingredientes: [
      '4 claras de ovo',
      '1/2 cebola picada',
      '1/2 pimentão',
      'Espinafre a gosto',
      'Sal e pimenta'
    ],
    preparo: [
      'Refogue os vegetais em uma frigideira antiaderente',
      'Adicione as claras batidas',
      'Cozinhe em fogo baixo até firmar',
      'Sirva quente'
    ],
    beneficios: 'Baixo teor de gordura, alta proteína, ideal para definição muscular.'
  }
];

export default function ReceitasPage() {
  const [receitaSelecionada, setReceitaSelecionada] = useState<typeof RECEITAS[0] | null>(null);
  const [favoritas, setFavoritas] = useState<number[]>([]);

  const toggleFavorita = (id: number) => {
    setFavoritas(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Receitas Saudáveis</h1>
          <p className="text-slate-400">Receitas dos desafios para sua jornada de saúde</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          <Heart className="h-3 w-3 mr-1" />
          {RECEITAS.length} receitas
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {RECEITAS.map((receita) => {
          const isFavorita = favoritas.includes(receita.id);
          return (
            <Card key={receita.id} className="bg-slate-800 border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer group" 
                  onClick={() => setReceitaSelecionada(receita)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Utensils className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-sm">{receita.nome}</CardTitle>
                      <CardDescription className="text-slate-400 text-xs flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {receita.tempo}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          {receita.calorias} cal
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-400 hover:text-red-400"
                    onClick={(e) => { e.stopPropagation(); toggleFavorita(receita.id); }}
                  >
                    <Heart className={cn("h-4 w-4", isFavorita && "fill-red-500 text-red-500")} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-1">
                  {receita.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className={cn("h-3 w-3", i <= 4 ? "fill-yellow-500 text-yellow-500" : "text-slate-600")} />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">(4.0)</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 gap-2"
                  onClick={(e) => { e.stopPropagation(); setReceitaSelecionada(receita); }}
                >
                  Ver Receita
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Modal da Receita */}
      <Dialog open={!!receitaSelecionada} onOpenChange={() => setReceitaSelecionada(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          {receitaSelecionada && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white text-xl">{receitaSelecionada.nome}</DialogTitle>
                <DialogDescription className="text-slate-400 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {receitaSelecionada.tempo}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    {receitaSelecionada.calorias} cal
                  </span>
                  <span className="flex items-center gap-1">
                    {receitaSelecionada.dificuldade}
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-emerald-400 font-medium text-sm mb-2">🥗 Benefícios</h4>
                  <p className="text-slate-300 text-sm">{receitaSelecionada.beneficios}</p>
                </div>

                <div>
                  <h4 className="text-emerald-400 font-medium text-sm mb-2">🛒 Ingredientes</h4>
                  <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                    {receitaSelecionada.ingredientes.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-emerald-400 font-medium text-sm mb-2">👨‍🍳 Modo de Preparo</h4>
                  <ol className="list-decimal list-inside text-slate-300 text-sm space-y-1">
                    {receitaSelecionada.preparo.map((passo, idx) => (
                      <li key={idx}>{passo}</li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2 flex-1">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-400">
                    <Heart className={cn("h-4 w-4", favoritas.includes(receitaSelecionada.id) && "fill-red-500 text-red-500")} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
