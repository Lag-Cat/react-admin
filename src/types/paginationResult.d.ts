interface PaginationResult<T> {
  countId: string;
  current: number;
  hitCount: boolean;
  maxLimit: number;
  optimizeCountSql: true;
  orders: any[];
  pages:number;
  records:T[];
  searchCount:boolean;
  size:number;
  total:number;
}
