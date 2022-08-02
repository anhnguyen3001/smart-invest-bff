import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreQueryDto, ResponseWithPagination } from 'common/dto';
import { TickerDto } from 'ticker/ticker.dto';

export class FavoriteListDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  name: string;
}

export class GetFavoriteTickersQuery extends CoreQueryDto {
  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ type: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  listId?: number;
}

export class GetFavoriteTickersResponse extends ResponseWithPagination {
  @Expose()
  @ApiProperty({ type: [TickerDto] })
  @Type(() => TickerDto)
  tickers: TickerDto[];
}

export class AddFavoriteTickerRequest {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Type(() => Number)
  companyId: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Type(() => Number)
  listId: number;
}
