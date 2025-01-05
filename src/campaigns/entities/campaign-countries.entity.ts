import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Country } from 'src/countries/entities/country.entity';

@Entity('campaign_countries')
export class CampaignCountry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.countries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => Country, (country) => country.campaignCountries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
