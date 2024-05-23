import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CampaignFilterDTO {
  @ApiProperty()
  @IsInt()
  ad_id?: number;

  @ApiProperty()
  @IsInt()
  xyz_campaign_id?: number;

  @ApiProperty()
  @IsInt()
  fb_campaign_id?: number;

  @ApiProperty()
  @IsString()
  age?: string;

  @ApiProperty()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsInt()
  interest?: number;

  @ApiProperty()
  @IsInt()
  impressions?: number;

  @ApiProperty()
  @IsInt()
  clicks?: number;

  @ApiProperty()
  @IsNumber()
  spent?: number;

  @ApiProperty()
  @IsInt()
  total_conversion?: number;

  @ApiProperty()
  @IsInt()
  approved_conversion?: number;

  @ApiProperty()
  @IsDateString()
  start_date?: string;

  @ApiProperty()
  @IsDateString()
  end_date?: string;
}
