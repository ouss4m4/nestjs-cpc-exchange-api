import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'iso' })
  iso: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'nicename' })
  niceName: string;
}
