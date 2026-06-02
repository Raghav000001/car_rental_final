import Link from "next/link";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  badge?: string;
};

export default function PageHero({
  title,
  subtitle,
  crumbs = [],
  badge,
}: PageHeroProps) {
  return (
    <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-28 overflow-hidden bg-secondary">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-bg-dark" />

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-black tracking-[0.25em] uppercase text-primary">
              {badge}
            </span>
          </div>
        )}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.9] mb-6">
          {title.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="text-gradient-primary">
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        {subtitle && (
          <p className="text-body text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm"
          >
            <Link
              href="/"
              className="text-body hover:text-primary transition-colors font-semibold"
            >
              Home
            </Link>
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-primary/60">/</span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-body hover:text-primary transition-colors font-semibold"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-bold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
