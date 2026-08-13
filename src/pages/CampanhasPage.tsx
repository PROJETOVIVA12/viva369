import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Send } from 'lucide-react';
import { DADOS_EMPRESA } from '@/config/empresa';

const campanhasExemplo = [
  {
    id: 1,
    titulo: 'Promoção de Inverno',
    descricao: 'Aqueça suas noites com 20% de desconto em todo o cardápio de caldos e sopas.',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    textoWhats: `🥶 Promoção de Inverno na ${DADOS_EMPRESA.nome}! Aqueça suas noites com 20% OFF nos nossos caldos. Peça já o seu! \n\nAcesse nosso cardápio: ${window.location.origin}/cardapio`
  },
  {
    id: 2,
    titulo: 'Sexta-feira Especial',
    descricao: 'Na compra de 2 Pratos Principais, a sobremesa é por nossa conta!',
    imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    textoWhats: `🎉 Sexta Especial ${DADOS_EMPRESA.nome}! Peça 2 Pratos Principais e ganhe uma sobremesa incrível. Vem comemorar o início do fim de semana com a gente! \n\nAcesse nosso cardápio: ${window.location.origin}/cardapio`
  },
  {
    id: 3,
    titulo: 'Combo Família',
    descricao: 'Almoço de domingo garantido com nosso combo família. Serve até 4 pessoas com preço especial.',
    imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    textoWhats: `👨‍👩‍👧‍👦 Combo Família ${DADOS_EMPRESA.nome}! Seu almoço de domingo mais gostoso e prático. Serve até 4 pessoas com aquele sabor que você já conhece. \n\nFaça sua reserva ou peça agora: ${window.location.origin}/cardapio`
  }
];

export default function CampanhasPage() {
  const shareWhatsApp = (texto: string) => {
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Megaphone className="w-8 h-8 text-primary" /> Campanhas
        </h2>
        <p className="text-muted-foreground">Materiais prontos para você compartilhar e alavancar suas vendas.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campanhasExemplo.map(campanha => (
          <Card key={campanha.id} className="border-border bg-card overflow-hidden flex flex-col">
            <div className="aspect-video w-full bg-muted">
              <img src={campanha.imagem} alt={campanha.titulo} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{campanha.titulo}</CardTitle>
              <CardDescription className="line-clamp-2">{campanha.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted/50 p-3 rounded-md border border-border text-sm text-muted-foreground line-clamp-3 italic">
                "{campanha.textoWhats}"
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 font-bold" onClick={() => shareWhatsApp(campanha.textoWhats)}>
                <Send className="w-4 h-4" /> Compartilhar no WhatsApp
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
