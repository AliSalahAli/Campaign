import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entity/campaign.entity';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from './campaign.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [
    CampaignService,
    {
      provide: 'Campaign_REPO',
      useClass: CampaignRepository,
    },
  ],
  controllers: [CampaignController],
})
export class CampaignModule {}
