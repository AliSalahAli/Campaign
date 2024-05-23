import { PaginatedResult } from 'src/modules/common/interfaces/paginate.interface';
import { Campaign } from '../entity/campaign.entity';
import { CampaignFilterDTO } from '../dto/campaign.filter.dto';

export interface ICampaignRepository {
  findByAdId(campaignId: number): Promise<Campaign>;
  findAll(): Promise<Campaign[]>;
  filter(query: CampaignFilterDTO, page: number, limit: number): Promise<PaginatedResult<Campaign>>;
}
