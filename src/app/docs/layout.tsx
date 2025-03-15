import { ReactNode } from "react";
import Link from "next/link";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold">Design system</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/docs/buttons" className="text-sm hover:underline">
              Buttons
            </Link>
            <Link href="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>
            <Link href="/" className="text-sm hover:underline">
              Back to Showcase
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
} 