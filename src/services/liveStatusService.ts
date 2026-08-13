import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export interface LiveStatus {
  id: string;
  esta_ao_vivo: boolean;
  titulo: string | null;
  descricao: string | null;
  thumbnail_url: string | null;
  url_da_live: string | null;
  iniciada_em: string | null;
  finalizada_em: string | null;
  visualizacoes: number;
  criado_em: string;
  atualizado_em: string;
}

export function useLiveStatus() {
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLiveStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('live_status')
          .select('*')
          .limit(1)
          .single();

        if (error) throw error;
        setLiveStatus(data);
      } catch (err) {
        console.error('Erro ao buscar status da live:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStatus();

    const channel = supabase
      .channel('live-status-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_status'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setLiveStatus(payload.new as LiveStatus);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { liveStatus, loading, error, isLive: liveStatus?.esta_ao_vivo || false };
}

export async function iniciarLive(
  titulo: string,
  descricao: string,
  url_da_live?: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: statusData } = await supabase
      .from('live_status')
      .select('id')
      .limit(1)
      .single();

    if (!statusData) {
      return { success: false, error: new Error('Status da live não encontrado') };
    }

    const { error } = await supabase
      .from('live_status')
      .update({
        esta_ao_vivo: true,
        titulo,
        descricao,
        url_da_live: url_da_live || null,
        iniciada_em: new Date().toISOString(),
        visualizacoes: 0,
        atualizado_em: new Date().toISOString()
      })
      .eq('id', statusData.id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

export async function finalizarLive(): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: statusData } = await supabase
      .from('live_status')
      .select('id')
      .limit(1)
      .single();

    if (!statusData) {
      return { success: false, error: new Error('Status da live não encontrado') };
    }

    const { error } = await supabase
      .from('live_status')
      .update({
        esta_ao_vivo: false,
        finalizada_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      })
      .eq('id', statusData.id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

export async function incrementarVisualizacao(): Promise<void> {
  try {
    const { data } = await supabase
      .from('live_status')
      .select('visualizacoes, id')
      .limit(1)
      .single();

    if (data) {
      await supabase
        .from('live_status')
        .update({
          visualizacoes: (data.visualizacoes || 0) + 1
        })
        .eq('id', data.id);
    }
  } catch (error) {
    console.error('Erro ao incrementar visualização:', error);
  }
}
