import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  ExternalLink,
  Copy,
  Check,
  X,
  Smartphone,
} from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStatus?: (status: 'autentico' | 'alterado' | 'revogado', code: string) => void;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  onSelectStatus,
}: QRCodeModalProps) {
  const [selectedHost, setSelectedHost] = useState<'worker' | 'preview'>('worker');
  const [qrAutentico, setQrAutentico] = useState('');
  const [qrAlterado, setQrAlterado] = useState('');
  const [qrRevogado, setQrRevogado] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const workerBase = 'https://confian-a-para-documentos-oficiais.flaress.workers.dev';
  const previewBase = typeof window !== 'undefined' ? window.location.origin : workerBase;

  const activeBase = selectedHost === 'worker' ? workerBase : previewBase;

  // Exact URLs requested by user
  const urlAutentico = `${activeBase}/?codigo=VD-2026-AUT001`;
  const urlAlterado = `${activeBase}/?codigo=VD-2026-ALT001`;
  const urlRevogado = `${activeBase}/?codigo=VD-2026-REV001`;

  useEffect(() => {
    QRCode.toDataURL(urlAutentico, { width: 340, margin: 2 }).then(setQrAutentico);
    QRCode.toDataURL(urlAlterado, { width: 340, margin: 2 }).then(setQrAlterado);
    QRCode.toDataURL(urlRevogado, { width: 340, margin: 2 }).then(setQrRevogado);
  }, [urlAutentico, urlAlterado, urlRevogado]);

  if (!isOpen) return null;

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const downloadQR = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-[#0b1328] border border-blue-900/80 rounded-3xl max-w-4xl w-full p-6 sm:p-8 text-white shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900/60 border border-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              3 Códigos QR Sincronizados com a Consulta Pública
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Escaneie diretamente com o telemóvel para abrir a consulta com a função <code className="text-cyan-400 font-mono">mostrarResultado()</code>
            </p>
          </div>
        </div>

        {/* Host Selector */}
        <div className="mb-6 p-3 bg-slate-900/80 border border-blue-950 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-medium">Destino dos Códigos QR:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedHost('worker')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedHost === 'worker'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Cloudflare Worker (Oficial)
            </button>
            <button
              onClick={() => setSelectedHost('preview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedHost === 'preview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              App Local / Preview
            </button>
          </div>
        </div>

        {/* The 3 QR Code Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. AUTÊNTICO */}
          <div className="bg-[#0f1d38] border-2 border-emerald-500/60 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg shadow-emerald-950/30">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 text-xs font-bold uppercase mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1. Autêntico</span>
            </div>

            {/* QR Image */}
            <div className="bg-white p-3 rounded-2xl shadow-md mb-4 w-48 h-48 flex items-center justify-center">
              {qrAutentico ? (
                <img
                  src={qrAutentico}
                  alt="QR Code Autêntico"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="animate-pulse bg-slate-200 w-full h-full rounded" />
              )}
            </div>

            <span className="text-xs font-bold text-emerald-400">
              DOCUMENTO VÁLIDO
            </span>
            <span className="text-[11px] font-mono text-cyan-300 font-bold mt-1">
              ?codigo=VD-2026-AUT001
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Estado: AUTÊNTICO
            </span>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-blue-900/60 w-full flex items-center justify-center gap-2">
              <button
                onClick={() => downloadQR(qrAutentico, 'qrcode-VD-2026-AUT001.png')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Descarregar imagem do QR Code"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Salvar</span>
              </button>

              <button
                onClick={() => copyToClipboard(urlAutentico)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Copiar Link"
              >
                {copiedUrl === urlAutentico ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copiar</span>
              </button>

              {onSelectStatus && (
                <button
                  onClick={() => {
                    onSelectStatus('autentico', 'VD-2026-AUT001');
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver</span>
                </button>
              )}
            </div>
          </div>

          {/* 2. ALTERADO */}
          <div className="bg-[#0f1d38] border-2 border-amber-500/60 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg shadow-amber-950/30">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-400 text-xs font-bold uppercase mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>2. Alterado</span>
            </div>

            {/* QR Image */}
            <div className="bg-white p-3 rounded-2xl shadow-md mb-4 w-48 h-48 flex items-center justify-center">
              {qrAlterado ? (
                <img
                  src={qrAlterado}
                  alt="QR Code Alterado"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="animate-pulse bg-slate-200 w-full h-full rounded" />
              )}
            </div>

            <span className="text-xs font-bold text-amber-400">
              DADOS NÃO CORRESPONDEM
            </span>
            <span className="text-[11px] font-mono text-cyan-300 font-bold mt-1">
              ?codigo=VD-2026-ALT001
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Estado: ALTERADO
            </span>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-blue-900/60 w-full flex items-center justify-center gap-2">
              <button
                onClick={() => downloadQR(qrAlterado, 'qrcode-VD-2026-ALT001.png')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Descarregar imagem do QR Code"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Salvar</span>
              </button>

              <button
                onClick={() => copyToClipboard(urlAlterado)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Copiar Link"
              >
                {copiedUrl === urlAlterado ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copiar</span>
              </button>

              {onSelectStatus && (
                <button
                  onClick={() => {
                    onSelectStatus('alterado', 'VD-2026-ALT001');
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. REVOGADO */}
          <div className="bg-[#0f1d38] border-2 border-rose-500/60 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg shadow-rose-950/30">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/60 text-rose-400 text-xs font-bold uppercase mb-4">
              <XCircle className="w-3.5 h-3.5" />
              <span>3. Revogado</span>
            </div>

            {/* QR Image */}
            <div className="bg-white p-3 rounded-2xl shadow-md mb-4 w-48 h-48 flex items-center justify-center">
              {qrRevogado ? (
                <img
                  src={qrRevogado}
                  alt="QR Code Revogado"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="animate-pulse bg-slate-200 w-full h-full rounded" />
              )}
            </div>

            <span className="text-xs font-bold text-rose-400">
              DOCUMENTO REVOGADO
            </span>
            <span className="text-[11px] font-mono text-cyan-300 font-bold mt-1">
              ?codigo=VD-2026-REV001
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Estado: REVOGADO
            </span>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-blue-900/60 w-full flex items-center justify-center gap-2">
              <button
                onClick={() => downloadQR(qrRevogado, 'qrcode-VD-2026-REV001.png')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Descarregar imagem do QR Code"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Salvar</span>
              </button>

              <button
                onClick={() => copyToClipboard(urlRevogado)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Copiar Link"
              >
                {copiedUrl === urlRevogado ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copiar</span>
              </button>

              {onSelectStatus && (
                <button
                  onClick={() => {
                    onSelectStatus('revogado', 'VD-2026-REV001');
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 pt-4 border-t border-blue-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>O parâmetro <code className="text-cyan-300">?codigo=...</code> aciona a função <code className="text-cyan-300">mostrarResultado()</code> e renderiza o cartão correspondente.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
