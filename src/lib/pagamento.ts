import { supabase } from './supabase';

// ============================================
// CONFIGURAÇÃO DE PAGAMENTO
// ============================================

const CONFIG = {
    URL_PAGAMENTO: 'https://payment-link-v3.ton.com.br/pl_lekNqp5wjnAGwLrSZFK2OYEg427QRzZ3',
    VALOR_ADESAO: 250.00,
    DESCRICAO: 'Acesso VIVA369 - 36 meses de jornada de saúde'
};

// ============================================
// FUNÇÕES DE PAGAMENTO
// ============================================

/**
 * Criar pedido no banco e iniciar pagamento
 */
export async function criarPedido(
    usuarioId: string,
    email: string,
    nome: string,
    plano: string = 'viva'
) {
    try {
        // 1. Criar pedido no banco
        const { data, error } = await supabase
            .from('pedidos')
            .insert({
                usuario_id: usuarioId,
                email: email,
                valor: CONFIG.VALOR_ADESAO,
                plano: plano,
                status: 'pendente'
            })
            .select()
            .single();

        if (error) throw error;

        return { pedido: data, success: true };
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return { error: 'Erro ao criar pedido', success: false };
    }
}

/**
 * Iniciar pagamento com link da Ton
 */
export function iniciarPagamento(pedido: any, nome: string) {
    // Construir URL com parâmetros
    const params = new URLSearchParams({
        email: pedido.email,
        nome: nome,
        valor: pedido.valor.toString(),
        descricao: CONFIG.DESCRICAO,
        pedido_id: pedido.id,
        custom_id: pedido.id,
        redirect: `${window.location.origin}/verificar-acesso`
    });

    const url = `${CONFIG.URL_PAGAMENTO}?${params.toString()}`;
    
    // Abrir link de pagamento
    window.open(url, '_blank');
}

/**
 * Consultar status do pedido
 */
export async function consultarPedido(pedidoId: string) {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('id', pedidoId)
            .single();

        if (error) throw error;
        return { pedido: data, success: true };
    } catch (error) {
        console.error('Erro ao consultar pedido:', error);
        return { error: 'Erro ao consultar pedido', success: false };
    }
}

/**
 * Verificar se usuário tem pagamento confirmado
 */
export async function verificarPagamento(usuarioId: string) {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('usuario_id', usuarioId)
            .eq('status', 'confirmado')
            .order('data_pedido', { ascending: false })
            .limit(1);

        if (error) throw error;
        return { pagamento: data?.[0] || null, success: true };
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        return { error: 'Erro ao verificar pagamento', success: false };
    }
}

/**
 * Gerar link de pagamento para compartilhamento
 */
export function gerarLinkPagamento(email: string, nome: string, pedidoId?: string): string {
    let url = CONFIG.URL_PAGAMENTO;
    const params = new URLSearchParams({
        email: email,
        nome: nome,
        valor: CONFIG.VALOR_ADESAO.toString(),
        descricao: CONFIG.DESCRICAO
    });
    
    if (pedidoId) {
        params.append('pedido_id', pedidoId);
    }
    
    return `${url}?${params.toString()}`;
}

/**
 * Validar voucher
 */
export async function validarVoucher(codigo: string) {
    try {
        const { data, error } = await supabase
            .from('vouchers')
            .select('*')
            .eq('codigo', codigo)
            .eq('status', 'disponivel')
            .single();

        if (error) throw error;
        return { voucher: data, success: true };
    } catch (error) {
        console.error('Erro ao validar voucher:', error);
        return { error: 'Voucher inválido ou já utilizado', success: false };
    }
}

/**
 * Usar voucher (liberar acesso)
 */
export async function usarVoucher(codigo: string, usuarioId: string) {
    try {
        // 1. Validar voucher
        const { voucher, success } = await validarVoucher(codigo);
        if (!success) throw new Error('Voucher inválido');

        // 2. Marcar voucher como usado
        const { error: updateError } = await supabase
            .from('vouchers')
            .update({
                status: 'usado',
                usado_por: usuarioId,
                data_uso: new Date().toISOString()
            })
            .eq('codigo', codigo);

        if (updateError) throw updateError;

        // 3. Liberar acesso
        const { error: acessoError } = await supabase
            .from('acessos')
            .upsert({
                usuario_id: usuarioId,
                status: 'ativo',
                tipo_acesso: 'voucher',
                voucher_utilizado: codigo,
                data_adesao: new Date().toISOString()
            });

        if (acessoError) throw acessoError;

        return { success: true };
    } catch (error) {
        console.error('Erro ao usar voucher:', error);
        return { error: 'Erro ao processar voucher', success: false };
    }
}

export default {
    CONFIG,
    criarPedido,
    iniciarPagamento,
    consultarPedido,
    verificarPagamento,
    gerarLinkPagamento,
    validarVoucher,
    usarVoucher
};
