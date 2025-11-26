export interface ExpenseStatFilterDto {
  fromDateTime: string;
  toDateTime: string;
  tagIds?: string[];
  search?: string;
  amountFrom?: number;
  amountTo?: number;
}
