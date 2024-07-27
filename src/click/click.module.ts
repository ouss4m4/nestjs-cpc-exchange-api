import { Module } from '@nestjs/common';
import { ClickService } from './services/click.service';
import { ClickController } from './click.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Click } from './entities/click.entity';
import { IpService } from './services/ip.service';
import { UserAgentService } from './services/userAgent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Click])],
  controllers: [ClickController],
  providers: [ClickService, IpService, UserAgentService],
})
export class ClickModule {}
