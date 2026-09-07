import { useEffect, useRef, useState } from "react";
import { googleEnabled, storedAccessToken, uploadHubFile, uploadToYoutube } from "../google";

export function SpeakingPage() {
  const [recording, setRecording] = useState(false);
  const [live, setLive] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [statusHref, setStatusHref] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState<"drive" | "youtube" | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const connected = googleEnabled() && Boolean(storedAccessToken());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (live && streamRef.current) {
      video.srcObject = streamRef.current;
      video.removeAttribute("src");
      void video.play().catch(() => undefined);
      return;
    }
    video.srcObject = null;
    if (url) {
      video.src = url;
    }
  }, [live, url]);

  function stopStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function start() {
    setError("");
    setStatus("");
    setStatusHref("");
    setBlob(null);
    if (url) URL.revokeObjectURL(url);
    setUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      streamRef.current = stream;
      setLive(true);
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const next = new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" });
        setBlob(next);
        setUrl(URL.createObjectURL(next));
        setLive(false);
        stopStream();
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch (err) {
      stopStream();
      setLive(false);
      setError(err instanceof Error ? err.message : "Camera or microphone blocked.");
    }
  }

  function stop() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  async function uploadDrive() {
    if (!blob) return;
    setError("");
    setUploading("drive");
    try {
      const name = `speaking-${new Date().toISOString().replace(/[:.]/g, "-")}.webm`;
      const file = await uploadHubFile(blob, name);
      setStatus(file.webViewLink ? "Saved to Drive" : `Saved to Drive as ${file.name}`);
      setStatusHref(file.webViewLink ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Drive upload failed.");
    } finally {
      setUploading(null);
    }
  }

  async function uploadYoutube() {
    if (!blob) return;
    setError("");
    setUploading("youtube");
    try {
      const title = `Speaking ${new Date().toLocaleString()}`;
      const uploaded = await uploadToYoutube(blob, title);
      setStatus("Unlisted on YouTube");
      setStatusHref(`https://youtu.be/${uploaded.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "YouTube upload failed.";
      setError(
        /Failed to fetch|NetworkError|CORS/i.test(message)
          ? "YouTube blocks browser uploads on the live site. Use local npm run dev (Vite proxies the upload), or the full LifeHub app."
          : message,
      );
    } finally {
      setUploading(null);
    }
  }

  function download() {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `speaking-${Date.now()}.webm`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        You should see yourself as soon as Record starts. After Stop, upload to Drive and/or YouTube
        (unlisted). YouTube needs a second Google consent, and YouTube Data API v3 enabled on the
        same Cloud project.
      </p>
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      {status ? (
        <p className="text-sm text-cyan">
          {statusHref ? (
            <a href={statusHref} target="_blank" rel="noreferrer" className="underline">
              {status}
            </a>
          ) : (
            status
          )}
        </p>
      ) : null}
      <video
        ref={videoRef}
        autoPlay
        muted={live}
        playsInline
        controls={!live && Boolean(url)}
        className="aspect-video w-full max-w-xl rounded-2xl border border-white/10 bg-black object-cover"
      />
      <div className="flex flex-wrap gap-2">
        {recording ? (
          <button type="button" onClick={stop} className="rounded-xl bg-rose px-4 py-2 text-sm font-semibold text-ink">
            Stop
          </button>
        ) : (
          <button type="button" onClick={() => void start()} className="rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-ink">
            Record
          </button>
        )}
        <button
          type="button"
          disabled={!blob || !connected || Boolean(uploading)}
          onClick={() => void uploadDrive()}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
        >
          {uploading === "drive" ? "Uploading…" : "Upload to Drive"}
        </button>
        <button
          type="button"
          disabled={!blob || !connected || Boolean(uploading)}
          onClick={() => void uploadYoutube()}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
        >
          {uploading === "youtube" ? "Uploading…" : "Upload to YouTube"}
        </button>
        <button
          type="button"
          disabled={!url}
          onClick={download}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
        >
          Download
        </button>
      </div>
    </div>
  );
}
