import { ApiProperty, ApiResponseProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  BaseEntityDto,
  BASE_SORT_BY,
  IAMQueryDto,
  ResponseWithPagination,
} from 'common/dto';
import { PermissionDto } from 'permission/permission.dto';
import { RoleDto } from 'role/role.dto';

enum LoginMethodEnum {
  local = 'local',
  facebook = 'facebook',
  google = 'google',
}

export class UserDto extends BaseEntityDto {
  @Expose()
  @ApiProperty({
    type: 'number',
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: 'string',
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: 'string',
  })
  username: string;

  @Expose()
  @ApiProperty({
    type: 'string',
  })
  password: string;

  @Expose()
  @ApiProperty({
    type: 'string',
  })
  avatar?: string;

  @Expose()
  @ApiProperty({
    type: 'boolean',
  })
  isVerified?: boolean;

  @Expose()
  @ApiProperty({
    enum: LoginMethodEnum,
  })
  method?: LoginMethodEnum;

  @Expose()
  @ApiProperty({
    type: RoleDto,
  })
  @Type(() => RoleDto)
  role?: RoleDto;

  @Expose()
  @ApiProperty({
    type: [PermissionDto],
  })
  @Type(() => PermissionDto)
  permissions?: [PermissionDto];
}

export class UpdateProfileDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  avatar?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  newPassword: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  confirmPassword: string;
}

export class UserResponseDto {
  @Expose()
  @ApiResponseProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto;
}

const USER_SORT_BY = BASE_SORT_BY;
export class SearchUserDto extends IAMQueryDto {
  @ApiProperty({ enum: USER_SORT_BY, default: 'id', required: false })
  @IsIn(USER_SORT_BY)
  @IsOptional()
  sortBy?: string = 'id';

  @ApiProperty({ enum: LoginMethodEnum, required: false })
  @IsIn(Object.values(LoginMethodEnum))
  @IsOptional()
  method?: string;

  @ApiProperty({ type: 'boolean', required: false })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}

export class SearchUsersResponse extends ResponseWithPagination {
  @Expose()
  @ApiResponseProperty({ type: [UserDto] })
  @Type(() => UserDto)
  users: UserDto[];
}

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Max(255)
  @Min(1)
  username: string;

  @ApiProperty({ type: 'boolean', required: false })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  password?: string;

  @ApiProperty({ enum: LoginMethodEnum, required: false })
  @IsEnum(LoginMethodEnum)
  @IsOptional()
  method?: LoginMethodEnum;
}

export class UpdateUserDto extends PickType(CreateUserDto, ['password']) {
  @ApiProperty({ type: 'boolean', required: false })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ type: 'number', required: false })
  @IsNumber()
  @IsOptional()
  roleId?: number;
}
