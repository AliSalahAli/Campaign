import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { CommonModule } from './modules/common/common.module';
import { CampaignModule } from './modules/campaign/campaign.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService, CampaignModule],
})
export class AppModule {}
