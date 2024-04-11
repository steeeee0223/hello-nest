import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('[itc:logging] Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`[itc:logging] After... ${Date.now() - now}ms`)),
      );
  }
}
