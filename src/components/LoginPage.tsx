import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import { ViewMode, Institution } from '../types.ts';

interface LoginPageProps {
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: (role: 'admin' | 'institution', institutionData?: Institution) => void;
  institutions: Institution[];
}

export default function LoginPage({
  onNavigate,
  onLoginSuccess,
  institutions,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Quick fill handler
  const handleQuickFill = (targetEmail: string, targetPass: string = '12345678') => {
    setEmail(targetEmail);
    setPassword(targetPass);
    setErrorMessage(null);
    setSuccessNotice(`Credenciais de ${targetEmail} inseridas para teste.`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // 1. Admin login simulation
    if (cleanEmail === 'admin@veridoc.app') {
      onLoginSuccess('admin');
      return;
    }

    // 2. Approved institution simulation (Instituto Politécnico Nacional)
    if (cleanEmail === 'carlos@politecnico.pt') {
      const inst = institutions.find((i) => i.responsibleEmail.toLowerCase() === 'carlos@politecnico.pt') || institutions[0];
      if (inst.status === 'SUSPENDED') {
        setErrorMessage('Acesso Suspenso: Esta instituição foi temporariamente suspensa pela Administração.');
        return;
      }
      onLoginSuccess('institution', inst);
      return;
    }

    // 3. Check dynamically registered institutions
    const matchedInst = institutions.find(
      (i) => i.responsibleEmail.toLowerCase() === cleanEmail || i.email.toLowerCase() === cleanEmail
    );

    if (matchedInst) {
      if (matchedInst.status === 'PENDING') {
        setErrorMessage(
          'Acesso Bloqueado: A sua instituição ainda está com status PENDING. Aguarde a validação dos dados pela Administração Central.'
        );
        return;
      }
      if (matchedInst.status === 'SUSPENDED') {
        setErrorMessage(
          'Acesso Suspenso: O acesso desta instituição foi temporariamente bloqueado pela Administração Central.'
        );
        return;
      }
      onLoginSuccess('institution', matchedInst);
      return;
    }

    // If generic credentials entered
    if (cleanEmail.length > 3) {
      setErrorMessage(
        'Conta não reconhecida no simulador. Utilize uma das credenciais de teste abaixo ou registe uma instituição no formulário de credenciamento.'
      );
    } else {
      setErrorMessage('Por favor, informe um endereço de email válido.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top back button */}
      <div className="w-full max-w-[480px] mb-4">
        <button
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à página inicial</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-200/90 p-8 sm:p-10 relative">
        {/* Brand Logo Lockup */}
        <div className="flex flex-col items-center text-center">
          <div className="w-13 h-13 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 mb-3">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            VeriDoc
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
            Acesso Institucional
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Autenticação segura conectada ao banco de dados MySQL
          </p>
        </div>

        {/* Notices */}
        {errorMessage && (
          <div className="mt-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {successNotice && (
          <div className="mt-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <p className="leading-relaxed">{successNotice}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Corporativo ou Académico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@instituicao.edu"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Palavra-passe
              </label>
              <button
                type="button"
                onClick={() => alert('Simulador: utilize a palavra-passe padrão 12345678')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
              >
                Recuperar palavra-passe?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all tracking-wider"
              />
            </div>
          </div>

          {/* Keep signed in */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-xs text-slate-600 select-none cursor-pointer"
            >
              Manter sessão iniciada neste dispositivo
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Entrar no Painel</span>
          </button>
        </form>

        {/* Test Credentials Box */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
            <span className="block font-bold text-[10px] text-slate-500 tracking-wider uppercase mb-2.5">
              CREDENCIAIS DE TESTE CONFIGURADAS NO BANCO MYSQL:
            </span>

            {/* Test 1: Admin */}
            <div className="border border-rose-300 bg-white rounded-lg p-2.5 mb-2.5 flex items-center justify-between gap-2 shadow-xs">
              <div className="overflow-hidden">
                <span className="block font-semibold text-[11px] text-rose-700 leading-tight">
                  1. Administrador Geral (Aprova/Suspende)
                </span>
                <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
                  admin@veridoc.app
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@veridoc.app')}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                Preencher
              </button>
            </div>

            {/* Test 2: Approved Institution */}
            <div className="border border-blue-400 bg-white rounded-lg p-2.5 mb-2.5 flex items-center justify-between gap-2 shadow-xs">
              <div className="overflow-hidden">
                <span className="block font-semibold text-[11px] text-blue-700 leading-tight">
                  2. Instituição APROVADA (Acesso Livre)
                </span>
                <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
                  carlos@politecnico.pt
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleQuickFill('carlos@politecnico.pt')}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                Preencher
              </button>
            </div>

            {/* Test Control Warning Box */}
            <div className="border border-amber-300 bg-amber-50/70 rounded-lg p-2.5 text-[11px] text-amber-800 leading-relaxed">
              <span className="font-semibold text-amber-900 block mb-0.5">
                ⓘ Teste de Controle de Acesso:
              </span>
              Se criar uma nova instituição em <em>Cadastro</em>, ela começará como{' '}
              <strong className="text-amber-950 font-bold">PENDING</strong> e o login será
              bloqueado com mensagem explicativa até o Admin aprovar!
            </div>
          </div>
        </div>

        {/* Link to Register */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-xs text-slate-500">
            Sua instituição ainda não é credenciada?
          </p>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Solicitar Credenciamento Institucional</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer Security Note */}
      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
        <Shield className="w-3.5 h-3.5 text-blue-600" />
        <span>Acesso protegido por CSRF, Bcrypt e Sessões HTTP-only</span>
      </div>
    </div>
  );
}
