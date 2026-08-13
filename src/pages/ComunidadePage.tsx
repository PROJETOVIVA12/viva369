import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Heart, MessageCircle, Share2, Users, Plus, Send, Loader2, User, Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  usuario_id: string;
  titulo: string | null;
  conteudo: string;
  imagem_url?: string;
  created_at: string;
  curtidas: number;
  comentarios: number;
}

export default function ComunidadePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [novoPost, setNovoPost] = useState('');
  const [postando, setPostando] = useState(false);
  const [curtindo, setCurtindo] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    setLoading(true);
    try {
      // Consulta SIMPLES - sem JOIN para evitar erro 400
      const { data, error } = await supabase
        .from('comunidade_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Erro ao carregar posts:', error);
        setMensagem({ tipo: 'erro', texto: 'Erro ao carregar posts' });
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const criarPost = async () => {
    if (!novoPost.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Digite algo para publicar' });
      return;
    }

    setPostando(true);
    setMensagem(null);
    try {
      const { data, error } = await supabase
        .from('comunidade_posts')
        .insert({
          usuario_id: user?.id,
          titulo: null,
          conteudo: novoPost.trim(),
          status: 'ativo',
          curtidas: 0,
          comentarios: 0
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setPosts(prev => [data, ...prev]);
        setMensagem({ tipo: 'sucesso', texto: '✅ Post publicado com sucesso!' });
      }

      setNovoPost('');
      setTimeout(() => setShowDialog(false), 1000);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao publicar. Tente novamente.' });
    } finally {
      setPostando(false);
    }
  };

  const curtirPost = async (postId: string) => {
    setCurtindo(postId);
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const { error } = await supabase
        .from('comunidade_posts')
        .update({ curtidas: (post.curtidas || 0) + 1 })
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, curtidas: (p.curtidas || 0) + 1 } : p
      ));
    } catch (error) {
      console.error('Erro ao curtir:', error);
    } finally {
      setCurtindo(null);
    }
  };

  const formatarData = (data: string) => {
    const agora = new Date();
    const dataPost = new Date(data);
    const diff = Math.floor((agora.getTime() - dataPost.getTime()) / 1000);

    if (diff < 60) return 'agora mesmo';
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d atrás`;
    return dataPost.toLocaleDateString('pt-BR');
  };

  const getUserName = () => {
    return user?.user_metadata?.nome || user?.email?.split('@')[0] || 'Usuário';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Comunidade VIVA+</h1>
          <p className="text-slate-400">Compartilhe sua jornada com a comunidade</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white" onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      {mensagem && (
        <Alert className={cn(
          mensagem.tipo === 'sucesso' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
        )}>
          <AlertDescription className={cn(
            mensagem.tipo === 'sucesso' ? 'text-emerald-400' : 'text-red-400'
          )}>
            {mensagem.texto}
          </AlertDescription>
        </Alert>
      )}

      {posts.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium">Seja o primeiro a publicar!</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Compartilhe sua jornada com a comunidade Viva369 e inspire outras pessoas.</p>
            <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white gap-2" onClick={() => setShowDialog(true)}>
              <Plus className="h-4 w-4" />
              Criar Primeiro Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                      {getUserName().charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white">{getUserName()}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-500">{formatarData(post.created_at)}</span>
                    </div>
                    <p className="text-slate-300 mt-1 whitespace-pre-wrap">{post.conteudo}</p>
                    <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-700/50">
                      <button className={cn(
                        "flex items-center gap-1 text-sm transition-colors",
                        curtindo === post.id ? "text-emerald-400" : "text-slate-400 hover:text-emerald-400"
                      )} onClick={() => curtirPost(post.id)} disabled={curtindo === post.id}>
                        {curtindo === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4" />}
                        <span>{post.curtidas || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comentarios || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-400" />
              Criar Novo Post
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                  {getUserName().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white text-sm font-medium">{getUserName()}</p>
                <p className="text-xs text-slate-400">Compartilhando com a comunidade</p>
              </div>
            </div>
            <Textarea value={novoPost} onChange={(e) => setNovoPost(e.target.value)} placeholder="O que você quer compartilhar?" className="bg-slate-700 border-slate-600 text-white min-h-[120px] resize-none" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} className="border-slate-600 text-slate-400">Cancelar</Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white gap-2" onClick={criarPost} disabled={postando || !novoPost.trim()}>
              {postando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
