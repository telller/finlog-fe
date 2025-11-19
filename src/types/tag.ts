import type { BaseEntity } from './common.ts';

export interface Tag extends BaseEntity {
  name: string;
  order: number;
  color: string;
}
