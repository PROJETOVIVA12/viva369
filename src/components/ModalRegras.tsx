import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DADOS_EMPRESA } from '@/config/empresa';

interface ModalRegrasProps {
  open: boolean;
  onAceitar: () => void;
}

export const ModalRegras = ({ open, onAceitar }: ModalRegrasProps) => {
  const [aceito, setAceito] = useState(false);

  const handleAceitar = () => {
    localStorage.setItem('regras_aceitas', 'true');
    onAceitar();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-card text-foreground border-border" >
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Regras e Termos de Uso - {DADOS_EMPRESA.nome}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Por favor, leia atentamente as regras antes de acessar o sistema.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[40vh] w-full rounded-md border border-border p-4 bg-background/50">
          <div className="text-sm space-y-4 text-muted-foreground">
            <p>
              <strong>1. Aceitação dos Termos</strong><br/>
              Ao acessar este sistema, você concorda em cumprir e estar vinculado aos seguintes termos de uso.
            </p>
            <p>
              <strong>2. Uso do Sistema</strong><br/>
              Este sistema é de uso exclusivo para a gestão de pedidos e serviços relacionados à {DADOS_EMPRESA.nome}. É proibido o uso indevido das informações aqui contidas.
            </p>
            <p>
              <strong>3. Privacidade e Dados</strong><br/>
              Todos os dados de clientes inseridos devem ser tratados com sigilo e em conformidade com as leis de proteção de dados vigentes. Não compartilhe informações de clientes com terceiros.
            </p>
            <p>
              <strong>4. Responsabilidade</strong><br/>
              As ações realizadas no sistema são registradas e de responsabilidade do usuário autenticado. Em caso de atividades suspeitas, sua conta poderá ser suspensa.
            </p>
            <p>
              <strong>5. Atualizações</strong><br/>
              A {DADOS_EMPRESA.nome} reserva-se o direito de atualizar estas regras a qualquer momento. Você será notificado de mudanças significativas.
            </p>
            <p>
              O descumprimento destas regras pode acarretar no bloqueio de acesso ao sistema.
            </p>
          </div>
        </ScrollArea>
        <div className="flex items-center space-x-2 py-4">
          <Checkbox id="terms" checked={aceito} onCheckedChange={(c) => setAceito(c as boolean)} className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
          >
            Li e concordo com as regras e termos de uso.
          </label>
        </div>
        <DialogFooter>
          <Button disabled={!aceito} onClick={handleAceitar} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            Aceitar e Acessar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
