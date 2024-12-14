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
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/entities/country.entity';
import { CampaignCountry } from './campaigns/entities/campaign-countries.entity';
import { ClickRollupModule } from './click-rollup/click-rollup.module';
import { RollupCampaignDay } from './click-rollup/entities/rollup-campaign-day.entity';
import { RollupCampaignHour } from './click-rollup/entities/rollup-campaign-hour.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Client,
        User,
        Campaign,
        Lander,
        TrafficSource,
        Click,
        Postback,
        Country,
        CampaignCountry,
        RollupCampaignDay,
        RollupCampaignHour,
      ],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false, // This bypasses certificate validation (useful for self-signed certs)
      },
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
    CountriesModule,
    ClickRollupModule,
  ],
})
export class AppModule {}
