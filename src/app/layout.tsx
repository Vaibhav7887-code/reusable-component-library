import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Component Library | Modern, Interactive, Reusable Components",
  description: "A beautiful, modern UI component library showcase with interactive animations and effects for UX Engineer role applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased" style={{ backgroundColor: "hsl(var(--background))" }}>
        {children}
      </body>
    </html>
  );
}
