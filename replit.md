# Instruções do projeto

## Regras obrigatórias para comandos do Shell

- Nunca gerar comandos que usem `exit`, `exit "$STATUS"` ou qualquer comando que feche automaticamente o Shell.
- Comandos longos devem manter o terminal aberto após a execução.
- Validações devem mostrar claramente o resultado e o código de saída, sem encerrar a sessão.
- Quando necessário salvar logs, usar `tee` e `STATUS=${PIPESTATUS[0]}`, mas nunca finalizar com `exit`.
- Ao terminar, deixar o usuário no prompt interativo do Shell.
