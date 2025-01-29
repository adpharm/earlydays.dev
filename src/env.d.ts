/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly REGION: string;
  readonly SECRET_ACCESS_KEY: string;
  readonly ACCESS_KEY: string;
  readonly BUCKET_NAME: string;
  readonly BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
