import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Factory, Award, Users, Truck, Shield, Zap } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  label: string;
  numericValue: number;
  suffix: string;
  display?: string;
}

const stats: Stat[] = [
  { icon: Factory, label: "Anos de Experiência", numericValue: 9, suffix: "+" },
  { icon: Award, label: "Produtos no Catálogo", numericValue: 100, suffix: "+" },
  { icon: Users, label: "Clientes Satisfeitos", numericValue: 5000, suffix: "+" },
  { icon: Truck, label: "Atendimento", numericValue: 0, suffix: "", display: "Todo Nordeste" },
];

const values = [
  { icon: Shield, title: "Qualidade", description: "Cada peça é produzida com rigoroso controle de qualidade, garantindo durabilidade e segurança." },
  { icon: Zap, title: "Tradição", description: "Mais de 9 anos combinando técnicas artesanais com processos industriais modernos." },
  { icon: Truck, title: "Entrega", description: "Distribuição para todo o Nordeste com agilidade e cuidado no transporte de cada produto." },
];

function AnimatedCounter({ target, suffix, display }: { target: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!target && display) {
      setCount(0);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2200;
          const startTime = performance.now();

          const tick = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, display]);

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl font-bold text-gradient">
      {display ?? `${count.toLocaleString("pt-BR")}${suffix}`}
    </div>
  );
}

export default function About() {
  const titleRef = useScrollAnimation("scroll-fade-up");
  const statsRef = useScrollAnimation("scroll-fade-up");
  const historyRef = useScrollAnimation("scroll-slide-left");
  const commitmentRef = useScrollAnimation("scroll-slide-right");
  const valuesRef = useScrollAnimation("scroll-fade-up");

  return (
    <section className="pt-28 pb-24">
      <div className="section-container">

        {/* ─── Title ─── */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-xs font-display uppercase tracking-[0.2em] text-primary mb-3">
            Nossa Empresa
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase title-line mb-8">
            Sobre a <span className="text-gradient">L&L Alumínio</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-8">
            Somos uma fábrica de produtos em alumínio com mais de 9 anos de tradição. Nossa missão é
            levar qualidade, durabilidade e design para cada cozinha brasileira.
          </p>
        </div>

        {/* ─── Stats grid ─── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <s.icon className="mx-auto text-primary mb-4" size={28} />
              <AnimatedCounter
                target={s.numericValue}
                suffix={s.suffix}
                display={s.display}
              />
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ─── History + Commitment ─── */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div ref={historyRef} className="relative">
            {/* Red left border accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="pl-6">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground uppercase mb-4">
                Nossa <span className="text-gradient">História</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Fundada em 2017 no interior do Nordeste, a L&L Alumínio nasceu da paixão por criar
                utensílios domésticos de qualidade. O que começou como uma pequena oficina cresceu
                para se tornar referência regional em produtos de alumínio, atendendo clientes em
                todo o Nordeste brasileiro.
              </p>
            </div>
          </div>

          <div ref={commitmentRef} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="pl-6">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground uppercase mb-4">
                Nosso <span className="text-gradient">Compromisso</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Cada peça sai da nossa fábrica com rigoroso controle de qualidade. Utilizamos alumínio
                de alta pureza e processos sustentáveis, garantindo produtos duráveis, seguros e belos
                para toda a família. Nosso compromisso é com a satisfação de cada cliente.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Values ─── */}
        <div ref={valuesRef}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center uppercase mb-10 title-line">
            Nossos <span className="text-gradient">Valores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group glass-card p-6 hover:border-primary/30 transition-all duration-400 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors duration-300">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h4 className="font-display text-lg font-bold uppercase text-foreground mb-2">
                  {v.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
