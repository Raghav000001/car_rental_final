import type { ReactNode } from "react";

type BentoVariant = "default" | "featured" | "inset";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  variant?: BentoVariant;
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  as?: "div" | "article" | "section";
};

const variantClass: Record<BentoVariant, string> = {
  default: "bento-card",
  featured: "bento-card bento-card-featured",
  inset: "bento-card bento-card-inset",
};

export default function BentoCard({
  children,
  className = "",
  variant = "default",
  delay,
  as: Tag = "div",
}: BentoCardProps) {
  const animation = delay ? `bento-fade-in bento-fade-in-${delay}` : "";
  return (
    <Tag className={`${variantClass[variant]} ${animation} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
