import { Client } from 'src/clients/entities/client.entity';
import { Lander } from 'src/landers/entities/lander.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'advertiser_id' })
  advertiserId: number;

  @ManyToOne(() => Client, (client) => client.campaigns)
  @JoinColumn({
    name: 'advertiser_id',
    foreignKeyConstraintName: 'fk_campaign_advertiser',
  })
  advertiser: Client;

  @Column({ name: 'lander_id' })
  landerId: number;

  @OneToOne(() => Lander, (lander) => lander.id)
  @JoinColumn({
    name: 'lander_id',
    foreignKeyConstraintName: 'fk_lander_campaign',
  })
  lander: Lander;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
