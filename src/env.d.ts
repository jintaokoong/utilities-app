/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_URL: string;
  readonly VITE_AUTHOR_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
