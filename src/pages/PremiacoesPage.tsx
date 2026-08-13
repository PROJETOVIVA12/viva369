import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import {
  Trophy,
  Star,
  Crown,
  Loader2,
} from 'lucide-react';

interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
  criterio: 'dias' | 'indicacoes' | 'pontos';
  meta: number;
}

interface RankingItem {
  posicao: number;
  nome: string;
  pontos: number;
}

const MEDALHAS: Conquista[] = [
  {
    id: '1',
    titulo: 'Primeiros Passos',
    descricao: 'Complete seu primeiro dia no VIVA369',
    icon: '🌱',
    criterio: 'dias',
    meta: 1,
  },
  {
    id: '2',
    titulo: 'Consistência',
    descricao: 'Complete 7 dias na jornada',
    icon: '🔥',
    criterio: 'dias',
    meta: 7,
  },
  {
    id: '3',
    titulo: '30 Dias',
    descricao: 'Complete 30 dias na jornada',
    icon: '💚',
    criterio: 'dias',
    meta: 30,
  },
  {
    id: '4',
    titulo: 'Meio Caminho',
    descricao: 'Complete 45 dias na jornada',
    icon: '🌿',
    criterio: 'dias',
    meta: 45,
  },
  {
    id: '5',
    titulo: 'Transformação',
    descricao: 'Complete 90 dias na jornada',
    icon: '🏆',
    criterio: 'dias',
    meta: 90,
  },
  {
    id: '6',
    titulo: 'Influenciador',
    descricao: 'Tenha 5 indicações confirmadas',
    icon: '🌟',
    criterio: 'indicacoes',
    meta: 5,
  },
  {
    id: '7',
    titulo: 'Líder Top',
    descricao: 'Tenha 10 indicações confirmadas',
    icon: '👑',
    criterio: 'indicacoes',
    meta: 10,
  },
  {
    id: '8',
    titulo: 'Mil Pontos',
    descricao: 'Alcance 1.000 pontos VIVA',
    icon: '⚡',
    criterio: 'pontos',
    meta: 1000,
  },
];

