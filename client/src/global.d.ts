declare namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_URL: string;
    readonly API_URL: string;
    readonly API_URL_HOST: string;
  }
}
