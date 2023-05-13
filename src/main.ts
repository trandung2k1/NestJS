import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as colors from 'colors';
import * as morgan from 'morgan'
async function start() {
  const port: number = 3000;
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  const whitelist: string[] = ['http://localhost:5500', 'http://localhost:5173'];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        console.log(colors.red(`Blocked cors for: ${origin}`))
        // callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  });
  app.use(morgan('combined'))
  await app.listen(port);
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router.stack
    .map(layer => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter(item => item !== undefined);
  console.log("Routes: ", availableRoutes)
  console.log(colors.green(`Server listen on http://localhost:${port}`))
}
start();
