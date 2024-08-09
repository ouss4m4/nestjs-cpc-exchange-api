import { CampaignCountry } from 'src/campaigns/entities/campaign-countries.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(
    () => CampaignCountry,
    (campaignCountry) => campaignCountry.country,
  )
  campaignCountries: CampaignCountry[];
}
