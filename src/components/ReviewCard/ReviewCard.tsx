import { Star } from "lucide-react";

interface ReviewCardProps {
  imagem: string;
  nome: string;
  texto: string;
  estrelas: number;
}

export default function ReviewCard({ imagem, nome, texto, estrelas }: ReviewCardProps) {
  return (
    <div className="review-card">
      {/* Decorative quote mark */}
      <div
        className="absolute top-4 right-5 font-serif text-7xl text-primary/10 leading-none select-none pointer-events-none"
        aria-hidden
      >
        "
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4 relative z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < estrelas
                ? "fill-primary text-primary"
                : "text-muted-foreground/30"
            }
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10 mb-6">
        "{texto}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10">
        <img
          src={imagem}
          alt={nome}
          className="w-10 h-10 rounded-full object-cover border-2 border-primary/40"
        />
        <div>
          <p className="font-display font-semibold text-foreground text-sm">{nome}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cliente verificado</p>
        </div>
      </div>
    </div>
  );
}
