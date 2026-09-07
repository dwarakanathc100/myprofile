import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      // YouTube's upload API has no CORS. Local LifeHub talks to this same-origin
      // path; Vite forwards it to Google with the user's OAuth token.
      "/google-youtube-upload": {
        target: "https://www.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google-youtube-upload/, "/upload/youtube/v3/videos"),
      },
    },
  },
});
