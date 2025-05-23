import { Client } from 'src/clients/entities/client.entity';
import { Lander } from 'src/landers/entities/lander.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CampaignCountry } from './campaign-countries.entity';
import { Device } from 'src/device/entities/device.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'advertiser_id' })
  advertiserId: number;

  @Column({ name: 'lander_id' })
  landerId: number;

  @Column({ type: 'json' })
  device: Device[];

  @Column({ default: 1, type: 'tinyint' })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Lander, (lander) => lander.id)
  @JoinColumn({
    name: 'lander_id',
    foreignKeyConstraintName: 'fk_lander_campaign',
  })
  lander: Lander;

  @ManyToOne(() => Client, (client) => client.campaigns)
  @JoinColumn({
    name: 'advertiser_id',
    foreignKeyConstraintName: 'fk_campaign_advertiser',
  })
  advertiser: Client;

  @OneToMany(
    () => CampaignCountry,
    (campaignCountry) => campaignCountry.campaign,
    { cascade: true, onDelete: 'CASCADE' },
  )
  countries: CampaignCountry[];
}
