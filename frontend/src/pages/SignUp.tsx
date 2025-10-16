import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errors, setErrors] = useState<{
    nome?: string;
    email?: string;
    senha?: string;
    global?: string;
  }>({});

  const newErrors: any = {};

  // Regex padrões
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.,@!#$%¨&*()_])[A-Za-z\d.@!#$%¨&*()_]{6,}$/;

  const validate = () => {
    const newErrors: any = {};

    if (!nome.trim()) newErrors.nome = "O nome é obrigatório.";
    if (!emailRegex.test(email)) newErrors.email = "Digite um email válido.";
    if (!senhaRegex.test(senha))
      newErrors.senha =
        "A senha deve ter pelo menos 6 caracteres e incluir letras e números.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
    if (!e.target.value.trim()) {
      newErrors.senha = "A senha é obrigatória.";
      return;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      newErrors.email = "Digite um email válido.";
    }
  };
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    if (!e.target.value.trim()) {
      newErrors.nome = "O nome é obrigatório.";
      return;
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      const resp = await api.post("/auth/signup", { nome, email, senha });
      console.log(resp.data);
      navigate("/login");
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao cadastrar";
      setErrors({ global: message });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            Bem-vindo
          </h1>
          <p className="text-neutral-500">Crie sua conta para começar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          {errors.global && (
            <div className="mb-4 bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg px-4 py-3">
              {errors.global}
            </div>
          )}

          <div className="space-y-5">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nome completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => handleNomeChange(e)}
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all ${
                    errors.nome ? "border-red-400" : "border-neutral-200"
                  }`}
                  placeholder="Seu nome completo"
                />
              </div>
              {errors.nome && (
                <p className="text-sm text-red-600 mt-1">{errors.nome}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-neutral-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all ${
                    errors.email ? "border-red-400" : "border-neutral-200"
                  }`}
                  placeholder="seuEmail@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-neutral-400" />
                </div>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => handleSenhaChange(e)}
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all ${
                    errors.senha ? "border-red-400" : "border-neutral-200"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.senha && (
                <p className="text-sm text-red-600 mt-1">{errors.senha}</p>
              )}
            </div>

            <button
              onClick={handleSignup}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 font-medium mt-6"
            >
              <span>Criar conta</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-neutral-600">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-neutral-900 font-medium hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
