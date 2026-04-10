import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/5588933008270?text=${encodeURIComponent(
  "Olá, gostaria de saber mais sobre os produtos de vocês!"
)}`;

export default function Footer() {
  return (
    <footer className="relative bg-secondary border-t border-border/40 overflow-hidden">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="relative section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/logo/logo.webp"
              alt="L&L Alumínio"
              className="rounded-lg object-cover w-36"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              Qualidade em alumínio desde 2017. Produtos artesanais e industriais para todo o Nordeste brasileiro.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/catalogo", label: "Catálogo" },
                { to: "/sobre", label: "Sobre nós" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
              >
                <Phone size={14} className="text-primary shrink-0" />
                <span>(88) 93300-8270</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <span>Juazeiro do Norte, CE — Nordeste</span>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 btn-outline-red !px-5 !py-2 !text-xs"
            >
              Fale via WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} L&L Alumínio — Todos os direitos reservados.</p>
          <p>Fabricado com tradição no Nordeste</p>
        </div>
      </div>
    </footer>
  );
}
