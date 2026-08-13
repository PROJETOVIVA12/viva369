import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Smartphone, Monitor, Link2, Check, X,
  Facebook, Instagram, Twitter, Youtube,
  MessageCircle, Share2, Cloud, Database,
  Zap, Shield, Wifi, Bluetooth, Globe,
  ArrowRight, RefreshCw, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function IntegracoesPage() {
  const { user } = useAuth();
  const [syncStatus, setSyncStatus] = useState<Record<string, boolean>>({
    google: false,
    apple: false,
    whatsapp: false,
    instagram: false,
    facebook: false
  });

  const integracoes = [
    {
      id: 'google',
      nome: 'Google Fit',
      descricao: 'Sincronize seus dados de atividade física',
      icon: Cloud,
      cor: 'from-blue-500 to-blue-600',
      status: syncStatus.google
    },
    {
      id: 'apple',
      nome: 'Apple Health',
      descricao: 'Sincronize seus dados de saúde do Apple Watch',
      icon: Smartphone,
      cor: 'from-gray-500 to-gray-600',
      status: syncStatus.apple
    },
    {
      id: 'whatsapp',
      nome: 'WhatsApp',
      descricao: 'Compartilhe desafios e resultados',
      icon: MessageCircle,
      cor: 'from-green-500 to-green-600',
      status: syncStatus.whatsapp
    },
    {
      id: 'instagram',
      nome: 'Instagram',
      descricao: 'Publique seus resultados nas redes',
      icon: Instagram,
      cor: 'from-pink-500 to-purple-500',
      status: syncStatus.instagram
    },
    {
      id: 'facebook',
      nome: 'Facebook',
      descricao: 'Conecte-se com a comunidade',
      icon: Facebook,
      cor: 'from-blue-500 to-blue-700',
      status: syncStatus.facebook
    }
  ];

  const toggleIntegracao = (id: string) => {
    setSyncStatus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 p-6">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Link2 className="h-6 w-6" />
              Integrações
            </h1>
            <p className="text-white/80 text-sm">Conecte o VIVA369 com outras plataformas</p>
          </div>
          <Badge className="bg-white/20 text-white border-0">
            <Shield className="h-4 w-4 mr-2" />
            Dados seguros
          </Badge>
        </div>
      </div>

      {/* Cards de Integrações */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integracoes.map((integracao) => {
          const Icon = integracao.icon;
          return (
            <Card key={integracao.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-gradient-to-r", integracao.cor, "text-white")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-sm">{integracao.nome}</CardTitle>
                      <CardDescription className="text-slate-400 text-xs">{integracao.descricao}</CardDescription>
                    </div>
                  </div>
                  <Switch 
                    checked={integracao.status}
                    onCheckedChange={() => toggleIntegracao(integracao.id)}
                  />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  {integracao.status ? (
                    <>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Conectado
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                      <X className="h-3 w-3 mr-1" />
                      Desconectado
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {integracao.status ? (
                  <Button variant="outline" className="w-full border-slate-600 text-slate-400 hover:text-white text-xs">
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Sincronizar
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white text-xs">
                    <Link2 className="h-3 w-3 mr-2" />
                    Conectar
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Configurações Avançadas */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Configurações Avançadas</CardTitle>
          <CardDescription className="text-slate-400">
            Gerencie suas conexões e permissões
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-400">API Key</Label>
              <Input 
                value="••••••••••••••••"
                readOnly
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-400">Webhook URL</Label>
              <Input 
                value="https://api.viva369.com/webhook"
                readOnly
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
          <Alert className="bg-amber-500/10 border-amber-500/30">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-400 text-sm">
              ⚠️ Alterar estas configurações pode afetar a integração do seu app
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Estatísticas de Sincronização */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-400" />
            Estatísticas de Sincronização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-700/30 rounded-lg">
              <p className="text-2xl font-bold text-white">1.2K</p>
              <p className="text-xs text-slate-400">Dados sincronizados</p>
            </div>
            <div className="text-center p-3 bg-slate-700/30 rounded-lg">
              <p className="text-2xl font-bold text-emerald-400">98%</p>
              <p className="text-xs text-slate-400">Taxa de sucesso</p>
            </div>
            <div className="text-center p-3 bg-slate-700/30 rounded-lg">
              <p className="text-2xl font-bold text-amber-400">3</p>
              <p className="text-xs text-slate-400">Integrações ativas</p>
            </div>
            <div className="text-center p-3 bg-slate-700/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">24h</p>
              <p className="text-xs text-slate-400">Última sincronização</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
