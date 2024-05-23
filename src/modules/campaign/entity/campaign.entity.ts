// src/campaign/campaign.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'campaign',
})
export class Campaign {
  @PrimaryGeneratedColumn()
  ad_id: number;

  @Column({ nullable: false })
  fb_campaign_id: number;

  @Column({ nullable: false })
  xyz_campaign_id: number;

  @Column({ nullable: false })
  age: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  interest: number;

  @Column({ nullable: false })
  impressions: number;

  @Column({ nullable: false })
  clicks: number;

  @Column('float', { nullable: false })
  spent: number;

  @Column({ nullable: false })
  total_conversion: number;

  @Column({ nullable: false })
  approved_conversion: number;

  @Column({ type: 'date', nullable: false })
  start_date: string;

  @Column({ type: 'date', nullable: false })
  end_date: string;
}
