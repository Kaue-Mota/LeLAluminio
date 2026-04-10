import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const WHATSAPP_URL = `https://wa.me/5588933008270?text=${encodeURIComponent(
  "Olá, gostaria de saber mais sobre os produtos de vocês!"
)}`;

const previewProducts = [
  { nome: "Bandeja com 6 copos", src: "/images/catalogo/bandeja-com-6copos.webp" },
  { nome: "Cafeteira", src: "/images/catalogo/cafeteira-1500-1000-500.webp" },
  { nome: "Cuscuzeira", src: "/images/catalogo/cuscuzeira-18-16-14.webp" },
  { nome: "Cuscuzeira Paulistinha Baixa", src: "/images/catalogo/cuscuzeira-paulistinha-baixa.webp" },
  { nome: "Jogo Leiteira", src: "/images/catalogo/jogo-leiteira-12-14-16.webp" },
  { nome: "Jogo Panela Alta", src: "/images/catalogo/jogo-panela-alta-16-24.webp" },
];

const reviews = [
  {
    imagem: "https://i.pravatar.cc/150?img=12",
    nome: "Maria Silva",
    texto: "Produtos excelentes! As panelas são muito resistentes e bonitas. Recomendo para toda a família.",
    estrelas: 5,
  },
  {
    imagem: "https://i.pravatar.cc/150?img=33",
    nome: "João Oliveira",
    texto: "Comprei a frigideira e superou minhas expectativas. Acabamento impecável e ótimo preço.",
    estrelas: 5,
  },
  {
    imagem: "https://i.pravatar.cc/150?img=47",
    nome: "Ana Costa",
    texto: "A cuscuzeira é perfeita! Qualidade artesanal com durabilidade industrial. Adorei!",
    estrelas: 4,
  },
];

const marqueeItems = [
  "Panelas", "Frigideiras", "Cuscuzeiras", "Cafeteiras",
  "Copos", "Bacias", "Pratos", "Alumínio Premium",
];

const heroStats = [
  { value: "9+", label: "Anos de Tradição" },
  { value: "100+", label: "Produtos" },
  { value: "5.000+", label: "Clientes" },
];

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null);
  const productsRef = useScrollAnimation("scroll-fade-up");
  const reviewsRef = useScrollAnimation("scroll-fade-up");

  // Parallax on hero background
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const marqueeAll = [...marqueeItems, ...marqueeItems];

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Parallax background */}
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110 bg-cover sm:bg-center bg-right will-change-transform"
          style={{ backgroundImage: "url('/images/Hero-bg.png')" }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        {/* Floating orbs */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-[90px] animate-breathe pointer-events-none" />
        <div
          className="absolute bottom-1/3 right-1/3 w-56 h-56 rounded-full bg-primary/5 blur-[70px] animate-breathe pointer-events-none"
          style={{ animationDelay: "3s" }}
        />

        {/* Main hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="section-container w-full py-32 md:py-40">

            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-display uppercase tracking-[0.2em]">
                Desde 2017 — Juazeiro do Norte, CE
              </span>
            </div>

            {/* Title */}
            <div className="overflow-hidden mb-2">
              <h1
                className="font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase leading-[0.92] animate-text-reveal"
                style={{ animationDelay: "0.2s" }}
              >
                Alumínio de
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1
                className="font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase leading-[0.92] text-gradient animate-text-reveal"
                style={{ animationDelay: "0.38s" }}
              >
                Alta Qualidade
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.55s" }}
            >
              Fabricamos panelas, frigideiras, copos e muito mais com a excelência
              que sua cozinha merece. Tradição nordestina com qualidade industrial.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <Link to="/catalogo" className="btn-primary group">
                Ver Catálogo
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-red">
                Fale Conosco
              </a>
            </div>

            {/* Hero stats strip */}
            <div
              className="mt-16 flex flex-wrap gap-8 animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              {heroStats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-2xl md:text-3xl font-bold text-gradient">{s.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="relative z-10 pb-10 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <ChevronDown size={20} className="text-muted-foreground animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════ MARQUEE TICKER ═══════════════════ */}
      <div className="py-4 border-y border-border/40 bg-secondary/30 overflow-hidden">
        <div className="marquee-track">
          {marqueeAll.map((item, i) => (
            <span key={i} className="flex items-center gap-5 pr-5">
              <span className="font-display text-sm uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════ PRODUTOS DESTAQUE ═══════════════════ */}
      <section className="py-24 bg-secondary/20">
        <div className="section-container" ref={productsRef}>
          <div className="text-center mb-14">
            <p className="text-xs font-display uppercase tracking-[0.2em] text-primary mb-3">
              Linha Completa
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase title-line">
              Nossos <span className="text-gradient">Produtos</span>
            </h2>
            <p className="text-muted-foreground mt-8 max-w-md mx-auto text-sm leading-relaxed">
              Conheça nossa linha completa de utensílios em alumínio, produzidos com qualidade e tradição nordestina.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {previewProducts.map((p, i) => (
              <div
                key={p.nome}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <ProjectCard nome={p.nome} src={p.src} index={i} />
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/catalogo" className="btn-primary group">
              Ver Catálogo Completo
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA STRIP ═══════════════════ */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.15) 20px, rgba(0,0,0,0.15) 21px)",
          }}
        />
        <div className="relative section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-4">
            Quer fazer um pedido?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Entre em contato pelo WhatsApp e receba atendimento personalizado com os melhores preços.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-display font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
          >
            Falar no WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ═══════════════════ REVIEWS ═══════════════════ */}
      <section className="py-24">
        <div className="section-container" ref={reviewsRef}>
          <div className="text-center mb-14">
            <p className="text-xs font-display uppercase tracking-[0.2em] text-primary mb-3">
              Depoimentos
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase title-line">
              O que dizem nossos <span className="text-gradient">Clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.nome}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <ReviewCard {...r} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
