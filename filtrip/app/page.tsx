"use client";

import { useState, useEffect } from "react";

const destinos = [
  {
    nome: "Santorini, Grécia",
    categoria: "Internacional",
    preco: "R$ 4.890",
    imagem:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85",
    duracao: "7 dias",
  },
  {
    nome: "Paris, França",
    categoria: "Romântico",
    preco: "R$ 5.290",
    imagem:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    duracao: "6 dias",
  },
  {
    nome: "Maldivas",
    categoria: "Praias paradisíacas",
    preco: "R$ 6.750",
    imagem:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    duracao: "5 dias",
  },
];

export default function Home() {
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [viajantes, setViajantes] = useState("2 viajantes");
  const [busca, setBusca] = useState("");
  const [hoje, setHoje] = useState("");
  const [ano, setAno] = useState("");

  // Datas calculadas no navegador, para não ficarem "congeladas" no build
  useEffect(() => {
    const agora = new Date();
    setHoje(agora.toLocaleDateString("en-CA"));
    setAno(String(agora.getFullYear()));
  }, []);

  const destinosFiltrados = destinos.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function pesquisar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusca(destino.trim());
    document.getElementById("destinos")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#fffdf5] text-[#102b4e]">
      {/* Navegação */}
      <header className="sticky top-0 z-50 border-b border-[#e9e5d6] bg-[#fffdf5]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#102b4e] text-2xl text-[#ffe58a]">
              ✳
            </span>
            <span className="text-xl font-black tracking-tight">
              lumina<span className="text-[#d5a91d]">.</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-[#75849a]">
                travel agency
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-9 text-sm font-semibold md:flex">
            <a href="#destinos" className="transition hover:text-[#c79b14]">
              Destinos
            </a>
            <a href="#experiencias" className="transition hover:text-[#c79b14]">
              Experiências
            </a>
            <a href="#sobre" className="transition hover:text-[#c79b14]">
              Sobre nós
            </a>
          </div>

          <a
            href="#pesquisar"
            className="rounded-full bg-[#102b4e] px-5 py-3 text-sm font-bold text-[#fff0ad] transition hover:bg-[#1b426d]"
          >
            Planejar viagem ↗
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#102b4e]">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#ffe58a]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#e4bd49]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ffe58a]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffe58a]">
              <span>✦</span> Sua próxima história começa aqui
            </span>

            <h1 className="mt-8 max-w-xl text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              O mundo é seu.
              <br />
              <span className="font-serif font-medium italic text-[#ffe58a]">
                Vá descobrir.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#c6d2e1] sm:text-lg">
              Lugares extraordinários, experiências inesquecíveis e viagens
              feitas para combinar com você.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#pesquisar"
                className="rounded-full bg-[#ffe58a] px-7 py-4 font-bold text-[#102b4e] shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-[#ffedb0]"
              >
                Encontrar minha viagem ↗
              </a>
              <a
                href="#destinos"
                className="text-sm font-semibold text-white transition hover:text-[#ffe58a]"
              >
                Explorar destinos ↓
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">
              <div>
                <p className="text-2xl font-black text-[#ffe58a]">120+</p>
                <p className="mt-1 text-xs text-[#c6d2e1]">
                  Destinos incríveis
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#ffe58a]">4,9/5</p>
                <p className="mt-1 text-xs text-[#c6d2e1]">
                  Avaliação dos viajantes
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#ffe58a]">100%</p>
                <p className="mt-1 text-xs text-[#c6d2e1]">
                  Atenção personalizada
                </p>
              </div>
            </div>
          </div>

          {/* Imagem principal */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full border border-[#ffe58a]/40 sm:-right-5 sm:-top-5" />

            <div className="relative overflow-hidden rounded-[2rem] rounded-bl-[7rem] border border-white/10 shadow-2xl shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90"
                alt="Paisagem de montanhas e lago em um destino de viagem"
                className="h-[400px] w-full object-cover sm:h-[510px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102b4e]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 sm:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffe58a]">
                    Destino em destaque
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white">
                    A natureza chama.
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    Descubra paisagens que inspiram.
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffe58a] text-xl text-[#102b4e]">
                  ↗
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-2 rounded-2xl bg-[#fffdf5] p-4 shadow-xl sm:-left-7 sm:p-5">
              <p className="text-xs text-[#75849a]">Sua próxima aventura</p>
              <p className="mt-1 font-bold">Começa com um sonho ✦</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pesquisa de viagem */}
      <section id="pesquisar" className="relative z-10 mx-auto -mt-1 max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-3xl border border-[#e9e5d6] bg-white p-6 shadow-xl shadow-[#102b4e]/5 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c39a20]">
              Vamos planejar?
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Encontre sua próxima viagem
            </h2>
          </div>

          <form
            onSubmit={pesquisar}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[#75849a]">
                PARA ONDE?
              </span>
              <input
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                placeholder="Ex.: Paris, França"
                className="w-full rounded-xl border border-[#e6e8eb] bg-[#fffdf5] px-4 py-4 text-sm outline-none transition focus:border-[#cba72f]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[#75849a]">
                DATA DE PARTIDA
              </span>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                min={hoje || undefined}
                className="w-full rounded-xl border border-[#e6e8eb] bg-[#fffdf5] px-4 py-4 text-sm outline-none focus:border-[#cba72f]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[#75849a]">
                VIAJANTES
              </span>
              <select
                value={viajantes}
                onChange={(e) => setViajantes(e.target.value)}
                className="w-full rounded-xl border border-[#e6e8eb] bg-[#fffdf5] px-4 py-4 text-sm outline-none focus:border-[#cba72f]"
              >
                <option>1 viajante</option>
                <option>2 viajantes</option>
                <option>3 viajantes</option>
                <option>4 viajantes</option>
                <option>5+ viajantes</option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#ffe58a] px-5 py-4 font-bold text-[#102b4e] transition hover:bg-[#f5d76a]"
              >
                ⌕ &nbsp; Pesquisar viagens
              </button>
            </div>
          </form>

          {busca && (
            <p className="mt-4 text-sm text-[#75849a]" aria-live="polite">
              {destinosFiltrados.length > 0
                ? `Encontramos ${destinosFiltrados.length} destino(s) para "${busca}".`
                : `Não encontramos "${busca}" nos destinos em destaque. Experimente Paris, Santorini ou Maldivas.`}
              {data && ` Partida desejada: ${data}.`}
              {" "}Viajantes: {viajantes}.
            </p>
          )}
        </div>
      </section>

      {/* Destinos */}
      <section id="destinos" className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c39a20]">
              Escolhas especiais
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Lugares para se apaixonar.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#75849a] sm:text-base">
              Selecionamos destinos que transformam férias em memórias para a
              vida toda.
            </p>
          </div>

          <button
            onClick={() => {
              setBusca("");
              setDestino("");
            }}
            className="self-start rounded-full border border-[#dcd8ca] px-5 py-3 text-sm font-bold transition hover:border-[#102b4e] sm:self-auto"
          >
            Ver todos os destinos ↗
          </button>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {destinosFiltrados.map((item) => (
            <article
              key={item.nome}
              className="group overflow-hidden rounded-3xl border border-[#ece8dc] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#102b4e]/10"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.imagem}
                  alt={`Paisagem de ${item.nome}`}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#fffdf5] px-4 py-2 text-xs font-bold text-[#102b4e]">
                  {item.categoria}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">{item.nome}</h3>
                    <p className="mt-2 text-sm text-[#75849a]">
                      ◷ {item.duracao} de viagem
                    </p>
                  </div>
                  <span className="text-2xl text-[#d1a724]">✳</span>
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-[#efede6] pt-5">
                  <div>
                    <p className="text-xs text-[#75849a]">
                      A partir de
                    </p>
                    <p className="mt-1 text-xl font-black">{item.preco}</p>
                    <p className="mt-1 text-[11px] text-[#75849a]">
                      por pessoa · valor ilustrativo
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      window.alert(
                        `Você selecionou ${item.nome}. Entre em contato com a agência para consultar valores e disponibilidade.`
                      )
                    }
                    className="rounded-full bg-[#102b4e] px-5 py-3 text-sm font-bold text-[#ffe58a] transition hover:bg-[#1b426d]"
                  >
                    Explorar ↗
                  </button>
                </div>
              </div>
            </article>
          ))}

          {destinosFiltrados.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#dcd8ca] p-8 md:col-span-2 lg:col-span-3">
              <p className="font-bold">Nenhum destino encontrado.</p>
              <p className="mt-2 text-sm text-[#75849a]">
                Tente pesquisar Paris, Santorini ou Maldivas.
              </p>
              <button
                onClick={() => {
                  setBusca("");
                  setDestino("");
                }}
                className="mt-4 font-bold text-[#a47d0c] underline"
              >
                Limpar pesquisa
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experiências */}
      <section id="experiencias" className="bg-[#f6f0d9]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a47d0c]">
              Mais do que viajar
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              A viagem certa muda tudo.
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-[#5d6b7d]">
              Seja uma aventura solo, uma viagem romântica ou férias em
              família, ajudamos você a transformar seus planos em experiências
              especiais.
            </p>
            <a
              href="#pesquisar"
              className="mt-8 inline-flex rounded-full bg-[#102b4e] px-7 py-4 font-bold text-[#ffe58a] transition hover:bg-[#1b426d]"
            >
              Criar meu roteiro ↗
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#102b4e] p-6 text-white sm:p-8">
              <span className="text-3xl text-[#ffe58a]">✈</span>
              <h3 className="mt-6 text-lg font-bold">Aventura</h3>
              <p className="mt-2 text-sm leading-6 text-[#c6d2e1]">
                Explore novos horizontes e saia da rotina.
              </p>
            </div>
            <div className="mt-10 rounded-3xl bg-white p-6 sm:p-8">
              <span className="text-3xl text-[#c39a20]">♡</span>
              <h3 className="mt-6 text-lg font-bold">Romance</h3>
              <p className="mt-2 text-sm leading-6 text-[#75849a]">
                Momentos únicos em lugares especiais.
              </p>
            </div>
            <div className="-mt-10 rounded-3xl bg-white p-6 sm:p-8">
              <span className="text-3xl text-[#c39a20]">☼</span>
              <h3 className="mt-6 text-lg font-bold">Relaxamento</h3>
              <p className="mt-2 text-sm leading-6 text-[#75849a]">
                Praias, descanso e dias sem pressa.
              </p>
            </div>
            <div className="rounded-3xl bg-[#ffe58a] p-6 text-[#102b4e] sm:p-8">
              <span className="text-3xl">✦</span>
              <h3 className="mt-6 text-lg font-bold">Descobertas</h3>
              <p className="mt-2 text-sm leading-6 text-[#5d6b7d]">
                Culturas, sabores e novas histórias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre e rodapé */}
      <footer id="sobre" className="bg-[#102b4e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <a href="#" className="text-2xl font-black">
              lumina<span className="text-[#ffe58a]">.</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#c6d2e1]">
              Seu próximo destino está mais perto do que você imagina.
              Vamos descobrir o mundo juntos?
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-[#c6d2e1]">
            <a href="#destinos" className="hover:text-[#ffe58a]">
              Destinos
            </a>
            <a href="#experiencias" className="hover:text-[#ffe58a]">
              Experiências
            </a>
            <a href="#pesquisar" className="hover:text-[#ffe58a]">
              Planeje sua viagem
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-[#aebed0]">
          © {ano} Lumina Travel. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
