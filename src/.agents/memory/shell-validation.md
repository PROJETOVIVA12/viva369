---
name: Shell validation
description: Regra para manter o terminal aberto durante correções e validações.
---

Comandos de correção e validação devem informar o resultado e retornar ao prompt interativo, sem encerrar automaticamente o Shell.

**Por que:** usar `exit` ou `exit "$STATUS"` fecha a sessão e pode fazer o usuário perder o resultado ou pensar que ocorreu uma falha inesperada.

**Como aplicar:** usar `tee` e `STATUS=${PIPESTATUS[0]}` quando necessário, mas nunca usar `exit` no final. Deixar o comando terminar naturalmente e manter o prompt disponível.
