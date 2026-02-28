import { useState, useEffect, useCallback } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProductModal from "../../components/Main/ProductModal";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

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
}

const categories = [
  { key: "todos", label: "Todos" },
  { key: "panelas", label: "Panelas" },
  { key: "copos", label: "Copos" },
  { key: "pratos", label: "Pratos" },
  { key: "bacias", label: "Bacias" },
  { key: "cuscuzeiras", label: "Cuscuzeira" },
  { key: "frigideiras", label: "Frigideira" },
];

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const titleRef = useScrollAnimation("scroll-fade-up");

  useEffect(() => {
    fetch("/data/imagens-catalogo.json")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const filtered =
    filter === "todos"
      ? products
      : products.filter((p) => p.categoria === filter);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section className="pt-28 pb-20">
      <div className="section-container">
        <div ref={titleRef}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center uppercase mb-4 text-foreground">
            Nosso <span className="text-primary">Catálogo</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Explore todos os nossos produtos de alumínio. Filtre por categoria
            para encontrar o que procura.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`filter-btn ${filter === c.key ? "filter-btn-active" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-500">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              nome={p.nome}
              src={p.src}
              variants={p.variants}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16 text-lg">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </div>

      <ProductModal product={selected} onClose={handleClose} />
    </section>
  );
}
