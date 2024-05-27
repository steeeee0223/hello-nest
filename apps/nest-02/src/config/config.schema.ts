import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.number({ coerce: true }).int().min(0).max(65535),
  ENV: z.enum(['TEST', 'PROD', 'DEV']),
  DATABASE_URL: z.string().min(1),
});
export type EnvSchema = z.infer<typeof envSchema>;
