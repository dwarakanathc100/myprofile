import { FormEvent, useEffect, useState } from "react";
import { loadList, saveList, uid } from "../storage";

type Note = { id: string; title: string; body: string };

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setNotes(loadList<Note>("notes"));
  }, []);

  function persist(next: Note[]) {
    setNotes(next);
    saveList("notes", next);
  }

  function onAdd(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    persist([{ id: uid(), title: title.trim(), body: body.trim() }, ...notes]);
    setTitle("");
    setBody("");
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">Browser-only notes. Not synced to Google Docs.</p>
      <form onSubmit={onAdd} className="glass space-y-3 rounded-2xl p-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Note"
          rows={4}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <button type="submit" className="rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-ink">
          Save note
        </button>
      </form>
      <ul className="space-y-3">
        {notes.map((note) => (
          <li key={note.id} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium">{note.title}</h3>
              <button
                type="button"
                className="font-mono text-[11px] text-white/35 hover:text-rose"
                onClick={() => persist(notes.filter((n) => n.id !== note.id))}
              >
                Remove
              </button>
            </div>
            {note.body ? <p className="mt-2 whitespace-pre-wrap text-sm text-white/60">{note.body}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
