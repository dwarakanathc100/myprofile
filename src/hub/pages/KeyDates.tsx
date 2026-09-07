import { FormEvent, useEffect, useState } from "react";
import { createCalendarEvent, googleEnabled, storedAccessToken } from "../google";
import { loadList, saveList, uid } from "../storage";

type KeyDate = { id: string; label: string; date: string };

export function KeyDatesPage() {
  const [dates, setDates] = useState<KeyDate[]>([]);
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const canCalendar = googleEnabled() && Boolean(storedAccessToken());

  useEffect(() => {
    setDates(loadList<KeyDate>("dates"));
  }, []);

  function persist(next: KeyDate[]) {
    setDates(next);
    saveList("dates", next);
  }

  async function onAdd(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!label.trim() || !date) return;
    const item = { id: uid(), label: label.trim(), date };
    persist([item, ...dates].sort((a, b) => a.date.localeCompare(b.date)));
    if (canCalendar) {
      try {
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        await createCalendarEvent({
          summary: label.trim(),
          start: { date },
          end: { date: next.toISOString().slice(0, 10) },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calendar write failed. Saved locally.");
      }
    }
    setLabel("");
    setDate("");
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        Saved here. If Google is connected, each date is also created as an all-day Calendar event.
      </p>
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      <form onSubmit={onAdd} className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Birthday, visa, exam…"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <button type="submit" className="rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-ink">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {dates.map((item) => (
          <li key={item.id} className="glass flex items-center justify-between rounded-xl px-4 py-3 text-sm">
            <span>
              {item.date} · {item.label}
            </span>
            <button
              type="button"
              className="font-mono text-[11px] text-white/35 hover:text-rose"
              onClick={() => persist(dates.filter((d) => d.id !== item.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
