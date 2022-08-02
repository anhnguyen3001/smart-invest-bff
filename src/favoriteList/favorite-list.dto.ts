import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import {
  CoreQueryDto,
  RequestParamId,
  ResponseWithPagination,
} from 'common/dto';

export class FavoriteListDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  name: string;
}

export class GetListFavoriteQuery extends CoreQueryDto {
  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  search?: string;
}

export class GetListFavoriteResponse extends ResponseWithPagination {
  @Expose()
  @ApiProperty({ type: [FavoriteListDto] })
  @Type(() => FavoriteListDto)
  favoriteLists: FavoriteListDto[];
}

export class GetFavoriteListResponse {
  @Expose()
  @ApiProperty({ type: FavoriteListDto })
  @Type(() => FavoriteListDto)
  favoriteList: FavoriteListDto;
}

export class CreateFavoriteListRequest {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;
}

export class UpdateFavoriteListRequest extends PartialType(
  CreateFavoriteListRequest,
) {}

export class DeleteFavoriteTickerParams extends RequestParamId {
  @ApiProperty({ type: 'number' })
  @IsInt()
  @Type(() => Number)
  companyId: number;
}
