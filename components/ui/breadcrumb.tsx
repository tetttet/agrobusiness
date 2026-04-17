import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-black">
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? "text-neutral-600" : "text-neutral-400"}
              >
                {item.label}
              </span>
            )}

            {!isLast && <span>/</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
