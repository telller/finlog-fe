import type { PaginationDto, ExpenseStatFilterDto } from '@src/dto';

export interface GetExpenseStatListDto extends ExpenseStatFilterDto, PaginationDto {}
