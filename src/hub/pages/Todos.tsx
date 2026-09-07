import { FormEvent, useEffect, useState } from "react";
import { loadList, saveList, uid } from "../storage";

type Todo = { id: string; title: string; done: boolean };

export function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTodos(loadList<Todo>("todos"));
  }, []);

  function persist(next: Todo[]) {
    setTodos(next);
    saveList("todos", next);
  }

  function onAdd(event: FormEvent) {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;
    persist([{ id: uid(), title: value, done: false }, ...todos]);
    setTitle("");
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">Stored in this browser. No LifeHub database.</p>
      <form onSubmit={onAdd} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
        />
        <button type="submit" className="rounded-xl bg-cyan px-4 py-3 text-sm font-semibold text-ink">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="glass flex items-center gap-3 rounded-xl px-4 py-3">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() =>
                persist(todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)))
              }
            />
            <span className={`flex-1 text-sm ${todo.done ? "text-white/35 line-through" : ""}`}>
              {todo.title}
            </span>
            <button
              type="button"
              className="font-mono text-[11px] text-white/35 hover:text-rose"
              onClick={() => persist(todos.filter((t) => t.id !== todo.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
