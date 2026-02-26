import type { Metadata } from "next";
import WordCounter from "@/components/WordCounter";
import { MdTextFields } from "react-icons/md";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://words.miguelacm.es";

export const metadata: Metadata = {
  title: "Contador de Palabras Gratis Online",
  description:
    "Cuenta palabras, caracteres, frases y párrafos al instante. Calcula tiempo de lectura y palabras más frecuentes. Sin registro, gratis.",
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Contador de Palabras Gratis Online",
  url: SITE_URL,
  description:
    "Cuenta palabras, caracteres, frases y párrafos al instante. Calcula tiempo de lectura y palabras clave más frecuentes. Sin registro, 100% en el navegador.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  inLanguage: "es-ES",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: {
    "@type": "Person",
    name: "Miguel Ángel Colorado Marin",
    url: "https://miguelacm.es",
  },
  featureList: [
    "Contador de palabras en tiempo real",
    "Contador de caracteres con y sin espacios",
    "Contador de frases y párrafos",
    "Palabras únicas",
    "Tiempo de lectura estimado (200 ppm)",
    "Tiempo de habla estimado (130 ppm)",
    "Palabra más larga",
    "Top 5 palabras más frecuentes (keyword density)",
    "Sin registro",
    "Código abierto",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <MdTextFields className="text-base" />
              Herramienta gratuita · Código abierto
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
              Contador de Palabras
            </h1>
            <p className="mb-2 text-lg text-text-muted">
              Cuenta palabras, caracteres, frases y párrafos. Calcula tiempos de lectura y keywords más frecuentes.
            </p>
            <p className="text-sm text-text-muted/60">
              Hecho por{" "}
              <a
                href="https://miguelacm.es"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:opacity-80 transition-opacity"
              >
                MACM
              </a>{" "}
              · Sin registro · Sin anuncios · 100% en el navegador
            </p>
          </div>

          {/* Tool */}
          <div className="glass rounded-2xl border border-border/20 p-6 md:p-8">
            <WordCounter />
          </div>

          {/* Feature cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: "📊",
                title: "6 métricas al instante",
                desc: "Palabras, caracteres (con y sin espacios), frases, párrafos y palabras únicas. Actualización en tiempo real mientras escribes.",
              },
              {
                icon: "⏱️",
                title: "Tiempos de lectura",
                desc: "Calcula el tiempo estimado de lectura (200 ppm) y de habla (130 ppm) para saber cuánto dura tu contenido.",
              },
              {
                icon: "🔑",
                title: "Densidad de keywords",
                desc: "Muestra las 5 palabras más repetidas ignorando preposiciones y artículos, ideal para optimizar tu texto para SEO.",
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="glass rounded-xl border border-border/15 p-5"
              >
                <span className="mb-3 block text-2xl">{item.icon}</span>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How to use */}
          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Cómo usar el contador de palabras
            </h2>
            <ol className="space-y-3">
              {[
                {
                  n: 1,
                  text: "Escribe o pega tu texto en el área de texto grande.",
                },
                {
                  n: 2,
                  text: "Las métricas se actualizan en tiempo real: palabras, caracteres, frases, párrafos y palabras únicas.",
                },
                {
                  n: 3,
                  text: "Consulta el tiempo estimado de lectura y habla en la sección inferior.",
                },
                {
                  n: 4,
                  text: "Usa el panel de palabras más frecuentes para analizar la densidad de keywords de tu texto.",
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {step.n}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
            {[
              {
                q: "¿Para qué sirve un contador de palabras?",
                a: "Un contador de palabras es útil para escritores, estudiantes, periodistas y profesionales del SEO. Permite verificar límites de palabras, calcular tiempos de lectura para artículos o presentaciones, y analizar la densidad de keywords en un texto.",
              },
              {
                q: "¿Cómo se calcula el tiempo de lectura?",
                a: "El tiempo de lectura se calcula dividiendo el número de palabras entre 200 palabras por minuto (ppm), que es la velocidad media de lectura de un adulto. El tiempo de habla usa 130 ppm, velocidad media al hablar en público.",
              },
              {
                q: "¿Qué es la densidad de keywords?",
                a: "La densidad de keywords muestra qué palabras aparecen más veces en tu texto, excluyendo palabras vacías (artículos, preposiciones). Es útil para SEO: si una keyword aparece demasiado, puede ser penalizada por Google.",
              },
              {
                q: "¿Es seguro pegar mi texto aquí?",
                a: "Completamente seguro. Esta herramienta funciona 100% en tu navegador (client-side). Tu texto nunca sale de tu dispositivo — no hay servidor que lo reciba ni lo almacene.",
              },
              {
                q: "¿Puedo embeber este contador en mi web?",
                a: "Sí, puedes usar el iframe que se muestra en la sección de integración de abajo. Es completamente gratuito, con atribución a MACM · miguelacm.es que genera un backlink al proyecto.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border/20 bg-white/3 p-5"
              >
                <h3 className="mb-2 font-medium text-white">{item.q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Embed section */}
          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-2 font-semibold text-white">
              Integra el contador en tu web
            </h2>
            <p className="mb-4 text-sm text-text-muted">
              Puedes embeber este contador de palabras en cualquier web con un simple iframe, o añadir un enlace con atribución para ayudar al proyecto.
            </p>
            <div className="mb-3 rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Iframe (integración directa):</p>
              <code className="text-xs text-green-400 break-all">
                {`<iframe src="${SITE_URL}" width="100%" height="700" style="border:none;border-radius:12px;" title="Contador de Palabras — miguelacm.es" loading="lazy"></iframe>`}
              </code>
            </div>
            <div className="rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">
                Enlace con atribución (recomendado para backlink):
              </p>
              <code className="text-xs text-green-400 break-all">
                {`<a href="${SITE_URL}" target="_blank" rel="noopener">Contador de palabras gratis por MACM</a>`}
              </code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