export default function PremiacoesPage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [diasNaJornada, setDiasNaJornada] =
    useState(0);
  const [totalIndicacoes, setTotalIndicacoes] =
    useState(0);
  const [pontos, setPontos] =
    useState(0);
  const [ranking, setRanking] =
    useState<RankingItem[]>([]);

  useEffect(() => {
    if (user) {
      fetchDados();
    }
  }, [user]);

  const fetchDados = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const { data: perfilRaw, error: perfilError } =
        await supabase
          .from('perfis')
          .select(
            'criado_em, dias_jornada, pontuacao_viva'
          )
          .eq('id', user.id)
          .single();

      if (perfilError) {
        throw perfilError;
      }

      const perfil = perfilRaw as any;

      let diasCalculados = 0;

      if (perfil?.criado_em) {
        const cadastro =
          new Date(perfil.criado_em).getTime();

        const agora =
          new Date().getTime();

        diasCalculados =
          Math.floor(
            (agora - cadastro) /
              (1000 * 60 * 60 * 24)
          ) + 1;
      }

      const diasRegistrados =
        Number(perfil?.dias_jornada || 0);

      const dias =
        Math.min(
          Math.max(
            diasCalculados,
            diasRegistrados
          ),
          90
        );

      setDiasNaJornada(
        Math.max(dias, 0)
      );

      setPontos(
        Number(
          perfil?.pontuacao_viva || 0
        )
      );


      const {
        count,
        error: indicacoesError,
      } = await supabase
        .from('indicacoes')
        .select('id', {
          count: 'exact',
          head: true,
        })
        .eq('indicador_id', user.id)
        .eq('status', 'aprovado');


      if (indicacoesError) {
        console.warn(
          'Não foi possível consultar indicações:',
          indicacoesError
        );
      }

      setTotalIndicacoes(
        count || 0
      );


      const {
        data: rankingRaw,
        error: rankingError,
      } = await supabase.rpc(
        'ranking_viva369',
        {
          p_limite: 5,
        }
      );


      if (rankingError) {
        throw rankingError;
      }


      const rankingData =
        ((rankingRaw || []) as any[]).map(
          (item) => ({
            posicao:
              Number(item.posicao),

            nome:
              item.nome ||
              'Participante',

            pontos:
              Number(
                item.pontos || 0
              ),
          })
        );


      setRanking(rankingData);

    } catch (error) {
      console.error(
        'Erro ao carregar premiações:',
        error
      );

    } finally {
      setLoading(false);
    }
  };


  const conquistasComProgresso =
    MEDALHAS.map((medalha) => {

      let progresso = 0;

      if (medalha.criterio === 'dias') {
        progresso =
          diasNaJornada;
      }

      if (
        medalha.criterio ===
        'indicacoes'
      ) {
        progresso =
          totalIndicacoes;
      }

      if (
        medalha.criterio ===
        'pontos'
      ) {
        progresso =
          pontos;
      }


      const conquistado =
        progresso >= medalha.meta;


      return {
        ...medalha,

        progresso:
          Math.min(
            progresso,
            medalha.meta
          ),

        conquistado,
      };
    });


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="space-y-6 p-4 md:p-6">

      <div>
        <h1 className="text-2xl font-bold">
          Premiações & Ranking
        </h1>

        <p className="text-sm text-muted-foreground">
          Acompanhe suas conquistas e sua
          posição no VIVA369.
        </p>
      </div>


      <Card className="border-primary/30 bg-gradient-to-r from-card to-primary/5">

        <CardContent className="pt-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Seus Pontos
              </p>

              <p className="text-4xl font-black text-primary">
                {pontos.toLocaleString(
                  'pt-BR'
                )}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Dia {diasNaJornada}
                {' · '}
                {totalIndicacoes}
                {' '}
                indicação(ões) confirmada(s)
              </p>

            </div>

            <Crown className="h-16 w-16 text-primary/40" />

          </div>

        </CardContent>

      </Card>


      <Tabs defaultValue="medalhas">

        <TabsList className="w-full">

          <TabsTrigger
            value="medalhas"
            className="flex-1"
          >
            🏅 Conquistas
          </TabsTrigger>

          <TabsTrigger
            value="ranking"
            className="flex-1"
          >
            🏆 Ranking
          </TabsTrigger>

        </TabsList>


        <TabsContent value="medalhas">

          <div className="grid gap-3 sm:grid-cols-2">

            {conquistasComProgresso.map(
              (conquista) => {

                const percentual =
                  Math.min(
                    (
                      conquista.progresso /
                      conquista.meta
                    ) * 100,
                    100
                  );

                return (
                  <Card
                    key={conquista.id}
                    className={
                      conquista.conquistado
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border bg-card opacity-75'
                    }
                  >

                    <CardContent className="pt-4">

                      <div className="flex items-start gap-3">

                        <div
                          className={
                            conquista.conquistado
                              ? 'rounded-lg bg-primary/20 p-2 text-3xl'
                              : 'rounded-lg bg-muted/50 p-2 text-3xl grayscale'
                          }
                        >
                          {conquista.icon}
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center gap-2">

                            <p className="text-sm font-bold">
                              {conquista.titulo}
                            </p>

                            {conquista.conquistado && (
                              <Badge className="bg-primary/20 text-xs text-primary">
                                ✓ Conquistada
                              </Badge>
                            )}

                          </div>

                          <p className="text-xs text-muted-foreground">
                            {conquista.descricao}
                          </p>

                          <div className="mt-3">

                            <div className="mb-1 flex justify-between text-xs text-muted-foreground">

                              <span>
                                {conquista.progresso}
                                {' / '}
                                {conquista.meta}
                              </span>

                              <span>
                                {Math.round(
                                  percentual
                                )}
                                %
                              </span>

                            </div>

                            <Progress
                              value={
                                percentual
                              }
                              className="h-1.5"
                            />

                          </div>

                        </div>

                      </div>

                    </CardContent>

                  </Card>
                );
              }
            )}

          </div>

        </TabsContent>


        <TabsContent value="ranking">

          <Card className="border-border bg-card">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <Trophy className="h-5 w-5 text-primary" />

                Top 5 VIVA369

              </CardTitle>

            </CardHeader>


            <CardContent>

              {ranking.length === 0 ? (

                <div className="py-8 text-center">

                  <Trophy className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                  <p className="text-sm text-muted-foreground">
                    O ranking começará quando
                    participantes ativos acumularem pontos.
                  </p>

                </div>

              ) : (

                <div className="space-y-3">

                  {ranking.map((item) => {

                    const icone =
                      item.posicao === 1
                        ? '🥇'
                        : item.posicao === 2
                          ? '🥈'
                          : item.posicao === 3
                            ? '🥉'
                            : `#${item.posicao}`;

                    return (

                      <div
                        key={item.posicao}
                        className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-3"
                      >

                        <div className="flex items-center gap-3">

                          <span className="text-xl">
                            {icone}
                          </span>

                          <div>

                            <p className="font-medium">
                              {item.nome}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              #{item.posicao}
                              {' '}
                              no ranking
                            </p>

                          </div>

                        </div>

                        <p className="font-bold text-primary">
                          {item.pontos.toLocaleString(
                            'pt-BR'
                          )}
                          {' '}
                          pts
                        </p>

                      </div>
                    );
                  })}


                  <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-3">

                    <div className="flex items-center gap-3">

                      <Star className="h-5 w-5 text-primary" />

                      <p className="font-medium text-primary">
                        Seus pontos
                      </p>

                    </div>

                    <p className="font-bold text-primary">
                      {pontos.toLocaleString(
                        'pt-BR'
                      )}
                      {' '}
                      pts
                    </p>

                  </div>

                </div>

              )}

            </CardContent>

          </Card>

        </TabsContent>

      </Tabs>

    </div>
  );
}
