import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AvaliacaoResultadoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dados = location.state?.dados || {};

  const calcularIMC = (peso: number, altura: number) => {
    if (!peso || !altura) return 0;
    const alturaM = altura / 100;
    return peso / (alturaM * alturaM);
  };

  const imc = calcularIMC(parseFloat(dados.peso), parseFloat(dados.altura));
  const classificacaoIMC = imc < 18.5 ? 'Abaixo do peso' :
                           imc < 25 ? 'Peso normal' :
                           imc < 30 ? 'Sobrepeso' : 'Obesidade';

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-700">🌿 AVALIAÇÃO VIVA369</h1>
          <p className="text-gray-600">Seu resultado completo</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 p-6 rounded-2xl text-center">
          <div className="w-20 h-20 mx-auto bg-emerald-200 rounded-full flex items-center justify-center text-4xl">
            🧑
          </div>
          <h2 className="text-xl font-bold text-emerald-800 mt-2">{dados.nome || 'Participante'}</h2>
          <p className="text-gray-600">{dados.idade || '--'} anos • {dados.sexo || '--'}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-sm text-gray-500">⚖️ Peso</p>
            <p className="text-xl font-bold text-emerald-700">{dados.peso || '--'} kg</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-sm text-gray-500">🔥 Gordura</p>
            <p className="text-xl font-bold text-emerald-700">{dados.gordura || '--'} %</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-sm text-gray-500">💪 Massa Muscular</p>
            <p className="text-xl font-bold text-emerald-700">{dados.massa_muscular || '--'} %</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-sm text-gray-500">🫀 Visceral</p>
            <p className="text-xl font-bold text-emerald-700">{dados.gordura_visceral || '--'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-sm text-gray-500">⚡ Metabolismo</p>
            <p className="text-xl font-bold text-emerald-700">{dados.metabolismo || '--'} kcal</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-center">
            <p className="text-sm text-gray-500">🧬 Idade Biológica</p>
            <p className="text-xl font-bold text-emerald-700">{dados.idade_biologica || '--'} anos</p>
          </div>
        </div>

        <div className="mt-6 bg-emerald-50 p-4 rounded-xl">
          <h3 className="font-semibold text-emerald-800">📊 SEU RESULTADO</h3>
          <div className="mt-2 space-y-1">
            <p><span className="font-medium">IMC:</span> {imc.toFixed(1)} • <span className="text-emerald-700 font-medium">{classificacaoIMC}</span></p>
            <p><span className="font-medium">Risco Metabólico:</span> <span className="text-green-600">✅ Baixo</span></p>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 p-4 rounded-xl">
          <p className="text-sm text-yellow-800">
            💡 <span className="font-medium">ORIENTAÇÃO:</span> Pequenos ajustes na rotina vão trazer excelentes resultados!
          </p>
        </div>

        <button
          onClick={() => navigate('/cadastro?ref=VIVA-369')}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform mt-6"
        >
          🌿 QUERO TRANSFORMAR MINHA SAÚDE!
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          ✅ Avaliação com OMRON HBF-514C • {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
