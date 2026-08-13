import React from 'react';
import { QrCode, Download, Share2, Copy, Check, X, Users, Gift, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import QRCode from 'qrcode.react';
import { useAuth } from '@/contexts/AuthContext';

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  title?: string;
}

export default function QRCodeModal({ open, onOpenChange, data, title = 'QR Code' }: QRCodeModalProps) {
  const { user } = useAuth();
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState('');

  // URL que direciona para a avaliação pública com o ID de indicação
  const userId = user?.id || '';
  const url = `${window.location.origin}/publico/${data?.id}?ref=${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    try {
      const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.download = `viva369-avaliacao-${data?.id || Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (err) {
      setError('Erro ao baixar QR Code');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleShare = async () => {
    const mensagem = `🌟 *VIVA369 - Minha Avaliação Física*\n\n`
      + `Olá! Quero compartilhar meu resultado no VIVA369.\n\n`
      + `🔗 ${url}\n\n`
      + `💚 VIVA369 - Sua jornada de saúde\n`
      + `💰 Ao se cadastrar, você ganha R$ 125,00 de bônus!`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'VIVA369 - Avaliação Física',
          text: 'Acesse minha avaliação física e comece sua jornada!',
          url: url
        });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <QrCode className="h-5 w-5 text-emerald-400" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Compartilhe sua avaliação e ganhe R$ 125,00 por indicação!
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <QRCode
              id="qr-code-canvas"
              value={url}
              size={180}
              level="H"
              includeMargin={true}
              renderAs="canvas"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-white font-medium">📱 Aponte a câmera</p>
            <p className="text-xs text-slate-400">
              A amiga vai ver sua avaliação e poderá se cadastrar
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs">
              <Gift className="h-4 w-4" />
              <span>R$ 125,00 de bônus para quem indicar!</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-400 hover:text-white gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Baixar QR Code
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 gap-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-400 hover:text-white gap-2"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? 'Copiado!' : 'Copiar Link'}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-400 w-full"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
