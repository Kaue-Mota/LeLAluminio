import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const previewProducts = [
  { nome: "Bandeja com 6 copos", src: "/images/catalogo/bandeja-com-6copos.webp"},

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

export default function Home() {
  const productsRef = useScrollAnimation("scroll-fade-up");
  const reviewsRef = useScrollAnimation("scroll-fade-up");

  return (
    <>
      {/* ======= HERO SECTION ======= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG Image */}
        <div
          className="absolute inset-0 bg-cover sm:bg-center bg-right"
          style={{ backgroundImage: "url('/images/Hero-bg.png')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="relative z-10 section-container text-center py-32">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase leading-tight animate-fade-in-up text-foreground">
            Alumínio de{" "}
            <span className="text-primary">Alta Qualidade</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Fabricamos panelas, frigideiras, copos e muito mais com a excelência
            que sua cozinha merece.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/catalogo" className="btn-primary inline-flex items-center gap-2">
              Ver Catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/contato" className="btn-outline-red inline-block">
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* ======= PRODUTOS PREVIEW ======= */}
      <section className="py-20 bg-secondary/30">
        <div className="section-container" ref={productsRef}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center uppercase mb-4 text-foreground">
            Nossos <span className="text-primary">Produtos</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Conheça nossa linha completa de utensílios em alumínio, produzidos
            com qualidade e tradição.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {previewProducts.map((p) => (
              <ProjectCard key={p.nome} nome={p.nome} src={p.src} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalogo" className="btn-primary inline-flex items-center gap-2">
              Ver Mais <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======= REVIEWS ======= */}
      <section className="py-20">
        <div className="section-container" ref={reviewsRef}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center uppercase mb-12 text-foreground">
            O que dizem nossos <span className="text-primary">Clientes</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <ReviewCard key={r.nome} {...r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
