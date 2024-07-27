import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Lander } from 'src/landers/entities/lander.entity';
import { TrafficSource } from 'src/traffic-sources/entities/traffic-source.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'publisher_id' })
  publisherId: number;

  @Column({ name: 'traffic_source_id' })
  trafficSourceId: number;

  @Column({ name: 'advertiser_id' })
  advertiserId: number;

  @Column({ name: 'campaign_id' })
  campaignId: number;

  @Column({ name: 'lander_id' })
  landerId: number;

  @Column({ name: 'revenue', type: 'varchar', default: 0 })
  revenue: number;

  @Column({ name: 'payout', type: 'varchar', default: 0 })
  payout: number;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'redirect' })
  redirect: string;

  @Column({ name: 'ip', type: 'varchar' })
  ip: string;

  @Column({ name: 'ua', type: 'varchar' })
  ua: string;

  @Column({ name: 'status', type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => Client, (cl) => cl.id)
  @JoinColumn({
    name: 'publisher_id',
    foreignKeyConstraintName: 'fk_click_publisher',
  })
  publisher: Client;

  @OneToOne(() => TrafficSource, (ts) => ts.id)
  @JoinColumn({
    name: 'traffic_source_id',
    foreignKeyConstraintName: 'fk_click_traffic_source',
  })
  trafficSource: TrafficSource;

  @OneToOne(() => Client, (cl) => cl.id)
  @JoinColumn({
    name: 'advertiser_id',
    foreignKeyConstraintName: 'fk_click_advertiser',
  })
  advertiser: Client;

  @OneToOne(() => Campaign, (cmp) => cmp.id)
  @JoinColumn({
    name: 'campaign_id',
    foreignKeyConstraintName: 'fk_click_campaign',
  })
  campaign: Campaign;

  @OneToOne(() => Lander, (lander) => lander.id)
  @JoinColumn({
    name: 'lander_id',
    foreignKeyConstraintName: 'fk_click_lander',
  })
  lander: Lander;
}
