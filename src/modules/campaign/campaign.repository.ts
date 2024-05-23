import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICampaignRepository } from './interface/campaign.interface';
import { Campaign } from './entity/campaign.entity';
import { PaginatedResult } from '../common/interfaces/paginate.interface';
import { paginate } from '../common/functions/paginate.function';
import { CampaignFilterDTO } from './dto/campaign.filter.dto';
import { formatDate } from '../common/functions/format-date.function';

@Injectable()
export class CampaignRepository implements ICampaignRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async findByAdId(adId: number): Promise<Campaign> {
    const result = await this.campaignRepository.findOne({
      where: { ad_id: adId },
    });
    return result;
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.find();
  }

  async filter(
    query: CampaignFilterDTO,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResult<Campaign>> {
    try {
      const queryBuilder =
        this.campaignRepository.createQueryBuilder('campaign');

      if (query.start_date && query.end_date) {
        queryBuilder.andWhere(
          '(campaign.start_date >= :start_date AND campaign.end_date <= :end_date)',
          {
            start_date: formatDate(query.start_date),
            end_date: formatDate(query.end_date),
          },
        );
      } else if (query.start_date) {
        queryBuilder.where('campaign.start_date >= :start_date', {
          start_date: formatDate(query.start_date),
        });
      } else if (query.end_date) {
        queryBuilder.where('campaign.end_date <= :end_date', {
          end_date: formatDate(query.end_date),
        });
      }
      Object.entries(query).forEach(([key, value]) => {
        if (value && key !== 'start_date' && key !== 'end_date') {
          queryBuilder.andWhere(`campaign.${key} = :${key}`, { [key]: value });
        }
      });

      if (page && limit) {
        return await paginate<Campaign>(queryBuilder, page, limit);
      } else {
        const campaigns = await queryBuilder.getMany();
        return { data: campaigns, totalCount: campaigns.length };
      }
    } catch (error) {
      Logger.warn(error);
    }
  }
}
