import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreQueryDto, ResponseWithPagination, SortEnum } from 'common/dto';
import { ExchangeEnum } from 'company/company.dto';

export class FavoriteListDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  name: string;
}

enum TickSortBy {
  TOTAL_VOLUME = 'total_volume',
  PERCENT_CHANGE = 'percent_change',
}

export class GetTickersQuery extends CoreQueryDto {
  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ enum: ExchangeEnum, required: false })
  @IsEnum(ExchangeEnum)
  @IsOptional()
  exchange?: ExchangeEnum;

  @ApiProperty({ enum: SortEnum, required: false })
  @IsEnum(SortEnum)
  @IsOptional()
  sort?: SortEnum;

  @ApiProperty({ enum: TickSortBy, required: false })
  @IsEnum(TickSortBy)
  @IsOptional()
  sortBy?: TickSortBy;
}

export class GetTickersNotInFavoriteQuery extends CoreQueryDto {
  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  listId: number;
}

export class TickerDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  companyId: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  companyName: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  symbol: string;

  @Expose()
  @ApiProperty({ enum: ExchangeEnum, type: 'enum' })
  exchange: ExchangeEnum;

  @Expose()
  @ApiProperty({ type: 'number' })
  lastPercentChange: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  lastPriceChange: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  lastClosePrice: number;
}

export class GetTickersResponse extends ResponseWithPagination {
  @Expose()
  @ApiProperty({ type: [TickerDto] })
  @Type(() => TickerDto)
  tickers: TickerDto[];
}

enum Period {
  '1M' = '1m',
  '1Y' = '1y',
}

export class GetTickerPriceQuery {
  @ApiProperty({ type: 'string' })
  @IsString()
  symbol: string;

  @ApiProperty({ enum: Period, required: false })
  @IsEnum(Period)
  @IsOptional()
  period?: Period = Period['1Y'];
}

export class TickerPrice {
  @Expose()
  @ApiProperty({ type: 'string' })
  date: string;

  @Expose()
  @ApiProperty({ type: 'number' })
  adjPrice: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  closePrice: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  totalVolume: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  totalValue: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  priceChange: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  percentChannumbere;

  @Expose()
  @ApiProperty({ type: 'number' })
  openPrice: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  maxPrice: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  minPrice: number;
}

export class GetTickerPriceResponse {
  @Expose()
  @ApiProperty({ type: [TickerPrice] })
  @Type(() => TickerPrice)
  tickerPrices: TickerPrice[];
}

export class GetTickerPredictedPriceQuery {
  @ApiProperty({ type: 'string' })
  @IsString()
  symbol: string;
}

export class GetTickerPredictedPriceResponse {
  @Expose()
  @ApiResponseProperty({ type: [Number] })
  @Type(() => Number)
  tickerPrices: number[];
}
