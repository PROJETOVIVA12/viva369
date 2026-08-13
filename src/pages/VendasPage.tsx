import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VendasPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        {/* Logo 369 */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444"/>
                  <stop offset="35%" stopColor="#f59e0b"/>
                  <stop offset="70%" stopColor="#fbbf24"/>
                  <stop offset="100%" stopColor="#00A651"/>
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="85" fill="none" stroke="url(#grad)" strokeWidth="14"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>369</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          VIVA369
        </h1>

        <div className="flex items-center justify-center gap-2 text-green-500 text-sm font-semibold mb-4">
          <span className="w-8 h-0.5 bg-green-500"></span>
          MÉTODO COMPROVADO DE 90 DIAS
          <span className="w-8 h-0.5 bg-green-500"></span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Conheça seu corpo.
          <br />
          <span className="text-green-500">Transforme sua vida.</span>
        </h2>

        <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
          Mais que um aplicativo. Uma experiência imersiva de 90 dias que une avaliação profissional, gamificação e comunidade para a sua versão mais poderosa.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-2xl transition text-lg"
        >
          INICIAR MINHA TRANSFORMAÇÃO
        </button>
      </div>
    </div>
  );
}
