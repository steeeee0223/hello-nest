import { z } from 'zod';

export const createUrlSchema = z.object({ url: z.string().url() }).required();
export type CreateUrlDto = z.infer<typeof createUrlSchema>;

export const shortUrlSchema = z.string().regex(/^[a-zA-Z0-9]{7}$/);
export type ShortUrl = z.infer<typeof shortUrlSchema>;
