import { FormEvent, useEffect, useState } from "react";
import {
  CalendarEvent,
  createCalendarEvent,
  deleteCalendarEvent,
  googleEnabled,
  listCalendarEvents,
  storedAccessToken,
} from "../google";
import { loadList, saveList, uid } from "../storage";

type LocalMeeting = { id: string; title: string; start: string; end: string };

function eventStart(event: CalendarEvent): string {
  return event.start?.dateTime || event.start?.date || "";
}

export function MeetingsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [local, setLocal] = useState<LocalMeeting[]>([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const connected = googleEnabled() && Boolean(storedAccessToken());

  useEffect(() => {
    setLocal(loadList<LocalMeeting>("meetings"));
  }, []);

  useEffect(() => {
    if (!connected) return;
    const from = new Date();
    from.setDate(from.getDate() - 1);
    const to = new Date();
    to.setDate(to.getDate() + 21);
    setLoading(true);
    listCalendarEvents(from, to)
      .then((res) => setEvents(res.items ?? []))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load Calendar."))
      .finally(() => setLoading(false));
  }, [connected]);

  async function onAdd(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!title.trim() || !start || !end) return;
    if (connected) {
      try {
        const created = await createCalendarEvent({
          summary: title.trim(),
          start: { dateTime: new Date(start).toISOString() },
          end: { dateTime: new Date(end).toISOString() },
        });
        setEvents((current) => [...current, created].sort((a, b) => eventStart(a).localeCompare(eventStart(b))));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not create the Calendar event.");
        return;
      }
    } else {
      const next = [{ id: uid(), title: title.trim(), start, end }, ...local];
      setLocal(next);
      saveList("meetings", next);
    }
    setTitle("");
    setStart("");
    setEnd("");
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        {connected
          ? "Creates events on your Google Calendar. This site does not keep a meetings table."
          : "Connect Google to write Calendar. Until then, drafts stay in this browser."}
      </p>
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      <form onSubmit={onAdd} className="grid gap-2 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting title"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <button type="submit" className="rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-ink">
          Add
        </button>
      </form>
      {loading ? <p className="text-sm text-white/45">Loading Calendar…</p> : null}
      <ul className="space-y-2">
        {connected
          ? events.map((item) => (
              <li key={item.id} className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm">
                <div>
                  <p>{item.summary || "(no title)"}</p>
                  <p className="mt-1 font-mono text-[11px] text-white/40">{eventStart(item).replace("T", " ").slice(0, 16)}</p>
                </div>
                <button
                  type="button"
                  className="font-mono text-[11px] text-white/35 hover:text-rose"
                  onClick={async () => {
                    try {
                      await deleteCalendarEvent(item.id);
                      setEvents((current) => current.filter((e) => e.id !== item.id));
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Delete failed.");
                    }
                  }}
                >
                  Remove
                </button>
              </li>
            ))
          : local.map((item) => (
              <li key={item.id} className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm">
                <div>
                  <p>{item.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-white/40">{item.start.replace("T", " ")}</p>
                </div>
                <button
                  type="button"
                  className="font-mono text-[11px] text-white/35 hover:text-rose"
                  onClick={() => {
                    const next = local.filter((m) => m.id !== item.id);
                    setLocal(next);
                    saveList("meetings", next);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
