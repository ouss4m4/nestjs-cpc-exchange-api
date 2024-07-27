import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './infra/redis/redis.module';
import { LandersModule } from './landers/landers.module';
import { Lander } from './landers/entities/lander.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '61990',
      database: 'nestjs',
      entities: [Client, User, Lander],
      synchronize: true,
    }),
    RedisModule,
    UserModule,
    ClientsModule,
    AuthModule,
    RedisModule,
    LandersModule,
  ],
})
export class AppModule {}
