import { z } from "zod";

/**
 * Server environment variables
 *
 * Those prefixed with `PUBLIC_` are available to the client
 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  // SESSION_SECRET: z.string().min(1),
  /**
   * The URL of the database
   */
  DATABASE_URL: z.string().min(1),
  /**
   * Cron secret for vercel (prod only)
   */
  CRON_SECRET: z.string().optional(),
  /**
   * The app environment
   */
  PUBLIC_APP_ENV: z
    .enum(["development", "production", "preview"])
    .default("development"),
  /**
   * The base URL of the app
   */
  PUBLIC_BASE_URL: z.string().min(1),
  /**
   * VERCEL_AUTOMATION_BYPASS_SECRET
   */
  VERCEL_AUTOMATION_BYPASS_SECRET: z.string().optional(),
});

const vercelEnv = process.env.VERCEL_ENV;
const vercelProjectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelBranchUrl = process.env.VERCEL_BRANCH_URL;

const serverEnv = serverEnvSchema.parse({
  ...process.env,
  // https://vercel.com/docs/projects/environment-variables/system-environment-variables
  PUBLIC_BASE_URL:
    vercelEnv === "production"
      ? vercelProjectProductionUrl
      : vercelEnv === "preview"
      ? vercelBranchUrl
      : "localhost:3000",
  PUBLIC_APP_ENV: vercelEnv,
});

export { serverEnv };
