import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '../../../', 'public'), {
    prefix: '/static',
  });

  // 配置session的中间件
  app.use(
    session({
      secret: process.env.SECRET || 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      // cookie: { maxAge: 109000, httpOnly: true },
      rolling: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('前端API')
    .setDescription('供网站和APP调用的服务端API')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3002;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);
}
bootstrap();
