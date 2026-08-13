import React from 'react';
import { 
  Instagram, MessageCircle, Youtube, 
  Facebook, Linkedin, Twitter, Send,
  Share2, Copy, Check, QrCode,
  Users, Megaphone, Sparkles, Zap,
  ArrowRight, Crown, Award, Gem, Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function RedeSocialPage() {
  const [copied, setCopied] = React.useState(false);

  const linkCompartilhamento = 'https://viva369.com/convite/123456';
  
  const redesSociais = [
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'from-pink-500 to-purple-500',
      text: 'text-pink-400',
      url: 'https://instagram.com/viva369',
      followers: '12.5K',
      desc: 'Siga nosso perfil para dicas diárias de saúde'
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'from-green-500 to-emerald-500',
      text: 'text-green-400',
      url: 'https://wa.me/5511999999999',
      followers: '5.2K',
      desc: 'Entre no nosso grupo exclusivo'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      color: 'from-red-500 to-red-600',
      text: 'text-red-400',
      url: 'https://youtube.com/@viva369',
      followers: '8.7K',
      desc: 'Assista nossas lives e conteúdos exclusivos'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'from-blue-500 to-blue-600',
      text: 'text-blue-400',
      url: 'https://facebook.com/viva369',
      followers: '9.1K',
      desc: 'Comunidade oficial VIVA369'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: Twitter, 
      color: 'from-gray-600 to-gray-800',
      text: 'text-gray-300',
      url: 'https://twitter.com/viva369',
      followers: '3.4K',
      desc: 'Notícias e atualizações diárias'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: 'from-blue-700 to-blue-800',
      text: 'text-blue-400',
      url: 'https://linkedin.com/company/viva369',
      followers: '2.1K',
      desc: 'Conteúdo profissional e networking'
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkCompartilhamento);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank');
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'VIVA369 - Sua jornada de saúde',
        text: 'Venha fazer parte da comunidade VIVA369! 🚀',
        url: linkCompartilhamento,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse delay-100" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-white/20">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Rede VIVA+</h1>
              <p className="text-white/80 text-sm">
                Compartilhe sua jornada com a comunidade
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge className="bg-white/20 text-white border-0">
              <Users className="h-3 w-3 mr-1" />
              50K+ membros
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Zap className="h-3 w-3 mr-1" />
              1.2K online
            </Badge>
          </div>
        </div>
      </div>

      {/* Cards das Redes Sociais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {redesSociais.map((rede) => {
          const Icon = rede.icon;
          return (
            <Card 
              key={rede.id}
              className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group hover:scale-[1.02]"
              onClick={() => handleShare(rede.url)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-3 rounded-xl bg-gradient-to-br", rede.color, "text-white shadow-lg")}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{rede.name}</h3>
                      <p className="text-xs text-slate-400">{rede.followers} seguidores</p>
                    </div>
                  </div>
                  <Badge className={cn("border border-slate-600", rede.text)}>
                    Seguir
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 mt-3">{rede.desc}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Acessar perfil</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Link de Compartilhamento */}
      <Card className="bg-slate-800 border-emerald-500/20 border-2 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/5 rounded-full" />
        
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Send className="h-5 w-5 text-emerald-400" />
            Compartilhe o VIVA369
          </CardTitle>
          <CardDescription className="text-slate-400">
            Convide seus amigos e ganhe recompensas exclusivas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label className="text-slate-400 text-sm">Seu link exclusivo</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input 
                  value={linkCompartilhamento}
                  readOnly
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-slate-600 hover:border-emerald-500 text-slate-400 hover:text-emerald-400"
                  onClick={handleCopyLink}
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-amber-500 hover:opacity-90 text-white gap-2"
                onClick={handleShareLink}
              >
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
              <Button 
                variant="outline" 
                className="border-slate-600 hover:border-emerald-500 text-slate-400 hover:text-emerald-400"
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Cada indicação vale <span className="text-emerald-400 font-medium">10 pontos</span> 
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <Gem className="h-3 w-3 text-amber-400" />
            Ganhe <span className="text-emerald-400 font-medium">500 pontos</span> ao atingir 5 indicações
          </div>
        </CardFooter>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Indicações', value: '12', icon: Users },
          { label: 'Pontos Ganhos', value: '120', icon: Award },
          { label: 'Convites Enviados', value: '8', icon: Send },
          { label: 'Prêmios Alcançados', value: '3', icon: Crown },
        ].map((item, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="text-xs text-slate-400">{item.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
