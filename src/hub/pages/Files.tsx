import { useEffect, useState } from "react";
import { googleEnabled, listHubFiles, storedAccessToken } from "../google";

type DriveFile = { id: string; name: string; webViewLink?: string };

export function FilesPage() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const connected = googleEnabled() && Boolean(storedAccessToken());

  useEffect(() => {
    if (!connected) return;
    setLoading(true);
    listHubFiles()
      .then(setFiles)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not list Drive."))
      .finally(() => setLoading(false));
  }, [connected]);

  if (!connected) {
    return <p className="text-sm text-white/50">Connect Google to list files in your Drive LifeHub folder.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50">Files this room created in Drive — recordings and uploads. Not your whole Drive.</p>
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      {loading ? <p className="text-sm text-white/45">Loading Drive…</p> : null}
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.id} className="glass rounded-xl px-4 py-3 text-sm">
            {file.webViewLink ? (
              <a href={file.webViewLink} target="_blank" rel="noreferrer" className="text-cyan hover:underline">
                {file.name}
              </a>
            ) : (
              file.name
            )}
          </li>
        ))}
        {!loading && files.length === 0 ? <li className="text-sm text-white/45">Folder is empty.</li> : null}
      </ul>
    </div>
  );
}
