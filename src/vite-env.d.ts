/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL?: string;
  readonly APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
