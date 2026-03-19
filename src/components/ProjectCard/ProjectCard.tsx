import { Eye } from "lucide-react";

interface ProductVariant {
  label: string;
  hex: string;
  src: string;
}

interface ProjectCardProps {
  nome: string;
  src: string;
  variants?: ProductVariant[];

  onClick?: () => void;
}

/** Card de produto com hover sofisticado (zoom + overlay + ícone) */
export default function ProjectCard({
  nome,
  src,
  variants,

  onClick,
}: ProjectCardProps) {
  const hasVariants = (variants?.length ?? 0) > 0;
  const extraCount =
    hasVariants && variants!.length > 4 ? variants!.length - 4 : 0;

  return (
    <div className="product-card group" onClick={onClick}>
      <div className="aspect-square overflow-hidden relative">
        <img
          src={src}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Bolinhas de variações */}

        {hasVariants && (
          <>
            
            <div className=" bg-background/70 p-1 absolute bottom-2 left-2 flex items-center rounded-md gap-1 z-[1]">
              <h1 className="text-sm text-foreground ">CORES:</h1>
              {variants!.slice(0, 4).map((v) => (
                <span
                  key={v.label}
                  className="w-5 h-5 rounded-full border border-white/80 shadow-sm"
                  style={{ backgroundColor: v.hex }}
                  title={v.label}
                  aria-label={`Variação: ${v.label}`}
                />
              ))}

              {extraCount > 0 && (
                <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-background/70 border border-border text-foreground">
                  +{extraCount}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
        <Eye className="text-primary" size={28} />
        <span className="font-display text-sm uppercase tracking-wider text-foreground text-center p-2">
          {nome}
        </span>
      </div>
    </div>
  );
}
