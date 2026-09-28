import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  FileCheck2,
  FileText,
  QrCode,
  LogOut,
  ExternalLink,
  CheckCircle,
  Ban,
  Building2,
  Search,
} from 'lucide-react';
import { ViewMode, Institution, OfficialDocument } from '../types.ts';

interface InstitutionDashboardProps {
  onNavigate: (view: ViewMode) => void;
  institution: Institution;
  documents: OfficialDocument[];
  onAddDocument: (doc: OfficialDocument) => void;
  onToggleStatus: (code: string) => void;
  onVerifyDocument: (code: string) => void;
  onLogout: () => void;
}

export default function InstitutionDashboard({
  onNavigate,
  institution,
  documents,
  onAddDocument,
  onToggleStatus,
  onVerifyDocument,
  onLogout,
}: InstitutionDashboardProps) {
  const [showEmitModal, setShowEmitModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [issueDate, setIssueDate] = useState('2026-09-28');

  // Filter documents for this institution or general
  const myDocs = documents.filter(
    (d) => d.institutionName.toLowerCase() === institution.name.toLowerCase() || documents.length > 0
  );

  const handleEmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !studentName.trim()) return;

    // Generate simulated code and hash
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCode = `VD-2026-${randomHex}`;
    const fakeHash = `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.substring(0, 24) + '...';

    const newDoc: OfficialDocument = {
      code: newCode,
      title: docTitle,
      studentName: studentName,
      issueDate: new Date(issueDate).toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      institutionName: institution.name,
      hash: fakeHash,
      status: 'VALID',
    };

    onAddDocument(newDoc);
    setDocTitle('');
    setStudentName('');
    setShowEmitModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block">
                {institution.name}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {institution.responsibleEmail} · Emissor Homologado
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Ir ao Site
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/60 border border-rose-800/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Info Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instituição Ativa e Homologada</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Emissão e Gestão de Documentos Oficiais
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Todos os certificados emitidos nesta simulação recebem hash criptográfico e QR Code para verificação pública imediata.
            </p>
          </div>

          <button
            onClick={() => setShowEmitModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Emitir Novo Documento</span>
          </button>
        </div>

        {/* Modal for Emitting Document */}
        {showEmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    Emitir Certificado / Diploma Digital
                  </h3>
                </div>
                <button
                  onClick={() => setShowEmitModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleEmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Título do Documento Oficial *
                  </label>
                  <input
                    type="text"
                    required
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Ex: Engenharia de Software e Sistemas de Informação"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo do Titular / Aluno *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Ex: Mariana Silva Rocha"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Data de Emissão *
                  </label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
                  O VeriDoc calculará automaticamente o <strong>hash SHA-256</strong> inviolável e gerará o código alfanumérico para verificação pública.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEmitModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Gerar Selo Digital & Emitir
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Issued Documents List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Documentos Emitidos pela Instituição
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Total de {documents.length} documento(s) registrado(s) no sistema
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Código de Registo</th>
                  <th className="py-3.5 px-4">Documento / Titular</th>
                  <th className="py-3.5 px-4">Data Emissão</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações no Simulador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.code} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-blue-600 block text-xs">
                        {doc.code}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px] block truncate max-w-[150px] mt-0.5">
                        Hash: {doc.hash}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 block text-sm">
                        {doc.title}
                      </span>
                      <span className="text-slate-600 text-xs block mt-0.5">
                        Titular: <strong>{doc.studentName}</strong>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {doc.issueDate}
                    </td>
                    <td className="py-4 px-4">
                      {doc.status === 'VALID' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>AUTÊNTICO / VÁLIDO</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
                          <Ban className="w-3 h-3 text-rose-600" />
                          <span>REVOGADO</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onVerifyDocument(doc.code)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Verificar no Validador</span>
                        </button>

                        <button
                          onClick={() => onToggleStatus(doc.code)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            doc.status === 'VALID'
                              ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {doc.status === 'VALID' ? 'Revogar' : 'Revalidar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
