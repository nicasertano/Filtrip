"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Cliente Supabase (usa as variáveis do seu .env.local)
// Se você já tem um cliente em lib/supabase, pode importar dele em vez de criar aqui.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

function traduzirErro(mensagem: string) {
  const m = mensagem.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed"))
    return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Este e-mail já está cadastrado.";
  if (m.includes("password should be at least"))
    return "A senha deve ter pelo menos 6 caracteres.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Muitas tentativas. Aguarde um pouco e tente novamente.";
  if (m.includes("fetch") || m.includes("network"))
    return "Falha de conexão. Verifique sua internet.";
  return "Algo deu errado. Tente novamente em instantes.";
}

export default function Login() {
  const router = useRouter();

  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [verificando, setVerificando] = useState(true);

  const cadastro = modo === "cadastrar";

  // Se já estiver logado, vai direto para a home
  useEffect(() => {
    let ativo = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return;
      if (data.session) router.replace("/");
      else setVerificando(false);
    });
    return () => {
      ativo = false;
    };
  }, [router]);

  function alternarModo() {
    setModo(cadastro ? "entrar" : "cadastrar");
    setErro("");
    setSucesso("");
  }

  async function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (cadastro && nome.trim().length < 2) {
      setErro("Informe seu nome.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);
    try {
      if (cadastro) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: senha,
          options: {
            data: { nome: nome.trim() },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;

        // O Supabase devolve user com identities vazio quando o e-mail já existe
        if (data.user && data.user.identities?.length === 0) {
          setErro("Este e-mail já está cadastrado.");
          return;
        }

        if (data.session) {
          router.push("/");
          router.refresh();
        } else {
          setSucesso(
            "Conta criada! Enviamos um link de confirmação para o seu e-mail."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha,
        });
        if (error) throw error;

        router.push("/");
        router.refresh();
      }
    } catch (e) {
      setErro(traduzirErro(e instanceof Error ? e.message : ""));
    } finally {
      setCarregando(false);
    }
  }

  async function esqueciSenha() {
    setErro("");
    setSucesso("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErro("Digite seu e-mail acima para receber o link de redefinição.");
      return;
    }

    setCarregando(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/` }
      );
      if (error) throw error;
      setSucesso("Enviamos um link para redefinir sua senha. Confira seu e-mail.");
    } catch (e) {
      setErro(traduzirErro(e instanceof Error ? e.message : ""));
    } finally {
      setCarregando(false);
    }
  }

  async function entrarComGoogle() {
    setErro("");
    setSucesso("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setErro(
        "Login com Google indisponível. Ative o provedor Google no painel do Supabase."
      );
    }
  }

  if (verificando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffdf5] text-[#102b4e]">
        <p className="text-sm font-semibold text-[#75849a]">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf5] text-[#102b4e] lg:grid lg:grid-cols-2">
      {/* Painel visual */}
      <section className="relative hidden overflow-hidden bg-[#102b4e] lg:block">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85"
          alt="Praia tropical com águas cristalinas"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102b4e] via-[#102b4e]/40 to-[#102b4e]/30" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#ffe58a]/10 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffe58a] text-2xl text-[#102b4e]">
              ✳
            </span>
            <span className="text-xl font-black tracking-tight">
              lumina<span className="text-[#ffe58a]">.</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-[#c6d2e1]">
                travel agency
              </span>
            </span>
          </Link>

          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ffe58a]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffe58a]">
              <span>✦</span> Sua próxima história
            </span>
            <h2 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight text-white">
              O mundo é seu.
              <br />
              <span className="font-serif font-medium italic text-[#ffe58a]">
                Vá descobrir.
              </span>
            </h2>
            <p className="mt-5 leading-8 text-[#c6d2e1]">
              Acesse sua conta para salvar destinos, acompanhar suas reservas e
              planejar viagens feitas para combinar com você.
            </p>

            <div className="mt-10 flex gap-8 border-t border-white/15 pt-6">
              <div>
                <p className="text-2xl font-black text-[#ffe58a]">120+</p>
                <p className="mt-1 text-xs text-[#c6d2e1]">Destinos</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#ffe58a]">4,9/5</p>
                <p className="mt-1 text-xs text-[#c6d2e1]">Avaliação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 lg:invisible">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#102b4e] text-xl text-[#ffe58a]">
              ✳
            </span>
            <span className="text-lg font-black tracking-tight">
              lumina<span className="text-[#d5a91d]">.</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-[#75849a] transition hover:text-[#102b4e]"
          >
            ← Voltar ao início
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c39a20]">
            {cadastro ? "Crie sua conta" : "Bem-vindo(a) de volta"}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {cadastro ? "Comece sua jornada." : "Entrar na sua conta"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#75849a]">
            {cadastro
              ? "Cadastre-se para salvar seus destinos favoritos e planejar viagens."
              : "Acesse para continuar planejando sua próxima aventura."}
          </p>

          <form onSubmit={enviar} className="mt-8 space-y-5" noValidate>
            {cadastro && (
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#75849a]">
                  NOME COMPLETO
                </span>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoComplete="name"
                  placeholder="Seu nome"
                  className="w-full rounded-xl border border-[#e6e8eb] bg-white px-4 py-4 text-sm outline-none transition focus:border-[#cba72f]"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[#75849a]">
                E-MAIL
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="voce@exemplo.com"
                className="w-full rounded-xl border border-[#e6e8eb] bg-white px-4 py-4 text-sm outline-none transition focus:border-[#cba72f]"
              />
            </label>

            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#75849a]">
                <label htmlFor="senha">SENHA</label>
                {!cadastro && (
                  <button
                    type="button"
                    onClick={esqueciSenha}
                    disabled={carregando}
                    className="font-semibold text-[#a47d0c] hover:underline disabled:opacity-60"
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete={cadastro ? "new-password" : "current-password"}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full rounded-xl border border-[#e6e8eb] bg-white px-4 py-4 pr-24 text-sm outline-none transition focus:border-[#cba72f]"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-bold text-[#75849a] transition hover:text-[#102b4e]"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            {erro && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {erro}
              </p>
            )}
            {sucesso && (
              <p
                role="status"
                className="rounded-xl border border-[#e4bd49]/50 bg-[#fff6cf] px-4 py-3 text-sm text-[#7a5d08]"
              >
                ✦ {sucesso}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-xl bg-[#102b4e] px-5 py-4 font-bold text-[#ffe58a] shadow-lg shadow-[#102b4e]/10 transition hover:bg-[#1b426d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {carregando
                ? "Aguarde..."
                : cadastro
                ? "Criar conta ↗"
                : "Entrar ↗"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4 text-xs text-[#75849a]">
            <span className="h-px flex-1 bg-[#e9e5d6]" />
            ou continue com
            <span className="h-px flex-1 bg-[#e9e5d6]" />
          </div>

          <button
            type="button"
            onClick={entrarComGoogle}
            className="w-full rounded-xl border border-[#dcd8ca] bg-white px-4 py-3.5 text-sm font-bold transition hover:border-[#102b4e]"
          >
            Continuar com Google
          </button>

          <p className="mt-8 text-center text-sm text-[#75849a]">
            {cadastro ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
            <button
              type="button"
              onClick={alternarModo}
              className="font-bold text-[#a47d0c] underline"
            >
              {cadastro ? "Entrar" : "Cadastre-se"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-[#9aa6b6]">
          © Lumina Travel. Todos os direitos reservados.
        </p>
      </section>
    </main>
  );
}