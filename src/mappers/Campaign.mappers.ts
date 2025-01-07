import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { ICampaign } from 'src/shared/types';
export const mapCampaignModelToDTO = (campaign: Campaign): ICampaign => {
  return {
    ...campaign,
    countries: campaign.countries.map(({ country }) => country),
  };
};
