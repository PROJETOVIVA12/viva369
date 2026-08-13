import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Search, Users, UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages] = useState([
    { id: 1, usuario: 'Ana', texto: 'Olá pessoal! Como estão?', hora: '10:30' },
    { id: 2, usuario: 'Carlos', texto: 'Tudo bem! E você?', hora: '10:32' },
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Chat VIVA+</h1>
      
      <div className="grid md:grid-cols-4 gap-4">
        {/* Lista de contatos */}
        <Card className="md:col-span-1 bg-slate-800 border-slate-700 h-[500px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-sm text-white">Conversas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {['Ana', 'Carlos', 'Mariana', 'João'].map((nome) => (
              <div key={nome} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs">
                    {nome.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white">{nome}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Área do chat */}
        <Card className="md:col-span-3 bg-slate-800 border-slate-700 h-[500px] flex flex-col">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-white font-medium">Chat Geral</span>
              <span className="text-xs text-slate-500">● 5 online</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex items-start gap-3",
                msg.usuario === 'Você' ? "flex-row-reverse" : ""
              )}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs">
                    {msg.usuario.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "p-3 rounded-lg max-w-[70%]",
                  msg.usuario === 'Você' 
                    ? "bg-emerald-500 text-white" 
                    : "bg-slate-700 text-white"
                )}>
                  <p className="text-sm">{msg.texto}</p>
                  <span className="text-[10px] opacity-70">{msg.hora}</span>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-slate-700 flex gap-2">
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="bg-slate-700 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && setMessage('')}
            />
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
