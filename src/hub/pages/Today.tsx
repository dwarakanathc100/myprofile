import { useEffect, useState } from "react";
import { hubHref } from "../routes";
import { loadList } from "../storage";
import { googleEnabled, storedAccessToken } from "../google";

type Todo = { id: string; title: string; done: boolean };
type Note = { id: string; title: string; body: string };
type KeyDate = { id: string; label: string; date: string };

export function TodayPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [dates, setDates] = useState<KeyDate[]>([]);
  const connected = Boolean(storedAccessToken());

  useEffect(() => {
    setTodos(loadList<Todo>("todos").filter((t) => !t.done).slice(0, 5));
    setNotes(loadList<Note>("notes").slice(0, 3));
    const today = new Date().toISOString().slice(0, 10);
    setDates(loadList<KeyDate>("dates").filter((d) => d.date >= today).slice(0, 4));
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/55">
        Private room on this site. Meetings and speaking use your Google Calendar and Drive when
        connected. Lists stay in this browser if Google is off.
        {googleEnabled()
          ? connected
            ? " Google is connected for this tab."
            : " Connect Google in the header to write Calendar and Drive."
          : " Add VITE_GOOGLE_CLIENT_ID to enable Calendar and Drive."}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Open todos</h2>
            <a href={hubHref("/todos")} className="font-mono text-[11px] text-cyan">
              Open
            </a>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {todos.length === 0 ? <li>Nothing waiting.</li> : todos.map((t) => <li key={t.id}>{t.title}</li>)}
          </ul>
        </section>
        <section className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Coming dates</h2>
            <a href={hubHref("/dates")} className="font-mono text-[11px] text-cyan">
              Open
            </a>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {dates.length === 0 ? (
              <li>No upcoming dates.</li>
            ) : (
              dates.map((d) => (
                <li key={d.id}>
                  {d.date} · {d.label}
                </li>
              ))
            )}
          </ul>
        </section>
        <section className="glass rounded-2xl p-5 md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent notes</h2>
            <a href={hubHref("/notes")} className="font-mono text-[11px] text-cyan">
              Open
            </a>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {notes.length === 0 ? <li>No notes yet.</li> : notes.map((n) => <li key={n.id}>{n.title}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
