import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Component Library | Modern, Interactive, Reusable Components",
  description: "A beautiful, modern UI component library showcase with interactive animations and effects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen w-full antialiased frosted-glass-background">
        {children}
      </body>
    </html>
  );
}
