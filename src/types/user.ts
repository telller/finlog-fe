import type { BaseEntity } from './common.ts';

export interface User extends BaseEntity {
  username: string;
  email: number;
}
