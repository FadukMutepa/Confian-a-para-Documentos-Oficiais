import React, { useState } from 'react';
import {
  Building2,
  UserCheck,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { ViewMode, Institution } from '../types.ts';

interface RegisterPageProps {
  onNavigate: (view: ViewMode) => void;
  onRegisterSuccess: (newInstitution: Institution) => void;
}

export default function RegisterPage({
  onNavigate,
  onRegisterSuccess,
}: RegisterPageProps) {
  // Form fields
  const [instName, setInstName] = useState('');
  const [instType, setInstType] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const [respName, setRespName] = useState('');
  const [respEmail, setRespEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quick fill sample data button for effortless testing
  const handleQuickFillSample = () => {
    setInstName('Universidade Europeia de Tecnologia');
    setInstType('Universidade');
    setCity('Lisboa');
    setCountry('Portugal');
    setAddress('Avenida Central, nº 100');
    setInstEmail('reitoria@uet.edu.pt');
    setPhone('+351 21 000 0000');
    setWebsite('https://www.uet.edu.pt');
    setRespName('Dra. Teresa Guimarães');
    setRespEmail('teresa.guimaraes@uet.edu.pt');
    setPassword('12345678');
    setConfirmPassword('12345678');
    setDeclarationAccepted(true);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!instName.trim() || !instEmail.trim() || !respEmail.trim()) {
      setError('Por favor preencha todos os campos obrigatórios assinalados com *');
      return;
    }

    if (password !== confirmPassword) {
      setError('As palavras-passe não coincidem.');
      return;
    }

    if (!declarationAccepted) {
      setError('É necessário aceitar a declaração de compromisso de honra para continuar.');
      return;
    }

    const newInst: Institution = {
      id: `inst-${Date.now()}`,
      name: instName,
      type: instType || 'Universidade',
      city: city || 'Lisboa',
      country: country || 'Portugal',
      email: instEmail,
      responsibleName: respName || 'Responsável Institucional',
      responsibleEmail: respEmail,
      status: 'PENDING', // starts as PENDING as explicitly documented in the system
      registeredAt: new Date().toLocaleDateString('pt-PT'),
    };

    onRegisterSuccess(newInst);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            Status: PENDING
          </span>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Candidatura Submetida com Sucesso!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            A sua instituição <strong className="text-slate-900">{instName}</strong> foi registada no simulador com status{' '}
            <strong className="text-amber-700">PENDING</strong>.
          </p>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
            <p className="font-semibold text-slate-800">
              Teste o fluxo de aprovação do simulador:
            </p>
            <p className="text-slate-600">
              1. Se tentar fazer login agora com <strong>{respEmail}</strong>, o sistema bloqueará informando que a conta aguarda aprovação.
            </p>
            <p className="text-slate-600">
              2. Pode entrar como <strong>Administrador Geral</strong> (admin@veridoc.app) para aprovar esta instituição com 1 clique!
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('login')}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all"
            >
              Testar Login (Ver bloqueio PENDING)
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="py-2.5 px-5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition-all"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-4xl mx-auto">
        {/* Top bar with back link & sample auto-fill button */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à página inicial</span>
          </button>

          <button
            type="button"
            onClick={handleQuickFillSample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Preencher Dados de Exemplo
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-10">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ============================================== */}
            {/* 1. INFORMAÇÕES DA ENTIDADE                     */}
            {/* ============================================== */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    1. Informações da Entidade
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dados cadastrais da instituição emitente
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Row 1: Nome da Instituição & Tipo */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nome Oficial da Instituição *
                    </label>
                    <input
                      type="text"
                      required
                      value={instName}
                      onChange={(e) => setInstName(e.target.value)}
                      placeholder="Ex: Universidade Europeia de Tecnologia"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tipo de Entidade *
                    </label>
                    <select
                      value={instType}
                      onChange={(e) => setInstType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Selecione...</option>
                      <option value="Universidade">Universidade</option>
                      <option value="Instituto Politécnico">Instituto Politécnico</option>
                      <option value="Faculdade Privada">Faculdade Privada</option>
                      <option value="Escola Técnica">Escola Técnica</option>
                      <option value="Conselho Profissional">Conselho Profissional</option>
                      <option value="Empresa Privada">Empresa Privada</option>
                      <option value="Órgão Regulador">Órgão Regulador / Governamental</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Cidade & País */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Lisboa, Coimbra, Porto..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      País *
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Ex: Portugal, Brasil, Angola..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Endereço Sede */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Endereço Sede (Opcional)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Avenida Central, nº 100"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Row 4: Email, Telefone, Website */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Institucional Oficial *
                    </label>
                    <input
                      type="email"
                      required
                      value={instEmail}
                      onChange={(e) => setInstEmail(e.target.value)}
                      placeholder="reitoria@instituicao.edu"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Telefone de Contacto *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+351 21 000 0000"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Website Oficial
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.instituicao.edu"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================== */}
            {/* 2. RESPONSÁVEL LEGAL E CREDENCIAIS DE ACESSO   */}
            {/* ============================================== */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    2. Responsável Legal e Credenciais de Acesso
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Titular responsável pela emissão dos certificados
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Row 1: Nome do Responsável & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nome Completo do Responsável *
                    </label>
                    <input
                      type="text"
                      required
                      value={respName}
                      onChange={(e) => setRespName(e.target.value)}
                      placeholder="Ex: Dra. Teresa Guimarães"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email do Responsável (Utilizador de Acesso) *
                    </label>
                    <input
                      type="email"
                      required
                      value={respEmail}
                      onChange={(e) => setRespEmail(e.target.value)}
                      placeholder="teresa.guimaraes@instituicao.edu"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Palavra-passe & Confirmação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Palavra-passe de Acesso *
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo de 8 caracteres"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Confirmar Palavra-passe *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a palavra-passe"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <input
                id="declaration"
                type="checkbox"
                required
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="declaration"
                className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none"
              >
                Declaro sob compromisso de honra a veracidade de todos os dados prestados e reconheço que a instituição iniciará com status <strong className="text-slate-900 font-bold">PENDING</strong> até validação dos dados pela Administração Central.
              </label>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <span>← Já possui conta? Ir para o login</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submeter Candidatura Institucional</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
