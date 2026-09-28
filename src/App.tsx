import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  QrCode,
  Building2,
  LogIn,
  CheckCircle2,
  FileText,
  Smartphone,
  RotateCcw,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Lock,
  ArrowRight,
  Check,
} from 'lucide-react';

// SVG QR Code generator component to faithfully render the certificate QR code
function QRCodeSvg({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="QR Code de validação"
    >
      {/* Top Left Position Pattern */}
      <rect x="5" y="5" width="28" height="28" rx="2" fill="#0f172a" />
      <rect x="9" y="9" width="20" height="20" rx="1" fill="#ffffff" />
      <rect x="13" y="13" width="12" height="12" rx="1" fill="#0f172a" />

      {/* Top Right Position Pattern */}
      <rect x="67" y="5" width="28" height="28" rx="2" fill="#0f172a" />
      <rect x="71" y="9" width="20" height="20" rx="1" fill="#ffffff" />
      <rect x="75" y="13" width="12" height="12" rx="1" fill="#0f172a" />

      {/* Bottom Left Position Pattern */}
      <rect x="5" y="67" width="28" height="28" rx="2" fill="#0f172a" />
      <rect x="9" y="71" width="20" height="20" rx="1" fill="#ffffff" />
      <rect x="13" y="75" width="12" height="12" rx="1" fill="#0f172a" />

      {/* Data modules and timing tracks */}
      <rect x="37" y="7" width="4" height="4" fill="#0f172a" />
      <rect x="45" y="7" width="4" height="4" fill="#0f172a" />
      <rect x="53" y="7" width="4" height="4" fill="#0f172a" />

      <rect x="7" y="37" width="4" height="4" fill="#0f172a" />
      <rect x="7" y="45" width="4" height="4" fill="#0f172a" />
      <rect x="7" y="53" width="4" height="4" fill="#0f172a" />

      <rect x="37" y="17" width="5" height="5" fill="#0f172a" />
      <rect x="46" y="17" width="5" height="5" fill="#0f172a" />
      <rect x="55" y="17" width="5" height="5" fill="#0f172a" />

      <rect x="37" y="27" width="4" height="4" fill="#0f172a" />
      <rect x="45" y="27" width="4" height="4" fill="#0f172a" />
      <rect x="53" y="27" width="4" height="4" fill="#0f172a" />

      {/* Center cluster */}
      <rect x="37" y="37" width="8" height="8" fill="#0f172a" />
      <rect x="49" y="37" width="6" height="6" fill="#0f172a" />
      <rect x="37" y="49" width="6" height="6" fill="#0f172a" />
      <rect x="47" y="47" width="8" height="8" fill="#0f172a" />
      <rect x="59" y="37" width="6" height="6" fill="#0f172a" />
      <rect x="59" y="47" width="6" height="6" fill="#0f172a" />

      <rect x="69" y="37" width="5" height="5" fill="#0f172a" />
      <rect x="78" y="37" width="5" height="5" fill="#0f172a" />
      <rect x="87" y="37" width="6" height="6" fill="#0f172a" />
      <rect x="69" y="46" width="6" height="6" fill="#0f172a" />
      <rect x="79" y="46" width="5" height="5" fill="#0f172a" />
      <rect x="88" y="46" width="5" height="5" fill="#0f172a" />
      <rect x="69" y="55" width="5" height="5" fill="#0f172a" />
      <rect x="78" y="55" width="6" height="6" fill="#0f172a" />
      <rect x="88" y="55" width="5" height="5" fill="#0f172a" />

      <rect x="37" y="61" width="5" height="5" fill="#0f172a" />
      <rect x="46" y="61" width="5" height="5" fill="#0f172a" />
      <rect x="55" y="61" width="5" height="5" fill="#0f172a" />
      <rect x="37" y="70" width="6" height="6" fill="#0f172a" />
      <rect x="47" y="70" width="6" height="6" fill="#0f172a" />
      <rect x="57" y="70" width="6" height="6" fill="#0f172a" />
      <rect x="37" y="80" width="5" height="5" fill="#0f172a" />
      <rect x="46" y="80" width="6" height="6" fill="#0f172a" />
      <rect x="56" y="80" width="5" height="5" fill="#0f172a" />
      <rect x="37" y="89" width="6" height="6" fill="#0f172a" />
      <rect x="47" y="89" width="5" height="5" fill="#0f172a" />
      <rect x="56" y="89" width="6" height="6" fill="#0f172a" />

      {/* Bottom right region */}
      <rect x="69" y="65" width="6" height="6" fill="#0f172a" />
      <rect x="79" y="65" width="6" height="6" fill="#0f172a" />
      <rect x="89" y="65" width="5" height="5" fill="#0f172a" />
      <rect x="69" y="75" width="5" height="5" fill="#0f172a" />
      <rect x="78" y="75" width="6" height="6" fill="#0f172a" />
      <rect x="88" y="75" width="5" height="5" fill="#0f172a" />
      <rect x="69" y="85" width="6" height="6" fill="#0f172a" />
      <rect x="79" y="85" width="5" height="5" fill="#0f172a" />
      <rect x="88" y="85" width="6" height="6" fill="#0f172a" />
    </svg>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState('inicio');

  return (
    <div className="min-h-screen bg-[#070e1c] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR (Header)                           */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-50 bg-[#070e1c]/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              VeriDoc
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/40 p-1 rounded-xl border border-slate-800/60">
            <button
              onClick={() => setActiveNav('inicio')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeNav === 'inicio'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveNav('verificar')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeNav === 'verificar'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Verificar</span>
            </button>
            <button
              onClick={() => setActiveNav('instituicoes')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeNav === 'instituicoes'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Para Instituições
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>Entrar</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4.5 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Validar</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-[#070e1c] bg-grid-pattern pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle, Actions, Features */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>TECNOLOGIA DE AUTENTICAÇÃO DIGITAL</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.2] text-balance">
                Garantia de Autenticidade e Confiança para Documentos Oficiais
              </h1>

              {/* Description */}
              <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                O VeriDoc permite que universidades, escolas, empresas e órgãos reguladores emitam diplomas, certidões e declarações com selo criptográfico e QR Code de verificação instantânea.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg text-sm shadow-lg shadow-blue-600/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Verificar documento</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2.5 border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3 rounded-lg text-sm transition-all"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  <span>Entrar</span>
                </button>
              </div>

              {/* Trust Points (Imutabilidade, Leitura Instantânea, Instituições Verificadas) */}
              <div className="mt-12 pt-8 border-t border-slate-800/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Point 1 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white text-xs sm:text-sm font-semibold">
                      Imutabilidade
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Hash criptográfico único
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0 mt-0.5">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white text-xs sm:text-sm font-semibold">
                      Leitura Instantânea
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      QR Code em qualquer câmara
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white text-xs sm:text-sm font-semibold">
                      Instituições Verificadas
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Emissores homologados
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Certificate Preview Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-[#0a1428]/95 border border-blue-900/60 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative">
                {/* Header of Mock Certificate */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight">
                        Certificado Homologado
                      </h4>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Instituto Politécnico Nacional
                      </p>
                    </div>
                  </div>

                  {/* Authentic Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-400 text-[11px] font-semibold tracking-wider">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>AUTÊNTICO</span>
                  </div>
                </div>

                {/* Document Information Inner Box */}
                <div className="bg-[#050b16] rounded-xl p-4 border border-blue-950/80 mt-5">
                  <span className="text-slate-400 text-[10px] font-semibold tracking-wider uppercase block">
                    DOCUMENTO OFICIAL:
                  </span>
                  <p className="text-white font-semibold text-xs sm:text-sm mt-1 leading-snug">
                    Engenharia de Software e Sistemas de Informação
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-400 text-[11px] font-medium block">
                        Carlos Eduardo Mendes
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[11px] font-medium block">
                        15 de Março de 2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* Register Code, Hash & QR Code */}
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase block">
                      CÓDIGO DE REGISTO:
                    </span>
                    <span className="text-cyan-400 font-mono font-bold text-sm tracking-wide block">
                      VD-2026-9A8F2K
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] block truncate max-w-[200px]">
                      Hash: e3b0c44298fc1c14...
                    </span>
                  </div>

                  {/* QR Code graphic */}
                  <div className="bg-white p-2 rounded-lg shadow-md shrink-0">
                    <QRCodeSvg className="w-16 h-16 text-slate-900" />
                  </div>
                </div>

                {/* Model verification test link */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span>Testar verificação deste modelo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SECTION: COMO FUNCIONA O VERIDOC (Light)              */}
      {/* ======================================================== */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 font-bold text-xs tracking-wider uppercase block">
              SIMPLICIDADE & RIGOR
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Como Funciona o VeriDoc
            </h2>
            <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Um fluxo transparente que conecta emissores autorizados a qualquer pessoa que precise comprovar a idoneidade de um documento em segundos.
            </p>
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase mt-5 block">
                PASSO 01
              </span>
              <h3 className="text-slate-900 font-bold text-base sm:text-lg mt-1.5">
                Emissão Institucional
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                A instituição credenciada registra o documento no sistema fornecendo os dados do titular e as informações oficiais da certificação.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase mt-5 block">
                PASSO 02
              </span>
              <h3 className="text-slate-900 font-bold text-base sm:text-lg mt-1.5">
                Código Único & Selo QR
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                O VeriDoc gera instantaneamente um código alfanumérico exclusivo e um QR Code vinculado ao hash criptográfico dos dados.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase mt-5 block">
                PASSO 03
              </span>
              <h3 className="text-slate-900 font-bold text-base sm:text-lg mt-1.5">
                Validação Pública Instantânea
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                Qualquer entidade, empregador ou cidadão aponta a câmara ou digita o código e obtém o veredito oficial: Válido, Revogado ou Expirado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SECTION: CONFIANÇA INQUESTIONÁVEL (Light Slate)       */}
      {/* ======================================================== */}
      <section className="bg-[#f8fafc] text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Why Choose VeriDoc */}
            <div className="lg:col-span-5">
              <span className="text-blue-600 font-bold text-xs tracking-wider uppercase block">
                POR QUE ESCOLHER O VERIDOC
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2 text-balance">
                Confiança Inquestionável para Todos os Intervenientes
              </h2>
              <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Projetado para eliminar fraudes, burocracia e custos com autenticação em cartórios ou consultas manuais por email.
              </p>

              {/* 3 Key Points */}
              <div className="mt-8 space-y-6">
                {/* Point 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-xs sm:text-sm">
                      À Prova de Fraudes
                    </h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Códigos únicos associados a hashes SHA-256 impossíveis de serem adulterados sem invalidar a checagem.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600 shrink-0 mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-xs sm:text-sm">
                      Sem Necessidade de Apps
                    </h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      A verificação funciona nativamente no navegador de qualquer smartphone via QR Code ou digitação.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600 shrink-0 mt-0.5">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-xs sm:text-sm">
                      Gestão Completa de Ciclo de Vida
                    </h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      As instituições podem revogar documentos com justificativa legal ou definir prazos de expiração.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Grid for Universidades, Empresas & RH, Conselhos, Cidadãos */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 1: Para Universidades */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 font-bold text-sm sm:text-base mt-4">
                  Para Universidades
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2">
                  Emissão de diplomas digitais e históricos acadêmicos com validade garantida e suporte contra plágio.
                </p>
              </div>

              {/* Card 2: Para Empresas & RH */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 font-bold text-sm sm:text-base mt-4">
                  Para Empresas & RH
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2">
                  Validação imediata do currículo e títulos de candidatos em processos seletivos sem risco de certificados falsos.
                </p>
              </div>

              {/* Card 3: Para Conselhos Profissionais */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 font-bold text-sm sm:text-base mt-4">
                  Para Conselhos Profissionais
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2">
                  Emissão de carteiras profissionais, licenças e certidões de regularidade com rastreabilidade total.
                </p>
              </div>

              {/* Card 4: Para os Cidadãos */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 font-bold text-sm sm:text-base mt-4">
                  Para os Cidadãos
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2">
                  Portabilidade dos seus títulos e certificados em formato digital com autenticidade verificável em qualquer lugar.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CALL TO ACTION BANNER (Dark Navy)                     */}
      {/* ======================================================== */}
      <section className="bg-[#070e1c] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 text-center relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-[11px] font-semibold tracking-wider uppercase mb-5">
            <Building2 className="w-3.5 h-3.5" />
            <span>CREDENCIAMENTO OFICIAL</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Sua Instituição Ainda Emite Documentos em Papel Sem Selo Digital?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Modernize seus processos de certificação, proteja o prestígio da sua marca acadêmica ou corporativa e ofereça verificação instantânea aos seus alunos e clientes.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Cadastrar Minha Instituição</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3 rounded-lg text-xs sm:text-sm transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>Já Tenho Acesso</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="bg-[#050a16] text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* Column 1: Brand and description (4 cols) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                  <ShieldCheck className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  VeriDoc
                </span>
              </div>
              <p className="mt-3.5 text-slate-400 text-xs leading-relaxed max-w-sm">
                Plataforma tecnológica para validação e emissão de documentos autênticos com selo digital e QR Code para instituições de ensino, entidades e empresas.
              </p>

              {/* Security Pill Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 border border-slate-800 bg-slate-900/80 text-slate-400 text-[11px] px-2.5 py-1 rounded-md">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Criptografia SHA-256</span>
                </div>
                <div className="inline-flex items-center gap-1.5 border border-slate-800 bg-slate-900/80 text-slate-400 text-[11px] px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>QR Code Único</span>
                </div>
              </div>
            </div>

            {/* Column 2: Navegação (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
                Navegação
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">
                    Página Inicial
                  </a>
                </li>
                <li>
                  <a href="#verificar" className="hover:text-white transition-colors">
                    Verificar Código
                  </a>
                </li>
                <li>
                  <a href="#acesso" className="hover:text-white transition-colors">
                    Acesso Institucional
                  </a>
                </li>
                <li>
                  <a href="#cadastrar" className="hover:text-white transition-colors">
                    Cadastrar Entidade
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Solução (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
                Solução
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#como-funciona" className="hover:text-white transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#universidades" className="hover:text-white transition-colors">
                    Para Universidades
                  </a>
                </li>
                <li>
                  <a href="#conselhos" className="hover:text-white transition-colors">
                    Para Conselhos e Órgãos
                  </a>
                </li>
                <li>
                  <a href="#dashboard" className="hover:text-white transition-colors">
                    Visualizar Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Segurança & Autenticidade (4 cols) */}
            <div className="lg:col-span-4">
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
                Segurança & Autenticidade
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Todos os documentos registrados recebem assinatura digital inviolável, permitindo validação pública a qualquer hora.
              </p>

              {/* Verified Safe Environment Box */}
              <div className="mt-4 border border-slate-800 bg-[#081022] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Ambiente Seguro VeriDoc</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1 leading-snug">
                  Conformidade com padrões internacionais de autenticação digital.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p>© 2026 VeriDoc. Todos os direitos reservados.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#privacidade" className="hover:text-slate-400 transition-colors">
                Privacidade
              </a>
              <span>·</span>
              <a href="#termos" className="hover:text-slate-400 transition-colors">
                Termos de Uso
              </a>
              <span>·</span>
              <a href="#seguranca" className="hover:text-slate-400 transition-colors">
                Segurança da Informação
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
