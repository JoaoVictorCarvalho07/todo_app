    import { useState } from "react";
    import { Mail, Lock, ArrowRight } from "lucide-react";

    // Mock API e navigate para demonstração
    const api = {
    post: async () => ({ data: { token: "mock-token" } })
    };
    const navigate = (path: string) => console.log('Navigate to:', path);

    function Link({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
    return (
        <a href={to} className={className} onClick={(e) => { e.preventDefault(); navigate(to); }}>
        {children}
        </a>
    );
    }
    export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        // const { data } = await api.post("/auth/signin", { email, senha });
        // localStorage.setItem("token", data.token); // Adicione no seu código real
        navigate("/tasks");
        } catch (err: any) {
        alert(err.response?.data?.message || "Erro ao entrar");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Entrar</h1>
            <p className="text-gray-500">Acesse sua conta</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-5">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="joao@example.com"
                    required
                    />
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    />
                </div>
                </div>

                <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium mt-6"
                >
                <span>Entrar</span>
                <ArrowRight size={18} />
                </button>
            </div>
            </div>

            <div className="text-center mt-6">
            <p className="text-gray-600">
                Ainda não tem conta?{" "}
                <Link to="/signup" className="text-gray-900 font-medium hover:underline">
                Criar conta
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
    }