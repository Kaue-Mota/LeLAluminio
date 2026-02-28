import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ProductVariant {
  label: string;
  hex: string;
  src: string;
}

interface Product {
  id: number;
  nome: string;
  categoria: string;
  src: string; // imagem padrão
  variants?: ProductVariant[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  // null = padrão (product.src)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (!product) return;
    // Abre no padrão (não na primeira variant)
    setSelectedVariant(null);
  }, [product]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;

  const imageToShow = selectedVariant?.src ?? product.src;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-card border border-border rounded-2xl max-w-lg w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <img src={imageToShow} alt={product.nome} className="w-full aspect-square object-cover" />

        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-foreground">{product.nome}</h3>

          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-display uppercase tracking-wider">
            {product.categoria}
          </span>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-5">
              <p className="text-sm text-muted-foreground mb-2">Cores:</p>

              <ul className="flex gap-3 items-center">
                {/* BOTÃO PADRÃO */}
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedVariant(null)}
                    className={[
                      "w-10 h-10 rounded-full border-2 transition flex items-center justify-center text-xs",
                      selectedVariant === null
                        ? "border-red-600 ring-2 ring-red-600/40"
                        : "border-border hover:border-red-600",
                    ].join(" ")}
                    aria-label="Voltar para cor padrão"
                    title="Padrão"
                  >
                    {/* indicador simples do padrão */}
                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-zinc-400 border border-border" />
                  </button>
                </li>

                {/* VARIANTS */}
                {product.variants.map((v) => {
                  const isActive = selectedVariant?.label === v.label;

                  return (
                    <li key={v.label}>
                      <button
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={[
                          "w-10 h-10 rounded-full border-2 transition",
                          isActive ? "border-red-600 ring-2 ring-red-600/40" : "border-border hover:border-red-600",
                        ].join(" ")}
                        style={{ backgroundColor: v.hex }}
                        aria-label={`Selecionar cor ${v.label}`}
                        title={v.label}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}