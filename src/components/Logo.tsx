import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={"flex items-center gap-2.5 leading-none " + className}>
      <img 
        src="/logo.jpeg" 
        alt="Aperion Logo" 
        className="h-9 w-9 rounded-[12px] object-cover shadow-sm"
      />
      <div className="flex flex-col">
        <span className="font-display text-2xl tracking-tight">Aperion</span>
      </div>
    </Link>
  );
}

