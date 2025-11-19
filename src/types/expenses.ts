import type {BaseEntity} from "./common.ts";

export interface Expense extends BaseEntity{
    amount: number;
    description: string;
    tagId: string;
    spendAt: string;
}