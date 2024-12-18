import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './infra/redis/redis.module';
import { LandersModule } from './landers/landers.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { TrafficSourcesModule } from './traffic-sources/traffic-sources.module';
import { ClickModule } from './click/click.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { PostbackModule } from './postback/postback.module';
import { QueuesModule } from './queues/queues.module';
import { BullModule } from '@nestjs/bullmq';
import { CountriesModule } from './countries/countries.module';
import { ClickRollupModule } from './click-rollup/click-rollup.module';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from 'src/db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...AppDataSource.options, // Reuse the options from data-source.ts
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    RedisModule,
    TasksModule,
    UserModule,
    ClientsModule,
    AuthModule,
    LandersModule,
    CampaignsModule,
    TrafficSourcesModule,
    ClickModule,
    SharedModule,
    PostbackModule,
    QueuesModule,
    CountriesModule,
    ClickRollupModule,
  ],
})
export class AppModule {}
