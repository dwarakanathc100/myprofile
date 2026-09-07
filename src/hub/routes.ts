export const HUB_PREFIX = "#/lifehub";

export const hubPages = [
  { id: "today", label: "Today", path: "" },
  { id: "todos", label: "Todos", path: "/todos" },
  { id: "meetings", label: "Meetings", path: "/meetings" },
  { id: "dates", label: "Key dates", path: "/dates" },
  { id: "notes", label: "Notes", path: "/notes" },
  { id: "speaking", label: "Speaking", path: "/speaking" },
  { id: "files", label: "Files", path: "/files" },
  { id: "words", label: "Words", path: "/words" },
] as const;

export type HubPageId = (typeof hubPages)[number]["id"];

export function isHubHash(hash = window.location.hash): boolean {
  return hash === HUB_PREFIX || hash.startsWith(`${HUB_PREFIX}/`) || hash.startsWith(`${HUB_PREFIX}?`);
}

export function hubHref(path = ""): string {
  return `${HUB_PREFIX}${path}`;
}

export function currentHubPage(hash = window.location.hash): HubPageId {
  const raw = hash.startsWith(HUB_PREFIX) ? hash.slice(HUB_PREFIX.length) : "";
  const path = raw.split("?")[0];
  const match = hubPages.find((page) => page.path === path);
  return match?.id ?? "today";
}
