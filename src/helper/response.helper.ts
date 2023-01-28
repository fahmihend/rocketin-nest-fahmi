import { HttpException } from '@nestjs/common';
import { Pagination, PaginationOptions } from './pagination.helper';

export class Response {
  message: string;
  data: any;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

export const response = (message: string, data: any = null) => new Response(message, data);

export const responsePage = (results: any[], total: number, paginationOptions: PaginationOptions) => {
  return new Pagination(results, total, paginationOptions);
};

export const responsePageEmpty = (paginationOptions: PaginationOptions) => {
  return new Pagination([], 0, paginationOptions);
};

export const responseError = (message: string, code: number = 400) => {
  return Promise.reject(new HttpException({ message: message }, code));
};
