import { FormEvent, useState } from "react";

type Meaning = { partOfSpeech?: string; definitions?: { definition: string; example?: string }[] };

export function WordsPage() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState<Meaning[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = word.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    setMeanings([]);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q)}`);
      if (!response.ok) throw new Error("No entry for that word.");
      const data = (await response.json()) as { meanings?: Meaning[] }[];
      setMeanings(data[0]?.meanings ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">Public dictionary API. No LifeHub server and no Google.</p>
      <form onSubmit={(e) => void onSearch(e)} className="flex gap-2">
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Look up a word"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <button type="submit" className="rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-ink">
          Search
        </button>
      </form>
      {loading ? <p className="text-sm text-white/45">Looking up…</p> : null}
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      <div className="space-y-4">
        {meanings.map((meaning, index) => (
          <section key={`${meaning.partOfSpeech}-${index}`} className="glass rounded-2xl p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{meaning.partOfSpeech}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {(meaning.definitions ?? []).slice(0, 3).map((def) => (
                <li key={def.definition}>
                  {def.definition}
                  {def.example ? <span className="mt-1 block text-white/40">“{def.example}”</span> : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
