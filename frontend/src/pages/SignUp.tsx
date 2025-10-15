import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

// Mock API e navigate para demonstração
const api = {
  post: async () => ({}),
};
const navigate = (path: string) => console.log("Navigate to:", path);

function Link({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   await api.post("/auth/signup", { nome, email, senha });
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao cadastrar");
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
          <div className="space-y-5">
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
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="João Silva"
                />
              </div>
            </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="joao@example.com"
                />
              </div>
            </div>

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
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
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
