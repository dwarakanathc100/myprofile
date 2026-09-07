import { useEffect, useState, type ReactElement } from "react";
import { clearGoogleToken, connectGoogle, storedAccessToken } from "./google";
import { FilesPage } from "./pages/Files";
import { KeyDatesPage } from "./pages/KeyDates";
import { MeetingsPage } from "./pages/Meetings";
import { NotesPage } from "./pages/Notes";
import { SpeakingPage } from "./pages/Speaking";
import { TodayPage } from "./pages/Today";
import { TodosPage } from "./pages/Todos";
import { WordsPage } from "./pages/Words";
import { currentHubPage, hubHref, hubPages, type HubPageId } from "./routes";

const pages: Record<HubPageId, { title: string; node: ReactElement }> = {
  today: { title: "Today", node: <TodayPage /> },
  todos: { title: "Todos", node: <TodosPage /> },
  meetings: { title: "Meetings", node: <MeetingsPage /> },
  dates: { title: "Key dates", node: <KeyDatesPage /> },
  notes: { title: "Notes", node: <NotesPage /> },
  speaking: { title: "Speaking", node: <SpeakingPage /> },
  files: { title: "Files", node: <FilesPage /> },
  words: { title: "Words", node: <WordsPage /> },
};

export function HubApp() {
  const [page, setPage] = useState<HubPageId>(() => currentHubPage());
  const [connected, setConnected] = useState(() => Boolean(storedAccessToken()));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onHash = () => setPage(currentHubPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  async function onConnect() {
    setError("");
    setBusy(true);
    try {
      await connectGoogle();
      setConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google connect failed.");
    } finally {
      setBusy(false);
    }
  }

  const current = pages[page];

  return (
    <div className="relative min-h-screen bg-ink">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Private</p>
            <h1 className="font-display text-xl font-bold">LifeHub</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {connected ? (
              <button
                type="button"
                onClick={() => {
                  clearGoogleToken();
                  setConnected(false);
                }}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/60"
              >
                Disconnect Google
              </button>
            ) : (
              <button
                type="button"
                disabled={busy}
                onClick={() => void onConnect()}
                className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1.5 text-xs text-cyan"
              >
                {busy ? "Connecting…" : "Connect Google"}
              </button>
            )}
            <a href="#top" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/55">
              Back to site
            </a>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-3">
          {hubPages.map((item) => (
            <a
              key={item.id}
              href={hubHref(item.path)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
                page === item.id ? "bg-cyan text-ink" : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="font-display text-3xl font-bold">{current.title}</h2>
        {error ? <p className="mt-3 text-sm text-rose">{error}</p> : null}
        <div className="mt-6" key={`${page}-${connected ? "g" : "l"}`}>
          {current.node}
        </div>
      </main>
    </div>
  );
}
