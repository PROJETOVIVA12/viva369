import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

interface AcessoContextType {
  temAcesso: boolean;
  loading: boolean;
  verificarAcesso: () => Promise<boolean>;
  liberarAcesso: (voucher: string) => Promise<{ success: boolean; message: string }>;
}

const AcessoContext = createContext<AcessoContextType>({
  temAcesso: false,
  loading: true,
  verificarAcesso: async () => false,
  liberarAcesso: async () => ({ success: false, message: '' }),
});

export const AcessoProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [temAcesso, setTemAcesso] = useState(false);
  const [loading, setLoading] = useState(true);

  const verificarAcesso = async () => {
    if (!user) {
      setTemAcesso(false);
      setLoading(false);
      return false;
    }

    try {
      // Verificar se é o admin
      const { data: userData } = await supabase
        .from('usuarios')
        .select('role, email')
        .eq('id', user.id)
        .single();

      // Admin tem acesso liberado
      if (userData?.role === 'admin') {
        setTemAcesso(true);
        setLoading(false);
        return true;
      }

      // Verificar acesso na tabela acessos
      const { data, error } = await supabase
        .from('acessos')
        .select('status, data_expiracao')
        .eq('usuario_id', user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      const agora = new Date();

      const acessoAtivo =
        data?.status === 'ativo' &&
        (
          !data.data_expiracao ||
          new Date(data.data_expiracao) > agora
        );

      if (acessoAtivo) {
        setTemAcesso(true);
        setLoading(false);
        return true;
      }

      setTemAcesso(false);
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Erro ao verificar acesso:', error);
      setTemAcesso(false);
      setLoading(false);
      return false;
    }
  };

  const liberarAcesso = async (voucher: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return {
        success: false,
        message: 'Usuário não autenticado'
      };
    }

    try {
      const codigo = voucher.trim().toUpperCase();

      const { data, error } = await supabase.rpc(
        'resgatar_voucher_viva369',
        {
          p_codigo: codigo
        }
      );

      if (error) {
        console.error('Erro ao resgatar voucher:', error);

        return {
          success: false,
          message: error.message || 'Voucher inválido ou indisponível'
        };
      }

      const acessoLiberado = await verificarAcesso();

      if (!acessoLiberado) {
        return {
          success: false,
          message: 'Voucher processado, mas não foi possível confirmar o acesso.'
        };
      }

      return {
        success: true,
        message: '✅ Voucher resgatado. Acesso liberado por 36 meses!'
      };

    } catch (error) {
      console.error('Erro ao liberar acesso:', error);

      return {
        success: false,
        message: 'Erro ao processar voucher'
      };
    }
  };

  useEffect(() => {
    if (user) {
      verificarAcesso();
    } else {
      setTemAcesso(false);
      setLoading(false);
    }
  }, [user]);

  return (
    <AcessoContext.Provider value={{ temAcesso, loading, verificarAcesso, liberarAcesso }}>
      {children}
    </AcessoContext.Provider>
  );
};

export const useAcesso = () => useContext(AcessoContext);
