import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  QrCode,
  Building2,
  Calendar,
  User,
  Hash,
  ArrowLeft,
  X,
  Lock,
} from 'lucide-react';
import { OfficialDocument } from '../types.ts';

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
  documents: OfficialDocument[];
}

export default function VerifyModal({
  isOpen,
  onClose,
  initialCode = 'VD-2026-9A8F2K',
  documents,
}: VerifyModalProps) {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<OfficialDocument | null>(null);

  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      const found = documents.find(
        (d) => d.code.toLowerCase() === initialCode.trim().toLowerCase()
      );
      setResult(found || null);
      setSearched(true);
    }
  }, [initialCode, documents]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchCode.trim().toLowerCase();
    const found = documents.find(
      (d) => d.code.toLowerCase() === clean || d.hash.toLowerCase().includes(clean)
    );
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-[#070e1c] border border-blue-900/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900/60 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Simulador de Validação Pública VeriDoc
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Insira o código de registo para verificar a idoneidade do documento
            </p>
          </div>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Ex: VD-2026-9A8F2K"
              className="w-full pl-10 pr-3.5 py-3 bg-[#0d182e] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
          >
            Verificar
          </button>
        </form>

        {/* Search Result */}
        {searched && (
          <div>
            {result ? (
              <div
                className={`rounded-2xl border p-6 transition-all ${
                  result.status === 'VALID'
                    ? 'bg-[#09152b] border-emerald-500/40 shadow-xl shadow-emerald-950/20'
                    : 'bg-[#180a0a] border-rose-500/40 shadow-xl shadow-rose-950/20'
                }`}
              >
                {/* Result Status Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-2.5">
                    {result.status === 'VALID' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span
                      className={`font-bold text-xs sm:text-sm tracking-wide uppercase ${
                        result.status === 'VALID' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {result.status === 'VALID'
                        ? 'Documento Autêntico e Homologado'
                        : 'Documento Revogado pela Instituição'}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Selo Criptográfico Ativo
                  </span>
                </div>

                {/* Details Grid */}
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      Documento Oficial:
                    </span>
                    <h3 className="text-white font-bold text-base mt-0.5">
                      {result.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Titular Certificado:
                      </span>
                      <span className="text-white font-semibold text-sm block mt-0.5">
                        {result.studentName}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Instituição Emissora:
                      </span>
                      <span className="text-cyan-400 font-semibold text-sm block mt-0.5">
                        {result.institutionName}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Código de Registo:
                      </span>
                      <span className="text-blue-400 font-mono font-bold text-sm block mt-0.5">
                        {result.code}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Data de Emissão:
                      </span>
                      <span className="text-slate-200 text-xs block mt-0.5">
                        {result.issueDate}
                      </span>
                    </div>
                  </div>

                  {/* Hash info */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Assinatura Digital SHA-256:
                      </span>
                      <span className="text-slate-400 font-mono text-[11px] block mt-0.5 truncate max-w-xs sm:max-w-md">
                        {result.hash}
                      </span>
                    </div>
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="text-white font-bold text-sm">
                  Documento não encontrado
                </h4>
                <p className="text-slate-400 text-xs mt-1">
                  Nenhum certificado com o código <strong className="text-white">{searchCode}</strong> foi localizado no simulador.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchCode('VD-2026-9A8F2K');
                    const found = documents.find((d) => d.code === 'VD-2026-9A8F2K');
                    setResult(found || null);
                  }}
                  className="mt-3 text-xs text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  Testar com o código oficial VD-2026-9A8F2K
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>Consulta pública criptográfica instantânea</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
