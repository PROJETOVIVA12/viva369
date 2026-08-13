SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN (
    'bioimpedancia',
    'desafio_cores',
    'desafio_dias',
    'vendas',
    'comunidade_posts',
    'perfis'
  )
ORDER BY table_name, ordinal_position;

SELECT
  schemaname,
  tablename,
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'bioimpedancia',
    'desafio_cores',
    'desafio_dias',
    'vendas',
    'comunidade_posts'
  )
ORDER BY tablename, policyname;
