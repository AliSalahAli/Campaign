// src/campaign/campaign.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Campaign } from './entity/campaign.entity';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CampaignDTO } from './dto/campaign.dto';
import { PaginatedResultDTO } from '../common/dto/paginate.dto';
import { CampaignFilterDTO } from './dto/campaign.filter.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  @ApiOkResponse({ type: [CampaignDTO] })
  @ApiNoContentResponse()
  async findAll(): Promise<Campaign[]> {
    return await this.campaignService.findAll();
  }
  @Get(':id')
  @ApiOkResponse({ type: [CampaignDTO] })
  @ApiNoContentResponse()
  async getById(@Param('id') id: number): Promise<Campaign> {
    return await this.campaignService.getById(id);
  }

  @Get('search')
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'age', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'fb_campaign_id', required: false })
  @ApiQuery({ name: 'xyz_campaign_id', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'interest', required: false })
  @ApiQuery({ name: 'impressions', required: false })
  @ApiQuery({ name: 'clicks', required: false })
  @ApiQuery({ name: 'spent', required: false })
  @ApiQuery({ name: 'ad_id', required: false })
  @ApiQuery({ name: 'total_conversion', required: false })
  @ApiQuery({ name: 'approved_conversion', required: false })
  @ApiOkResponse({ type: [PaginatedResultDTO<CampaignDTO>] })
  async search(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('age') age: string,
    @Query('fb_campaign_id') fbCampaingId: number,
    @Query('xyz_campaign_id') xyzCampaignId: number,
    @Query('gender') gender: string,
    @Query('interest') interest: number,
    @Query('impressions') impressions: number,
    @Query('clicks') clicks: number,
    @Query('spent') spent: number,
    @Query('ad_id') adId: number,
    @Query('total_conversion') totalConversion: number,
    @Query('approved_conversion') approvedConversion: number,
  ) {
    const filter = new CampaignFilterDTO();
    filter.start_date = startDate || undefined;
    filter.end_date = endDate || undefined;
    filter.age = age || undefined;
    filter.fb_campaign_id = fbCampaingId || undefined;
    filter.xyz_campaign_id = xyzCampaignId || undefined;
    filter.gender = gender || undefined;
    filter.interest = interest || undefined;
    filter.impressions = impressions || undefined;
    filter.clicks = clicks || undefined;
    filter.spent = spent || undefined;
    filter.ad_id = adId || undefined;
    filter.total_conversion = totalConversion || undefined;
    filter.approved_conversion = approvedConversion || undefined;
    return await this.campaignService.search(filter, page, limit);
  }
}
