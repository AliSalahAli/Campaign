import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CampaignDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  ad_id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  xyz_campaign_id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  fb_campaign_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  age: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  interest: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  impressions: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  clicks: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  spent: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  total_conversion: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  approved_conversion: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
