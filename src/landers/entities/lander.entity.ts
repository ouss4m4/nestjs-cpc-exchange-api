import { Client } from 'src/clients/entities/client.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Lander {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'client_id' })
  clientId: number;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({
    name: 'client_id',
    foreignKeyConstraintName: 'fk_lander_client',
  })
  client: Client;

  @Column({ default: 1, type: 'tinyint' })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
