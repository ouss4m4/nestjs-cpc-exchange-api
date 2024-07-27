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

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'contact_mail' })
  contactMail: string;

  @Column({ name: 'finance_mail', nullable: true })
  financeMail: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

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
