import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
