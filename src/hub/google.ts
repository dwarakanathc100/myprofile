const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/drive.file",
].join(" ");

const TOKEN_KEY = "lh_google_token";
const TOKEN_EXP_KEY = "lh_google_token_exp";
const GSI_SRC = "https://accounts.google.com/gsi/client";

const PUBLIC_WEB_CLIENT_ID =
  "866193989995-7vjmmq5n1m24sa6p3ifvor82upbe9df7.apps.googleusercontent.com";

export function googleClientId(): string {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || PUBLIC_WEB_CLIENT_ID;
}

export function googleEnabled(): boolean {
  return Boolean(googleClientId());
}

export function storedAccessToken(): string | null {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const exp = Number(sessionStorage.getItem(TOKEN_EXP_KEY) ?? 0);
  if (!token || Date.now() >= exp) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXP_KEY);
    return null;
  }
  return token;
}

const YT_SCOPE = "https://www.googleapis.com/auth/youtube.upload";
const YT_TOKEN_KEY = "lh_youtube_token";
const YT_TOKEN_EXP_KEY = "lh_youtube_token_exp";

export function clearGoogleToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_EXP_KEY);
  sessionStorage.removeItem(YT_TOKEN_KEY);
  sessionStorage.removeItem(YT_TOKEN_EXP_KEY);
}

function loadGsi(): Promise<void> {
  if (window.google?.accounts.oauth2) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GSI_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = GSI_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Google sign-in."));
    document.head.appendChild(script);
  });
}

function requestGoogleToken(scope: string, tokenKey: string, expKey: string, forceConsent: boolean): Promise<string> {
  const clientId = googleClientId();
  if (!clientId) throw new Error("Add VITE_GOOGLE_CLIENT_ID to connect Google.");

  return new Promise((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope,
      // Google rejects youtube.upload + drive.file in one request. GIS defaults
      // to include_granted_scopes=true, which would merge the two grants.
      include_granted_scopes: false,
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error || "Google did not return a token."));
          return;
        }
        sessionStorage.setItem(tokenKey, response.access_token);
        sessionStorage.setItem(expKey, String(Date.now() + 50 * 60 * 1000));
        resolve(response.access_token);
      },
    });
    client.requestAccessToken({ prompt: forceConsent ? "consent" : "" });
  });
}

export async function connectGoogle(): Promise<string> {
  await loadGsi();
  if (!window.google) throw new Error("Google sign-in is not available.");
  return requestGoogleToken(SCOPES, TOKEN_KEY, TOKEN_EXP_KEY, !storedAccessToken());
}

export async function requireToken(): Promise<string> {
  return storedAccessToken() ?? connectGoogle();
}

async function googleFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const token = await requireToken();
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  if (response.status === 401) {
    clearGoogleToken();
    throw new Error("Google session expired. Connect again.");
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(body || `Google request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export type CalendarEvent = {
  id: string;
  summary?: string;
  description?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  htmlLink?: string;
};

export function listCalendarEvents(timeMin: Date, timeMax: Date): Promise<{ items?: CalendarEvent[] }> {
  const params = new URLSearchParams({
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });
  return googleFetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`);
}

export function createCalendarEvent(body: Record<string, unknown>): Promise<CalendarEvent> {
  return googleFetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function deleteCalendarEvent(id: string): Promise<void> {
  return googleFetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
    method: "DELETE",
  });
}

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3";
const FOLDER_NAME = "LifeHub";

type DriveFile = { id: string; name: string; mimeType?: string; webViewLink?: string };

async function ensureFolderId(): Promise<string> {
  const q = encodeURIComponent(`mimeType='application/vnd.google-apps.folder' and name='${FOLDER_NAME}' and trashed=false`);
  const found = await googleFetch<{ files?: DriveFile[] }>(`${DRIVE_API}/files?q=${q}&spaces=drive&fields=files(id,name)`);
  if (found.files?.[0]?.id) return found.files[0].id;
  const created = await googleFetch<DriveFile>(`${DRIVE_API}/files?fields=id`, {
    method: "POST",
    body: JSON.stringify({ name: FOLDER_NAME, mimeType: "application/vnd.google-apps.folder" }),
  });
  return created.id;
}

export async function listHubFiles(): Promise<DriveFile[]> {
  const folderId = await ensureFolderId();
  const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
  const result = await googleFetch<{ files?: DriveFile[] }>(
    `${DRIVE_API}/files?q=${q}&fields=files(id,name,mimeType,webViewLink)&orderBy=modifiedTime desc`,
  );
  return result.files ?? [];
}

export async function uploadHubFile(blob: Blob, fileName: string): Promise<DriveFile> {
  const folderId = await ensureFolderId();
  const metadata = { name: fileName, parents: [folderId] };
  const boundary = `hub-${crypto.randomUUID()}`;
  const head =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: ${blob.type || "application/octet-stream"}\r\n\r\n`;
  const body = new Blob([head, blob, `\r\n--${boundary}--`]);
  const token = await requireToken();
  const response = await fetch(`${DRIVE_UPLOAD}/files?uploadType=multipart&fields=id,name,webViewLink`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  if (!response.ok) throw new Error("Drive upload failed.");
  return response.json() as Promise<DriveFile>;
}

export function storedYoutubeToken(): string | null {
  const token = sessionStorage.getItem(YT_TOKEN_KEY);
  const exp = Number(sessionStorage.getItem(YT_TOKEN_EXP_KEY) ?? 0);
  if (!token || Date.now() >= exp) {
    sessionStorage.removeItem(YT_TOKEN_KEY);
    sessionStorage.removeItem(YT_TOKEN_EXP_KEY);
    return null;
  }
  return token;
}

export async function connectYoutube(): Promise<string> {
  await loadGsi();
  if (!window.google) throw new Error("Google sign-in is not available.");
  return requestGoogleToken(YT_SCOPE, YT_TOKEN_KEY, YT_TOKEN_EXP_KEY, !storedYoutubeToken());
}

async function requireYoutubeToken(): Promise<string> {
  return storedYoutubeToken() ?? connectYoutube();
}

export type YoutubeUpload = { id: string };

export async function uploadToYoutube(blob: Blob, title: string): Promise<YoutubeUpload> {
  const token = await requireYoutubeToken();
  const metadata = {
    snippet: { title, description: "Recorded in LifeHub speaking practice." },
    status: { privacyStatus: "unlisted", selfDeclaredMadeForKids: false },
  };
  const boundary = `yt-${crypto.randomUUID()}`;
  const head =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: ${blob.type || "video/webm"}\r\n\r\n`;
  const body = new Blob([head, blob, `\r\n--${boundary}--`]);
  // Local Vite proxies this path to Google. The live GitHub Pages host cannot.
  const endpoint = import.meta.env.DEV
    ? "/google-youtube-upload?uploadType=multipart&part=snippet,status"
    : "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    if (response.status === 403 && /accessNotConfigured|YouTube Data API/i.test(text)) {
      throw new Error("Enable YouTube Data API v3 on the same Google Cloud project as this OAuth client.");
    }
    if (response.status === 401) {
      sessionStorage.removeItem(YT_TOKEN_KEY);
      sessionStorage.removeItem(YT_TOKEN_EXP_KEY);
      throw new Error("YouTube session expired. Try Upload to YouTube again.");
    }
    throw new Error(text || "YouTube upload failed.");
  }
  return response.json() as Promise<YoutubeUpload>;
}
