import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VerifyTokenMiddleware } from './middlewares/verifyToken';
require("dotenv").config();
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes({
        path: "users",
        method: RequestMethod.GET,
      });
  }
}
