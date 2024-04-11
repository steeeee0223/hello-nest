import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AuthGuard } from '@steeeee/my-lib/guards';
import {
  ErrorsInterceptor,
  TransformInterceptor,
} from '@steeeee/my-lib/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
