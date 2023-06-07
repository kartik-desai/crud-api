import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class CustomLogger implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    console.log('Request:');
    console.log({
      originalUrl,
      method,
      params,
      query,
      body,
    });

    return next.handle().pipe(
      tap((data) => {
        console.log('Response:');
        console.log({
          statusCode,
          data,
        });
      }),
    );
  }
}
