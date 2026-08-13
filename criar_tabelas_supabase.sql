-- ============================================
-- CRIAÇÃO DE TODAS AS TABELAS DO VIVA369
-- ============================================

-- 1. TABELA USUARIOS (já existe, mas vamos garantir)
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    nome TEXT,
    telefone TEXT,
    role TEXT DEFAULT 'cliente',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA PERFIS
CREATE TABLE IF NOT EXISTS perfis (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    nome TEXT,
    email TEXT,
    telefone TEXT,
    codigo_indicacao TEXT UNIQUE,
    chave_pix TEXT,
    lider_id UUID,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA LIDERES
CREATE TABLE IF NOT EXISTS lideres (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    total_indicacoes INTEGER DEFAULT 0,
    total_comissoes DECIMAL(10,2) DEFAULT 0,
    saldo_disponivel DECIMAL(10,2) DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA BIOIMPEDANCIA
CREATE TABLE IF NOT EXISTS bioimpedancia (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    data_avaliacao DATE NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    altura DECIMAL(5,2) NOT NULL,
    percentual_gordura DECIMAL(5,2) NOT NULL,
    massa_muscular DECIMAL(5,2) NOT NULL,
    massa_gordura DECIMAL(5,2),
    agua_corporal DECIMAL(5,2),
    metabolismo_basal DECIMAL(7,2),
    imc DECIMAL(5,2),
    idade_metabolica DECIMAL(5,2),
    percentual_osso DECIMAL(5,2),
    viscerais INTEGER,
    observacoes TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA INDICACOES
CREATE TABLE IF NOT EXISTS indicacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    indicado_email TEXT NOT NULL,
    indicado_nome TEXT,
    status TEXT DEFAULT 'pendente',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABELA POSTS
CREATE TABLE IF NOT EXISTS posts_viva (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conteudo TEXT,
    imagem_url TEXT,
    tipo TEXT DEFAULT 'post',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABELA VENDAS
CREATE TABLE IF NOT EXISTS vendas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cliente_nome TEXT,
    produtos JSONB,
    total DECIMAL(10,2),
    comissao_vendedor DECIMAL(10,2),
    comissao_plataforma DECIMAL(10,2),
    metodo_pagamento TEXT,
    status TEXT DEFAULT 'concluida',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABELA DESAFIO_CORES
CREATE TABLE IF NOT EXISTS desafio_cores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dias_completos INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT false,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TABELA DESAFIO_DIAS
CREATE TABLE IF NOT EXISTS desafio_dias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dia INTEGER NOT NULL,
    foto_url TEXT,
    data_comprovacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TABELA LIMPEZA_HEPATICA
CREATE TABLE IF NOT EXISTS limpeza_hepatica (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dias_completos INTEGER DEFAULT 0,
    fase_atual TEXT DEFAULT 'preparacao',
    ativo BOOLEAN DEFAULT false,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. TABELA GAMIFICACAO
CREATE TABLE IF NOT EXISTS gamificacao (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nivel_atual INTEGER DEFAULT 1,
    pontos INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    conquistas JSONB DEFAULT '[]',
    streak_atual INTEGER DEFAULT 0,
    maior_streak INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. TABELA CONQUISTAS
CREATE TABLE IF NOT EXISTS conquistas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    icone TEXT,
    pontos_necessarios INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. TABELA USUARIO_CONQUISTAS
CREATE TABLE IF NOT EXISTS usuario_conquistas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conquista_id UUID REFERENCES conquistas(id) ON DELETE CASCADE,
    data_obtencao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. TABELA COMUNIDADE_POSTS
CREATE TABLE IF NOT EXISTS comunidade_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT,
    conteudo TEXT NOT NULL,
    imagem_url TEXT,
    curtidas INTEGER DEFAULT 0,
    comentarios INTEGER DEFAULT 0,
    denuncias INTEGER DEFAULT 0,
    status TEXT DEFAULT 'ativo',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. TABELA COMUNIDADE_COMENTARIOS
CREATE TABLE IF NOT EXISTS comunidade_comentarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES comunidade_posts(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    curtidas INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. TABELA PAGAMENTOS
CREATE TABLE IF NOT EXISTS pagamentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    pedido_id UUID,
    valor DECIMAL(10,2) NOT NULL,
    metodo_pagamento TEXT NOT NULL,
    status TEXT DEFAULT 'pendente',
    transacao_id TEXT,
    data_pagamento TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_confirmacao TIMESTAMP WITH TIME ZONE,
    comprovante_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. TABELA ACESSOS
CREATE TABLE IF NOT EXISTS acessos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plano TEXT NOT NULL,
    data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_fim TIMESTAMP WITH TIME ZONE,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- HABILITAR RLS EM TODAS AS TABELAS
-- ============================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE lideres ENABLE ROW LEVEL SECURITY;
ALTER TABLE bioimpedancia ENABLE ROW LEVEL SECURITY;
ALTER TABLE indicacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts_viva ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE desafio_cores ENABLE ROW LEVEL SECURITY;
ALTER TABLE desafio_dias ENABLE ROW LEVEL SECURITY;
ALTER TABLE limpeza_hepatica ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamificacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario_conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE comunidade_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comunidade_comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE acessos ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE SEGURANÇA
-- ============================================

-- Usuários podem ver e editar seus próprios dados
CREATE POLICY "Usuários podem ver seus próprios dados" ON usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar seus próprios dados" ON usuarios FOR UPDATE USING (auth.uid() = id);

-- Perfis
CREATE POLICY "Usuários podem ver perfis públicos" ON perfis FOR SELECT USING (true);
CREATE POLICY "Usuários podem editar seu próprio perfil" ON perfis FOR UPDATE USING (auth.uid() = id);

-- Líderes
CREATE POLICY "Usuários podem ver líderes" ON lideres FOR SELECT USING (true);
CREATE POLICY "Líderes podem atualizar seus dados" ON lideres FOR UPDATE USING (auth.uid() = id);

-- Bioimpedância
CREATE POLICY "Usuários podem ver suas avaliações" ON bioimpedancia FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar avaliações" ON bioimpedancia FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem editar suas avaliações" ON bioimpedancia FOR UPDATE USING (auth.uid() = user_id);

-- Desafios
CREATE POLICY "Usuários podem ver seus desafios" ON desafio_cores FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuários podem gerenciar seus desafios" ON desafio_cores FOR ALL USING (auth.uid() = usuario_id);
CREATE POLICY "Usuários podem ver seus dias de desafio" ON desafio_dias FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuários podem gerenciar seus dias" ON desafio_dias FOR ALL USING (auth.uid() = usuario_id);

-- Gamificação
CREATE POLICY "Usuários podem ver sua gamificação" ON gamificacao FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuários podem gerenciar sua gamificação" ON gamificacao FOR ALL USING (auth.uid() = usuario_id);

-- Comunidade
CREATE POLICY "Todos podem ver posts" ON comunidade_posts FOR SELECT USING (true);
CREATE POLICY "Usuários autenticados podem criar posts" ON comunidade_posts FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "Usuários podem editar seus posts" ON comunidade_posts FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Todos podem ver comentários" ON comunidade_comentarios FOR SELECT USING (true);
CREATE POLICY "Usuários autenticados podem comentar" ON comunidade_comentarios FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- ============================================
-- INSERIR CONQUISTAS INICIAIS
-- ============================================
INSERT INTO conquistas (nome, descricao, icone, pontos_necessarios) VALUES
('Primeiro Passo', 'Completou o primeiro dia do desafio', '🌟', 1),
('Semana de Ouro', 'Completou 7 dias consecutivos', '🔥', 7),
('Mestre da Limpeza', 'Completou a primeira limpeza hepática', '💪', 30),
('Líder do Desafio', 'Completou 30 dias do desafio', '👑', 30),
('Campeão VIVA', 'Completou 90 dias de desafio', '🏆', 90),
('Indicador Pro', 'Indicou 10 amigos para o VIVA369', '💎', 10),
('Vendedor de Ouro', 'Realizou 50 vendas', '💰', 50)
ON CONFLICT DO NOTHING;

-- ============================================
-- CRIAR STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES 
('desafios', 'desafios', true),
('perfis', 'perfis', true),
('posts', 'posts', true),
('comprovantes', 'comprovantes', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas do Storage
CREATE POLICY "Todos podem ver arquivos" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Usuários autenticados podem enviar" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

