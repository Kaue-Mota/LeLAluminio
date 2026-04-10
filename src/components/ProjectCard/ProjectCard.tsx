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
  index?: number;
}

export default function ProjectCard({ nome, src, variants, onClick, index = 0 }: ProjectCardProps) {
  const hasVariants = (variants?.length ?? 0) > 0;
  const visibleVariants = variants?.slice(0, 4) ?? [];
  const extraCount = (variants?.length ?? 0) > 4 ? (variants!.length - 4) : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${y * -10}deg`);
    e.currentTarget.style.setProperty("--ry", `${x * 10}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      className="product-card group"
      onClick={onClick}
      onMouseMove={onClick ? handleMouseMove : undefined}
      onMouseLeave={onClick ? handleMouseLeave : undefined}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={src}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />

        {/* Gradient overlay — slides up name on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400 ease-out">
            <p className="font-display text-xs uppercase tracking-wider text-foreground/90 leading-snug">
              {nome}
            </p>
          </div>
          {onClick && (
            <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              <Eye size={11} className="text-primary" />
              <span className="text-[10px] text-primary font-display uppercase tracking-wider">
                Ver detalhes
              </span>
            </div>
          )}
        </div>

        {/* Color variants — slides up on hover */}
        {hasVariants && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-0 group-hover:translate-y-full transition-transform duration-400 ease-out">
            <div className="p-2 flex items-center gap-1.5 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[9px] font-display uppercase tracking-wider text-white/70">Cores:</span>
              {visibleVariants.map((v) => (
                <span
                  key={v.label}
                  className="w-4 h-4 rounded-full border border-white/60 shadow-sm shrink-0"
                  style={{ backgroundColor: v.hex }}
                  title={v.label}
                />
              ))}
              {extraCount > 0 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background/60 border border-border/60 text-foreground/80 font-display">
                  +{extraCount}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
