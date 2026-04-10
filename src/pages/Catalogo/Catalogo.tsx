import { useState, useEffect, useCallback, useRef } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProductModal from "../../components/Main/ProductModal";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Search, X } from "lucide-react";

interface ProductVariant {
  label: string;
  hex: string;
  src: string;
}

interface Product {
  id: number;
  nome: string;
  categoria: string;
  src: string;
  variants?: ProductVariant[];
  sizes?: string[];
}

const categories = [
  { key: "Todos", label: "Todos" },
  { key: "Panelas", label: "Panelas" },
  { key: "Copos", label: "Copos" },
  { key: "Pratos", label: "Pratos" },
  { key: "Bacias", label: "Bacias" },
  { key: "Cuscuzeiras", label: "Cuscuzeira" },
  { key: "Frigideiras", label: "Frigideira" },
  { key: "Cafeteiras", label: "Cafeteira" },
];

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [filterVersion, setFilterVersion] = useState(0);
  const titleRef = useScrollAnimation("scroll-fade-up");
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/imagens-catalogo.json")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleFilterChange = (key: string) => {
    setFilter(key);
    setFilterVersion((v) => v + 1);
  };

  const filtered = products.filter((p) => {
    const matchesCategory = filter === "Todos" || p.categoria === filter;
    const matchesSearch = search === "" || p.nome.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClose = useCallback(() => setSelected(null), []);

  const countForCategory = (key: string) =>
    key === "Todos" ? products.length : products.filter((p) => p.categoria === key).length;

  return (
    <section className="pt-28 pb-24">
      <div className="section-container">

        {/* ─── Title ─── */}
        <div ref={titleRef} className="text-center mb-12">
          <p className="text-xs font-display uppercase tracking-[0.2em] text-primary mb-3">
            Produtos
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase title-line mb-8">
            Nosso <span className="text-gradient">Catálogo</span>
          </h1>
          <p className="text-muted-foreground mt-8 max-w-lg mx-auto text-sm leading-relaxed">
            Explore todos os nossos produtos em alumínio. Filtre por categoria para encontrar o que procura.
          </p>
        </div>

        {/* ─── Search ─── */}
        <div className="relative max-w-sm mx-auto mb-8">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-card border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ─── Filter bar ─── */}
        <div
          ref={filterBarRef}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((c) => {
            const count = countForCategory(c.key);
            if (count === 0 && c.key !== "Todos") return null;
            return (
              <button
                key={c.key}
                onClick={() => handleFilterChange(c.key)}
                className={`filter-btn ${filter === c.key ? "filter-btn-active" : ""}`}
              >
                {c.label}
                <span
                  className={`ml-1.5 text-[10px] font-mono ${
                    filter === c.key ? "opacity-70" : "opacity-40"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Product Grid ─── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p, i) => (
              <div
                key={`${filterVersion}-${p.id}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(i % 12) * 0.055}s` }}
              >
                <ProjectCard
                  nome={p.nome}
                  src={p.src}
                  variants={p.variants}
                  index={i}
                  onClick={() => setSelected(p)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <p className="font-display text-lg uppercase tracking-wider text-muted-foreground">
              Nenhum produto encontrado
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              Tente uma categoria diferente ou limpe a busca
            </p>
            <button
              onClick={() => { setFilter("Todos"); setSearch(""); }}
              className="mt-6 btn-outline-red !text-xs !px-5 !py-2"
            >
              Ver todos
            </button>
          </div>
        )}
      </div>

      <ProductModal product={selected} onClose={handleClose} />
    </section>
  );
}
