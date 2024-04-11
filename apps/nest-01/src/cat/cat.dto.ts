import { z } from 'zod';

export class QueryCatDto {
  readonly breed?: string;
  readonly sex?: 'm' | 'f';
}

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
    sex: z.enum(['m', 'f']),
  })
  .required();
export type CreateCatDto = z.infer<typeof createCatSchema>;

export class UpdateCatDto {}
