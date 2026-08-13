import React from 'react';
import { Link } from 'react-router-dom';
import { useLiveStatus } from '@/services/liveStatusService';
import { Radio, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LiveStatusBadge() {
  const { isLive, liveStatus, loading } = useLiveStatus();

  if (loading) {
    return (
      <Button variant="outline" className="border-slate-600 text-slate-400" disabled>
        <Radio className="h-4 w-4 mr-2" />
        Carregando...
      </Button>
    );
  }

  return (
    <Link to="/lives">
      <Button 
        className={cn(
          "gap-2 transition-all duration-300 relative overflow-hidden",
          isLive 
            ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg shadow-red-500/50" 
            : "bg-slate-700 hover:bg-slate-600 text-slate-300"
        )}
      >
        {isLive && (
          <>
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <Radio className="h-4 w-4 animate-pulse" />
              <span className="font-bold">AO VIVO</span>
              {liveStatus?.titulo && (
                <span className="text-xs opacity-80 hidden sm:inline">
                  • {liveStatus.titulo}
                </span>
              )}
            </span>
          </>
        )}
        {!isLive && (
          <span className="relative flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Ver Lives</span>
          </span>
        )}
      </Button>
    </Link>
  );
}
