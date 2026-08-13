-- Correção do erro 403 ao inserir em public.vendas.
-- Este SQL foi feito para ser executado no SQL Editor do Supabase.

BEGIN;

ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON TABLE public.vendas TO authenticated;

DO $$
DECLARE
    coluna_usuario TEXT;
BEGIN
    /*
      Detecta automaticamente a coluna usada para vincular a venda
      ao usuário autenticado.
    */
    SELECT column_name
      INTO coluna_usuario
      FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'vendas'
       AND column_name IN (
         'usuario_id',
         'user_id',
         'created_by',
         'owner_id'
       )
     ORDER BY CASE column_name
       WHEN 'usuario_id' THEN 1
       WHEN 'user_id' THEN 2
       WHEN 'created_by' THEN 3
       WHEN 'owner_id' THEN 4
     END
     LIMIT 1;

    IF coluna_usuario IS NULL THEN
        RAISE EXCEPTION
          'Não foi encontrada uma coluna de usuário em public.vendas. Verifique se a tabela usa usuario_id, user_id, created_by ou owner_id.';
    END IF;

    EXECUTE
      'DROP POLICY IF EXISTS "vendas_authenticated_insert" ON public.vendas';

    EXECUTE format(
      'CREATE POLICY "vendas_authenticated_insert"
         ON public.vendas
         FOR INSERT
         TO authenticated
         WITH CHECK ((%I)::text = (auth.uid())::text)',
      coluna_usuario
    );

    RAISE NOTICE
      'Política criada usando a coluna %',
      coluna_usuario;
END $$;

COMMIT;
