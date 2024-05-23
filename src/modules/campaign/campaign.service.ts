import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entity/campaign.entity';
import { ICampaignRepository } from './interface/campaign.interface';
import { CampaignFilterDTO } from './dto/campaign.filter.dto';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('Campaign_REPO')
    private readonly campaignRepository: ICampaignRepository,
  ) {}

  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.findAll();
  }

  async getById(id: number): Promise<Campaign> {
    return await this.campaignRepository.findByAdId(id);
  }

  async search(query: CampaignFilterDTO, page: number, limit: number) {
    try {
      return await this.campaignRepository.filter(query, page, limit);
    } catch (error) {
      Logger.error(error);
    }
  }
}
