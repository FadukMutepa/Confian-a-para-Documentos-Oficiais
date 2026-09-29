import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ArrowLeft,
  Lock,
} from 'lucide-react';

export type PublicVerificationState = 'autentico' | 'alterado' | 'revogado';

interface PublicVerificationViewProps {
  status: PublicVerificationState;
  code?: string;
  onNavigateHome: () => void;
  onChangeStatus?: (newStatus: PublicVerificationState) => void;
}

export default function PublicVerificationView({
  status,
  code = 'VD-2026-AUT001',
  onNavigateHome,
  onChangeStatus,
}: PublicVerificationViewProps) {
  const displayCode = code.toUpperCase();

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-center items-center py-10 px-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top navigation back button & simulator switcher */}
      <div className="w-full max-w-[440px] mb-4 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao portal VeriDoc</span>
        </button>

        {/* Quick simulator switcher */}
        {onChangeStatus && (
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs text-[11px] font-semibold">
            <button
              onClick={() => onChangeStatus('autentico')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                status === 'autentico'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              🟢 Válido
            </button>
            <button
              onClick={() => onChangeStatus('alterado')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                status === 'alterado'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              🟠 Alterado
            </button>
            <button
              onClick={() => onChangeStatus('revogado')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                status === 'revogado'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              🔴 Revogado
            </button>
          </div>
        )}
      </div>

      {/* Main Container with ID #resultado as requested */}
      <div
        id="resultado"
        className="w-full max-w-[440px] bg-white rounded-3xl border-2 border-slate-900 shadow-2xl overflow-hidden p-7 sm:p-8 flex flex-col relative"
      >
        {/* Card Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              VeriDoc
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-500 mt-0.5">
            /verify/{displayCode}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. AUTÊNTICO (DOCUMENTO VÁLIDO)                           */}
        {/* ========================================================= */}
        {status === 'autentico' && (
          <div className="resultado autentico">
            {/* Green Banner matching illustration */}
            <div className="bg-[#15803d] rounded-2xl py-6 px-4 text-center text-white shadow-md mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2.5">
                <CheckCircle2 className="w-9 h-9 text-white" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-wider uppercase">
                DOCUMENTO VÁLIDO
              </h2>
              <p className="text-xs font-semibold text-emerald-100 tracking-wider mt-0.5">
                Estado: AUTÊNTICO
              </p>
            </div>

            {/* Document Details from illustration */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium shrink-0">
                  Nome do Titular
                </span>
                <span className="font-bold text-slate-900 text-right">
                  Carlos Eduardo Mendes
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium shrink-0">
                  Curso
                </span>
                <span className="font-bold text-slate-900 text-right leading-tight">
                  Engenharia de Software
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium shrink-0">
                  Data de Emissão
                </span>
                <span className="font-bold text-slate-900 text-right">
                  15 de Março de 2026
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500 font-medium shrink-0">
                  Órgão Emissor
                </span>
                <span className="font-bold text-slate-900 text-right leading-tight">
                  Instituto Politécnico Nacional
                </span>
              </div>
            </div>

            {/* Cryptographic check */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Assinatura Digital Verificada</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-700 font-bold">SHA-256 OK</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. ALTERADO (DADOS NÃO CORRESPONDEM)                      */}
        {/* ========================================================= */}
        {status === 'alterado' && (
          <div className="resultado alterado">
            {/* Amber Banner matching illustration */}
            <div className="bg-[#d97706] rounded-2xl py-6 px-4 text-center text-white shadow-md mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2.5">
                <AlertTriangle className="w-9 h-9 text-white" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-wider uppercase">
                DADOS NÃO CORRESPONDEM
              </h2>
              <p className="text-xs font-semibold text-amber-100 tracking-wider mt-0.5">
                Estado: ALTERADO
              </p>
            </div>

            {/* Exact message from illustration */}
            <div className="py-2">
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                O cruzamento de dados acusa divergência: nome, nota ou curso foram editados no documento.
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <strong className="block font-bold text-amber-950 mb-1">
                Alerta de Integridade Criptográfica:
              </strong>
              O hash do ficheiro apresentado não coincide com o registo imutável armazenado na plataforma oficial da instituição emissora.
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Falha de Autenticidade</span>
              </span>
              <span className="font-mono text-[10px] text-rose-500 font-bold">HASH INVÁLIDO</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. REVOGADO (DOCUMENTO REVOGADO)                          */}
        {/* ========================================================= */}
        {status === 'revogado' && (
          <div className="resultado revogado">
            {/* Red Banner matching illustration */}
            <div className="bg-[#b91c1c] rounded-2xl py-6 px-4 text-center text-white shadow-md mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2.5">
                <XCircle className="w-9 h-9 text-white" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-wider uppercase">
                DOCUMENTO REVOGADO
              </h2>
              <p className="text-xs font-semibold text-rose-100 tracking-wider mt-0.5">
                Estado: REVOGADO
              </p>
            </div>

            {/* Exact message from illustration */}
            <div className="py-2">
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                <strong className="underline font-bold">A</strong> instituição alterou o estado do registo. O QR Code passa <strong className="underline font-bold">a</strong> exibir este alerta.
              </p>
            </div>

            <div className="mt-6 p-4 bg-rose-50 rounded-2xl border border-rose-200/80 text-xs text-rose-900 leading-relaxed">
              <strong className="block font-bold text-rose-950 mb-1">
                Motivo da Revogação:
              </strong>
              Cancelamento formal emitido pela Secretaria Académica da entidade emissora. Este documento perdeu qualquer validade legal.
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-rose-700 font-semibold">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Estado: Revogado Oficialmente</span>
              </span>
              <span className="font-mono text-[10px] text-rose-600 font-bold">CANCELADO</span>
            </div>
          </div>
        )}
      </div>

      {/* Label below card */}
      <div className="mt-4 text-center">
        {status === 'autentico' && (
          <span className="font-bold text-base text-[#15803d]">Autêntico</span>
        )}
        {status === 'alterado' && (
          <span className="font-bold text-base text-[#d97706]">Alterado</span>
        )}
        {status === 'revogado' && (
          <span className="font-bold text-base text-[#b91c1c]">Revogado</span>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3 text-center max-w-sm">
        Consulta pública garantida pela tecnologia de certificação digital VeriDoc
      </p>
    </div>
  );
}
