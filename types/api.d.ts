declare global {
  type BasePageParams<P extends Record<string, any> = unknown> = {
    page: number;
    rows: number;
  } & P;
  type BaseResult<R> = {
    err: number;
    errmsg: string;
    errmsgid: string;
    data: R;
  };
  type BasePageResult<R> = {
    page: number;
    size: number;
    count: number;
    list: R[];
  };
}

export {};
