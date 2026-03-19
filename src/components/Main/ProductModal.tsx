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
  sizes?: string[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  // null = padrão (product.src)
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const handleInterest = () => {
    if (!product) return;

    const imageToShow = selectedVariant?.src ?? product.src;
    const sizeText = selectedSize
      ? `Tamanho: ${selectedSize}`
      : "Tamanho: Padrão";
    const colorText = selectedVariant
      ? `Cor: ${selectedVariant.label}`
      : "Cor: Padrão";

    const message = `Olá, tenho interesse no produto:
    
    Produto: *${product.nome}*

    Categoria: ${product.categoria}

    ${sizeText}

    ${colorText}

     ${imageToShow}
    
    Pode me passar mais informações?`;

    const phoneNumber = "5517997721781";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

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

        <img
          src={imageToShow}
          alt={product.nome}
          className="w-full aspect-square object-cover"
        />

        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-foreground">
            {product.nome}
          </h3>

          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-display uppercase tracking-wider">
            {product.categoria}
          </span>

          <div>
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <p className="text-sm text-muted-foreground mb-2">Tamanhos:</p>

                <ul className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => {
                    const isActive = selectedSize === size;

                    return (
                      <li key={size}>
                        <button
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={[
                            "min-w-[56px] px-4 h-10 rounded-full border text-sm font-medium transition",
                            isActive
                              ? "border-red-600 bg-red-600 text-white"
                              : "border-border bg-transparent text-foreground hover:border-red-600 hover:text-red-500",
                          ].join(" ")}
                        >
                          {size}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

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
                          isActive
                            ? "border-red-600 ring-2 ring-red-600/40"
                            : "border-border hover:border-red-600",
                        ].join(" ")}
                        style={{ backgroundColor: v.hex }}
                        aria-label={`Selecionar cor ${v.label}`}
                        title={v.label}
                      />
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={handleInterest}
                className="mt-6 w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold uppercase tracking-wide hover:opacity-90 transition"
              >
                Tenho interesse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
