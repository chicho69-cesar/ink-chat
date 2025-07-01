/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_WS_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
