/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production';
  readonly OCR_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
