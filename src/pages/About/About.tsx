import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Factory, Award, Users, Truck } from "lucide-react";

const stats = [
  { icon: Factory, label: "Anos de Experiência", value: "10+" },
  { icon: Award, label: "Produtos no Catálogo", value: "100+" },
  { icon: Users, label: "Clientes Satisfeitos", value: "5.000+" },
  { icon: Truck, label: "Entregas no Brasil", value: "Todo Ceará" },
];

export default function About() {
  const titleRef = useScrollAnimation("scroll-fade-up");
  const statsRef = useScrollAnimation("scroll-fade-up");

  return (
    <section className="pt-28 pb-20">
      <div className="section-container">
        <div ref={titleRef}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center uppercase mb-4 text-foreground">
            Sobre a <span className="text-primary">L&L Alumínio</span>
          </h1>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
            Somos uma fábrica de produtos em alumínio com mais de 10 anos de
            tradição. Nossa missão é levar qualidade, durabilidade e design para
            cada cozinha brasileira, combinando técnicas artesanais com processos
            industriais modernos.
          </p>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-xl p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--glow-red)/0.1)]"
            >
              <s.icon className="mx-auto text-primary mb-3" size={32} />
              <p className="font-display text-2xl font-bold text-foreground">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Texto adicional */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3 uppercase">
              Nossa <span className="text-primary">História</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Fundada em 1990 no interior do Nordeste, a L&L alumínio nasceu da
              paixão por criar utensílios domésticos de qualidade. O que começou
              como uma pequena oficina cresceu para se tornar referência nacional
              em produtos de alumínio.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3 uppercase">
              Nosso <span className="text-primary">Compromisso</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Cada peça é produzida com rigoroso controle de qualidade.
              Utilizamos alumínio de alta pureza e processos sustentáveis,
              garantindo produtos duráveis e seguros para toda a família.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
