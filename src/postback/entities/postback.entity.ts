import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Click } from 'src/click/entities/click.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Lander } from 'src/landers/entities/lander.entity';
import { TrafficSource } from 'src/traffic-sources/entities/traffic-source.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Postback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'click_id' })
  clickId: number;

  @Column({ type: 'uuid', name: 'transaction_id' })
  transactionId: string;

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
  revenue: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'ip', type: 'varchar' })
  ip: string;

  @Column({ name: 'ua', type: 'varchar' })
  ua: string;

  @Column({ name: 'status', type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToOne(() => Client, (cl) => cl.id)
  @JoinColumn({
    name: 'publisher_id',
    foreignKeyConstraintName: 'fk_postback_publisher',
  })
  publisher: Client;

  @ManyToOne(() => TrafficSource, (ts) => ts.id)
  @JoinColumn({
    name: 'traffic_source_id',
    foreignKeyConstraintName: 'fk_postback_traffic_source',
  })
  trafficSource: TrafficSource;

  @ManyToOne(() => Client, (cl) => cl.id)
  @JoinColumn({
    name: 'advertiser_id',
    foreignKeyConstraintName: 'fk_postback_advertiser',
  })
  advertiser: Client;

  @ManyToOne(() => Campaign, (cmp) => cmp.id)
  @JoinColumn({
    name: 'campaign_id',
    foreignKeyConstraintName: 'fk_postback_campaign',
  })
  campaign: Campaign;

  @ManyToOne(() => Lander, (lander) => lander.id)
  @JoinColumn({
    name: 'lander_id',
    foreignKeyConstraintName: 'fk_postback_lander',
  })
  lander: Lander;

  // @ManyToOne(() => Click, (click) => click.uuid)
  // @JoinColumn({
  //   name: 'transaction_id',
  //   foreignKeyConstraintName: 'fk_postback_click_uuid',
  // })
  // clickUuid: Click;

  @ManyToOne(() => Click, (click) => click.id)
  @JoinColumn({
    name: 'click_id',
    foreignKeyConstraintName: 'fk_postback_click_id',
  })
  click: Click;
}
