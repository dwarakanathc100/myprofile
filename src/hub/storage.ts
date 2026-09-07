const PREFIX = "lh_";

export function loadList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveList<T>(key: string, value: T[]): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function uid(): string {
  return crypto.randomUUID();
}
