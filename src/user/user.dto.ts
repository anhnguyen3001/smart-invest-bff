import { ApiProperty, ApiResponseProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PATTERN_VALIDATION } from 'common/constants/validation';
import { BASE_SORT_BY, QueryCoreDto, ResponseWithPagination } from 'common/dto';
import { PasswordNotMatchException } from './user.exception';

enum LoginMethodEnum {
  local = 'local',
  facebook = 'facebook',
  google = 'google',
}

export class UserDto {
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
}

export class UpdatePasswordDto {
  @ApiProperty({ type: 'string' })
  @Matches(PATTERN_VALIDATION.password)
  newPassword: string;

  @ApiProperty({ type: 'string' })
  @Matches(PATTERN_VALIDATION.password)
  confirmPassword: string;

  validate() {
    if (this.newPassword !== this.confirmPassword) {
      throw new PasswordNotMatchException();
    }
  }
}

export class ChangePasswordDto extends UpdatePasswordDto {
  @ApiProperty({ type: 'string' })
  @Matches(PATTERN_VALIDATION.password)
  oldPassword: string;
}

export class UpdateProfileDto {
  @ApiProperty({ type: 'string' })
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ type: 'string' })
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  @IsOptional()
  avatar?: string;
}

export class UserResponseDto {
  @Expose()
  @ApiResponseProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto;
}

const USER_SORT_BY = BASE_SORT_BY;
export class SearchUserDto extends QueryCoreDto {
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
  @Matches(PATTERN_VALIDATION.email)
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
  @Matches(PATTERN_VALIDATION.password)
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
