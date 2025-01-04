import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { TrafficSource } from 'src/traffic-sources/entities/traffic-source.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ClientType } from '../enum/client.enum';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'enum', enum: ClientType })
  type: ClientType;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'contact_mail' })
  contactMail: string;

  @Column({ name: 'finance_mail', nullable: true })
  financeMail: string;

  @Column({ name: 'status', default: 1, type: 'tinyint' })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => TrafficSource, (ts) => ts.publisher)
  trafficSources: TrafficSource[];

  @OneToMany(() => User, (user) => user.client)
  users: User[];

  @OneToMany(() => Campaign, (campaign) => campaign.advertiser)
  campaigns: Campaign[];
}
