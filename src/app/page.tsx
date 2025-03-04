import { ComponentShowcase } from "@/components/showcase";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "hsl(var(--background))" }}>
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60" 
              style={{ backgroundColor: "hsla(var(--background), 0.95)" }}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "hsl(var(--primary))" }}></div>
            <span className="font-bold">UI Component Library</span>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <a 
              href="https://github.com/yourusername/reusable-component-library" 
              className="text-sm font-medium transition-colors hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Portfolio
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>
      
      <ComponentShowcase />
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left"
             style={{ color: "hsl(var(--muted-foreground))" }}>
            Built with ❤️ and modern web technologies. Designed for UX Engineer role applications.
          </p>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Change Theme
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
