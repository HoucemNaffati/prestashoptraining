import { applyDecorators, Header, HttpCode } from '@nestjs/common';

export const GetHeaders = (statusCode: number) =>
  applyDecorators(
    Header('Cache-control', 'none'),
    Header('Content-Type', 'application/json'),
    Header('Accept-Charset', 'utf-8'),
    HttpCode(statusCode),
  );
