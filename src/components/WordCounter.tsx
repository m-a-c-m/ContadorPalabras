"use client";

import { useState, useMemo } from "react";

function analyze(text: string) {
  const trimmed = text.trim();
  const words = trimmed === "" ? [] : trimmed.split(/\s+/).filter(Boolean);
  const sentences = trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-záéíóúüñ]/gi, ""))).size;
  const longest = words.reduce((a, b) => (b.replace(/\W/g, "").length > a.replace(/\W/g, "").length ? b : a), "");

  const freq: Record<string, number> = {};
  const stopEs = new Set(["de","la","el","en","y","a","que","los","las","un","una","con","por","para","se","del","al","es","su","lo","como","más","pero","sus","le","ya","o","este","esta","si","tiene","han","fue","ser","está","son","hay","me","mi","no","te","tu","nos","todo","cuando","también","sobre","entre","sin","muy","bien","así","desde","hasta","según","durante","antes","después","cada","mismo","misma","tanto","sólo","solo","aunque","porque","donde","quien","cuál","cómo","qué","cual"]);
  const stopEn = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","from","is","are","was","were","be","been","have","has","had","do","did","will","would","could","should","may","might","this","that","these","those","it","its","i","you","he","she","we","they","my","your","his","her","our","their","not","no","so","as","if","then","than","also","just","more","all","any","can","one","about","up","out","when","there","what","which","who","how","some"]);
  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-záéíóúüñ]/gi, "");
    if (clean.length > 2 && !stopEs.has(clean) && !stopEn.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });
  const topKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return { words: words.length, chars: text.length, charsNoSpaces, sentences, paragraphs, uniqueWords, longest: longest.replace(/\W/g, ""), topKeywords };
}

