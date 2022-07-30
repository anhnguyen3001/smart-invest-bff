import {
  ApiProperty,
  ApiResponseProperty,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BASE_SORT_BY, QueryCoreDto, ResponseWithPagination } from 'common/dto';

export class RoleDto {
  @Expose()
  @ApiProperty({
    type: 'number',
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: 'string',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: 'string',
  })
  code: string;
}

const ROLE_SORT_BY = BASE_SORT_BY;
export class SearchRoleDto extends QueryCoreDto {
  @ApiProperty({ enum: ROLE_SORT_BY, default: 'id', required: false })
  @IsIn(ROLE_SORT_BY)
  @IsOptional()
  sortBy?: string = 'id';
}

export class SearchRolesResponse extends ResponseWithPagination {
  @Expose()
  @ApiResponseProperty({ type: [RoleDto] })
  @Type(() => RoleDto)
  roles: RoleDto[];
}

export class CreateRoleDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  code: string;
}

export class UpdateRoleDto extends PartialType(
  PickType(CreateRoleDto, ['name']),
) {
  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  permissionIds?: number[];
}
