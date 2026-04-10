import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

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

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleInterest = () => {
    if (!product) return;
    const sizeText = selectedSize ?? "Padrão";
    const colorText = selectedVariant?.label ?? "Padrão";
    const imageToShow = selectedVariant?.src ?? product.src;

    const message = `➤ *OLÁ, ACABEI DE CHEGAR DO CATÁLOGO DE VOCÊS, TENHO INTERESSE NESTE PRODUTO*

❯ PRODUTO — *${product.nome}*
❯ CATEGORIA — *${product.categoria}*
❯ TAMANHO — *${sizeText}*
❯ COR — *${colorText}*

➤ *Pode me passar mais informações?*

❯ IMAGEM: https://lelaluminio.vercel.app/${imageToShow}`;

    window.open(
      `https://wa.me/5588933008270?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Reset state on product change
  useEffect(() => {
    if (!product) return;
    setSelectedVariant(null);
    setSelectedSize(null);
    setImgLoaded(false);
  }, [product]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;

  const imageToShow = selectedVariant?.src ?? product.src;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-background/75 backdrop-blur-md animate-fade-in p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-card border border-border/60 w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl overflow-hidden animate-slide-in-modal flex flex-col md:flex-row shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Image panel ─── */}
        <div className="relative md:w-[45%] aspect-square md:aspect-auto bg-secondary/40 shrink-0 overflow-hidden">
          <img
            key={imageToShow}
            src={imageToShow}
            alt={product.nome}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
            }`}
          />
          {/* Category badge over image */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-primary text-[10px] font-display uppercase tracking-wider border border-primary/20">
              {product.categoria}
            </span>
          </div>
        </div>

        {/* ─── Content panel ─── */}
        <div className="flex flex-col flex-1 overflow-y-auto max-h-[55vh] md:max-h-[75vh]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-secondary/80 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 backdrop-blur-sm"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>

          <div className="p-6 flex flex-col gap-5 flex-1">
            {/* Product name */}
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight pr-8">
              {product.nome}
            </h3>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-3">
                  Tamanho
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isActive = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(isActive ? null : size)}
                        className={`min-w-[52px] px-4 h-9 rounded-full border text-sm font-display transition-all duration-200 ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-transparent text-foreground hover:border-primary/60"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-3">
                  Cor — <span className="text-foreground normal-case tracking-normal font-body">
                    {selectedVariant?.label ?? "Padrão"}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {/* Default */}
                  <button
                    type="button"
                    onClick={() => setSelectedVariant(null)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedVariant === null
                        ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.25)]"
                        : "border-border hover:border-primary/50"
                    }`}
                    title="Padrão"
                    aria-label="Cor padrão"
                  >
                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 border border-border" />
                  </button>

                  {product.variants.map((v) => {
                    const isActive = selectedVariant?.label === v.label;
                    return (
                      <button
                        key={v.label}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                          isActive
                            ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.25)]"
                            : "border-border hover:border-primary/50"
                        }`}
                        style={{ backgroundColor: v.hex }}
                        aria-label={`Cor ${v.label}`}
                        title={v.label}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA */}
            <button
              type="button"
              onClick={handleInterest}
              className="btn-primary w-full justify-center group"
            >
              Tenho interesse
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
