import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket.gateway';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmCoreModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postrgres',
      database: 'chatroom',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