function formatTime(words: number, wpm: number): string {
  if (words === 0) return "—";
  const totalSeconds = Math.ceil((words / wpm) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds} seg`;
  if (seconds === 0) return `${minutes} min`;
  return `${minutes} min ${seconds} seg`;
}

const READING_PRESETS = [
  { label: "Lento",  wpm: 150 },
  { label: "Normal", wpm: 200 },
  { label: "Rápido", wpm: 250 },
];

const SPEAKING_PRESETS = [
  { label: "Lento",  wpm: 100 },
  { label: "Normal", wpm: 130 },
  { label: "Rápido", wpm: 160 },
];

export default function WordCounter() {
  const [text, setText] = useState("");

  const [readingWpm, setReadingWpm] = useState(200);
  const [readingInput, setReadingInput] = useState("200");
  const [speakingWpm, setSpeakingWpm] = useState(130);
  const [speakingInput, setSpeakingInput] = useState("130");

  const stats = useMemo(() => analyze(text), [text]);

  const handleWpmInput = (
    val: string,
    setInput: (v: string) => void,
    setWpm: (v: number) => void,
  ) => {
    setInput(val);
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1 && num <= 2000) setWpm(num);
  };

  const applyPreset = (
    wpm: number,
    setWpm: (v: number) => void,
    setInput: (v: string) => void
  ) => { setWpm(wpm); setInput(String(wpm)); };

  const statCards = [
    { value: stats.words,         label: "Palabras",     color: "text-primary"    },
    { value: stats.chars,         label: "Caracteres",   color: "text-secondary"  },
    { value: stats.charsNoSpaces, label: "Sin espacios", color: "text-accent"     },
    { value: stats.sentences,     label: "Frases",       color: "text-green-400"  },
    { value: stats.paragraphs,    label: "Párrafos",     color: "text-yellow-400" },
    { value: stats.uniqueWords,   label: "Únicas",       color: "text-pink-400"   },
  ];

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe o pega tu texto aquí..."
          rows={10}
          className="w-full resize-none rounded-2xl border border-border/40 bg-background/80 px-5 py-4 text-text placeholder-text-muted/40 outline-none transition-all focus:border-primary/50 focus:shadow-[0_0_20px_rgba(0,212,255,0.08)] text-sm leading-relaxed"
        />
        {text && (
          <button
            onClick={() => setText("")}
            className="absolute right-4 top-4 rounded-lg px-3 py-1 text-xs text-text-muted/60 transition-colors hover:text-accent"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((s) => (
          <div key={s.label} className="flex flex-col items-center rounded-xl border border-border/30 bg-surface/50 px-3 py-4 text-center">
            <span className={`text-3xl font-bold tabular-nums ${s.color}`}>{s.value}</span>
            <span className="mt-1 text-xs text-text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Reading + speaking time */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Reading */}
        <div className="rounded-xl border border-border/30 bg-surface/50 px-5 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <p className="text-xs font-medium text-text-muted">Tiempo de lectura</p>
          </div>
          <p className="text-2xl font-bold text-primary tabular-nums">
            {formatTime(stats.words, readingWpm)}
          </p>
          <div className="flex gap-1.5">
            {READING_PRESETS.map((p) => (
              <button
                key={p.wpm}
                onClick={() => applyPreset(p.wpm, setReadingWpm, setReadingInput)}
                className={`flex-1 rounded-lg py-1 text-xs font-medium transition-colors border ${
                  readingWpm === p.wpm
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border/30 bg-background/50 text-text-muted hover:text-text"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={2000}
              value={readingInput}
              onChange={(e) => handleWpmInput(e.target.value, setReadingInput, setReadingWpm)}
              onBlur={() => setReadingInput(String(readingWpm))}
              className="w-20 rounded-lg border border-border/30 bg-background/50 px-2 py-1 text-xs text-center text-text outline-none focus:border-primary/40 tabular-nums"
            />
            <span className="text-xs text-text-muted">pal/min</span>
          </div>
        </div>

        {/* Speaking */}
        <div className="rounded-xl border border-border/30 bg-surface/50 px-5 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎙️</span>
            <p className="text-xs font-medium text-text-muted">Tiempo de habla</p>
          </div>
          <p className="text-2xl font-bold text-secondary tabular-nums">
            {formatTime(stats.words, speakingWpm)}
          </p>
          <div className="flex gap-1.5">
            {SPEAKING_PRESETS.map((p) => (
              <button
                key={p.wpm}
                onClick={() => applyPreset(p.wpm, setSpeakingWpm, setSpeakingInput)}
                className={`flex-1 rounded-lg py-1 text-xs font-medium transition-colors border ${
                  speakingWpm === p.wpm
                    ? "border-secondary/40 bg-secondary/15 text-secondary"
                    : "border-border/30 bg-background/50 text-text-muted hover:text-text"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={2000}
              value={speakingInput}
              onChange={(e) => handleWpmInput(e.target.value, setSpeakingInput, setSpeakingWpm)}
              onBlur={() => setSpeakingInput(String(speakingWpm))}
              className="w-20 rounded-lg border border-border/30 bg-background/50 px-2 py-1 text-xs text-center text-text outline-none focus:border-secondary/40 tabular-nums"
            />
            <span className="text-xs text-text-muted">pal/min</span>
          </div>
        </div>
      </div>

      {/* Longest word + keywords */}
      {stats.words > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {stats.longest && (
            <div className="rounded-xl border border-border/30 bg-surface/50 px-5 py-4">
              <p className="mb-2 text-xs font-medium text-text-muted">Palabra más larga</p>
              <p className="truncate text-lg font-bold text-accent">{stats.longest}</p>
            </div>
          )}
          {stats.topKeywords.length > 0 && (
            <div className="rounded-xl border border-border/30 bg-surface/50 px-5 py-4">
              <p className="mb-3 text-xs font-medium text-text-muted">Palabras más frecuentes</p>
              <div className="flex flex-wrap gap-2">
                {stats.topKeywords.map(([word, count]) => (
                  <span key={word} className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs">
                    <span className="text-text">{word}</span>
                    <span className="text-primary font-semibold">{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
