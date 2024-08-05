import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/entities/user.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './infra/redis/redis.module';
import { LandersModule } from './landers/landers.module';
import { Lander } from './landers/entities/lander.entity';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaign } from './campaigns/entities/campaign.entity';
import { TrafficSourcesModule } from './traffic-sources/traffic-sources.module';
import { TrafficSource } from './traffic-sources/entities/traffic-source.entity';
import { ClickModule } from './click/click.module';
import { Click } from './click/entities/click.entity';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { PostbackModule } from './postback/postback.module';
import { Postback } from './postback/entities/postback.entity';
import { QueuesModule } from './queues/queues.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '61990',
      database: 'nestjs',
      entities: [
        Client,
        User,
        Campaign,
        Lander,
        TrafficSource,
        Click,
        Postback,
      ],
      synchronize: true,
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
    RedisModule,
    LandersModule,
    CampaignsModule,
    TrafficSourcesModule,
    ClickModule,
    SharedModule,
    PostbackModule,
    QueuesModule,
  ],
})
export class AppModule {}
