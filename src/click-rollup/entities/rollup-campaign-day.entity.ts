import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Lander } from 'src/landers/entities/lander.entity';
import { TrafficSource } from 'src/traffic-sources/entities/traffic-source.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique([
  'statDate',
  'publisherId',
  'trafficSourceId',
  'advertiserId',
  'campaignId',
  'landerId',
])
export class RollupCampaignDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stat_date', type: 'date' })
  statDate: string;

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

  @Column({ name: 'clicks', type: 'integer', default: 0 })
  clicks: number;

  @Column({ name: 'revenue', type: 'varchar', default: 0 })
  revenue: string;

  @Column({ name: 'payout', type: 'varchar', default: 0 })
  payout: string;

  @ManyToOne(() => Client, (cl) => cl.id)
  @JoinColumn({
    name: 'publisher_id',
    foreignKeyConstraintName: 'fk_rollup_day_publisher',
  })
  publisher: Client;

  @ManyToOne(() => TrafficSource, (ts) => ts.id)
  @JoinColumn({
    name: 'traffic_source_id',
    foreignKeyConstraintName: 'fk_rollup_day_traffic_source',
  })
  trafficSource: TrafficSource;

  @ManyToOne(() => Client, (cl) => cl.id)
  @JoinColumn({
    name: 'advertiser_id',
    foreignKeyConstraintName: 'fk_rollup_day_advertiser',
  })
  advertiser: Client;

  @ManyToOne(() => Campaign, (cmp) => cmp.id)
  @JoinColumn({
    name: 'campaign_id',
    foreignKeyConstraintName: 'fk_rollup_day_campaign',
  })
  campaign: Campaign;

  @ManyToOne(() => Lander, (lander) => lander.id)
  @JoinColumn({
    name: 'lander_id',
    foreignKeyConstraintName: 'fk_rollup_day_lander',
  })
  lander: Lander;
}
