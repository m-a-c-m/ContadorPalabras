import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/word-counter";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Contador de Palabras Gratis Online",
    template: "%s | Word Counter",
  },
  description:
    "Cuenta palabras, caracteres, frases y párrafos al instante. Calcula tiempo de lectura y palabras más frecuentes. Herramienta gratuita, sin registro, 100% en el navegador.",
  keywords: [
    "contador de palabras",
    "contar palabras online",
    "word counter",
    "contador caracteres",
    "tiempo de lectura",
    "contador palabras gratis",
    "word count online free",
    "contar palabras gratis",
    "contador de texto",
    "keyword density",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Contador de Palabras Gratis Online",
    description:
      "Cuenta palabras, caracteres, frases y párrafos. Calcula tiempo de lectura. Sin registro, gratis. Por MACM.",
    url: SITE_URL,
    siteName: "Word Counter — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contador de Palabras Gratis Online",
    description: "Cuenta palabras gratis. Sin registro. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/ContadorPalabras"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
