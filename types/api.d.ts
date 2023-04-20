declare global {
  type BasePageParams<P extends Record<string, any> = unknown> = {
    page: number;
    rows: number;
  } & P;
  interface BaseResult {
    err: number;
    errmsg: string;
    errmsgid: string;
  }
  type BasePageResult<R> = {
    page: number;
    size: number;
    count: number;
    list: R[];
  };
}

export {};
