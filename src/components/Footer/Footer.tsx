export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border py-10">
      <div className="section-container flex flex-col items-center gap-4 text-center">
        <img
          src="/images/logo/logo.webp"
          alt="L&L"
          className=" rounded-lg object-cover"
          width={300}
        />
        <span className="font-display text-lg font-bold tracking-wider text-foreground">
          L&L<span className="text-primary"> Alumínio</span>
        </span>
        <p className="text-sm text-muted-foreground max-w-md">
          Qualidade em alumínio desde 1990. Produtos artesanais e industriais
          para todo o Brasil.
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} AlumiPro — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
