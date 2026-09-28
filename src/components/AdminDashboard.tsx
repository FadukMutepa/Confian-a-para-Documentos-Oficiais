import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  LogOut,
  Users,
  FileCheck,
  ExternalLink,
} from 'lucide-react';
import { ViewMode, Institution } from '../types.ts';

interface AdminDashboardProps {
  onNavigate: (view: ViewMode) => void;
  institutions: Institution[];
  onUpdateStatus: (id: string, newStatus: 'APPROVED' | 'PENDING' | 'SUSPENDED') => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  onNavigate,
  institutions,
  onUpdateStatus,
  onLogout,
}: AdminDashboardProps) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'SUSPENDED'>('ALL');

  const pendingCount = institutions.filter((i) => i.status === 'PENDING').length;
  const approvedCount = institutions.filter((i) => i.status === 'APPROVED').length;
  const suspendedCount = institutions.filter((i) => i.status === 'SUSPENDED').length;

  const filteredInstitutions = institutions.filter((i) => {
    if (filter === 'ALL') return true;
    return i.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs">
              ADM
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block">
                Painel do Administrador Geral
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                admin@veridoc.app (Modo Simulação)
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
              <span>Terminar Sessão</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Total Instituições</span>
            <span className="text-2xl font-bold text-slate-900 mt-1 block">
              {institutions.length}
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-amber-600 font-medium block">Aguardando Aprovação</span>
            <span className="text-2xl font-bold text-amber-700 mt-1 block">
              {pendingCount}
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-emerald-600 font-medium block">Aprovadas & Ativas</span>
            <span className="text-2xl font-bold text-emerald-700 mt-1 block">
              {approvedCount}
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-rose-600 font-medium block">Suspensas</span>
            <span className="text-2xl font-bold text-rose-700 mt-1 block">
              {suspendedCount}
            </span>
          </div>
        </div>

        {/* Action Notice */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-3">
          <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-950 block mb-0.5">
              Simulador de Gestão de Acessos Institucionais
            </span>
            <p className="leading-relaxed">
              Aqui você pode aprovar instituições recém-cadastradas (com status <strong>PENDING</strong>) para que possam emitir documentos e fazer login, ou suspendê-las para testar o bloqueio de segurança.
            </p>
          </div>
        </div>

        {/* Institutions Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Instituições de Ensino e Entidades
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Controle de credenciamento e emissão no VeriDoc
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas ({institutions.length})
              </button>
              <button
                onClick={() => setFilter('PENDING')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'PENDING' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pendentes ({pendingCount})
              </button>
              <button
                onClick={() => setFilter('APPROVED')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'APPROVED' ? 'bg-emerald-100 text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aprovadas ({approvedCount})
              </button>
              <button
                onClick={() => setFilter('SUSPENDED')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'SUSPENDED' ? 'bg-rose-100 text-rose-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Suspensas ({suspendedCount})
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Instituição & Local</th>
                  <th className="py-3.5 px-4">Responsável & Login</th>
                  <th className="py-3.5 px-4">Tipo</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Ação de Controle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInstitutions.map((inst) => (
                  <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 block text-sm">
                        {inst.name}
                      </span>
                      <span className="text-slate-500 block text-xs mt-0.5">
                        {inst.city}, {inst.country} · {inst.email}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-800 block">
                        {inst.responsibleName}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px] block mt-0.5">
                        {inst.responsibleEmail}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {inst.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {inst.status === 'APPROVED' && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold text-[11px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>APROVADA</span>
                        </span>
                      )}
                      {inst.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-semibold text-[11px]">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>PENDING</span>
                        </span>
                      )}
                      {inst.status === 'SUSPENDED' && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full font-semibold text-[11px]">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>SUSPENSA</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inst.status === 'PENDING' && (
                          <button
                            onClick={() => onUpdateStatus(inst.id, 'APPROVED')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            Aprovar
                          </button>
                        )}
                        {inst.status === 'APPROVED' && (
                          <button
                            onClick={() => onUpdateStatus(inst.id, 'SUSPENDED')}
                            className="bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            Suspender
                          </button>
                        )}
                        {inst.status === 'SUSPENDED' && (
                          <button
                            onClick={() => onUpdateStatus(inst.id, 'APPROVED')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            Reativar
                          </button>
                        )}
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
