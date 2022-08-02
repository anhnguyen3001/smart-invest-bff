import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CoreQueryDto, ResponseWithPagination } from 'common/dto';

export enum ExchangeEnum {
  HSX = 'HSX',
  UPCOM = 'UPCOM',
  HNX = 'HNX',
}

export class NewsDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  newsId: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  title: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  path: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  content: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  time: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  symbole: string;
}

export class GetListNewsQuery extends CoreQueryDto {
  @ApiProperty({ type: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  companyId?: number;
}

export class GetListNewsResponse extends ResponseWithPagination {
  @Expose()
  @ApiProperty({ type: [NewsDto] })
  @Type(() => NewsDto)
  news: NewsDto[];
}