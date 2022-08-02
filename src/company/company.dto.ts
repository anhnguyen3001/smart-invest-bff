import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum ExchangeEnum {
  HSX = 'HSX',
  UPCOM = 'UPCOM',
  HNX = 'HNX',
}

export class CompanyDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  companyId: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  name: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  symbol: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  major: string;

  @Expose()
  @ApiProperty({ enum: ExchangeEnum, type: 'enum' })
  exchange: ExchangeEnum;

  @Expose()
  @ApiProperty({ type: 'string' })
  introduction: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  firstTradingDate: string;

  @Expose()
  @ApiProperty({ type: 'number' })
  firstClosePrice: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  firstSharesQuantity: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  eps: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  dilutedEps: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  pe: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  bvps: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  listedShares: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  outstandingShares: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  marketCap: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  lastClosePrice: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  lastPercentChange: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  lastPriceChange: number;
}
