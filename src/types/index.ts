export type ListResponse<T> = {
    code: string;
    messageKeys: string;
    message: string;    
    count: number;
    result: T[]; 
  };

  export type Response<T> = {
    code: string;
    messageKeys: string;
    message: string;    
    result: T;
  };
  