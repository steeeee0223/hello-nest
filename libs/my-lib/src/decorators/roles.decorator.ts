import { Reflector } from '@nestjs/core';

export type Role = 'admin' | 'user';
export const Roles = Reflector.createDecorator<Role[]>();
