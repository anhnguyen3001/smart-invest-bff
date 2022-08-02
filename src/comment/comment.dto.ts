import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CoreQueryDto, ResponseWithPagination } from 'common/dto';
import { UserInListDto } from 'user/user.dto';

export enum ExchangeEnum {
  HSX = 'HSX',
  UPCOM = 'UPCOM',
  HNX = 'HNX',
}

export class CommentDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  commentId: number;

  @Expose()
  @ApiProperty({ type: [UserInListDto] })
  @Type(() => UserInListDto)
  user?: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  content: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  createdAt: string;
}

export class GetCommentsQuery extends CoreQueryDto {
  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  companyId: number;
}

export class GetCommentsResponse extends ResponseWithPagination {
  @Expose()
  @ApiProperty({ type: [CommentDto] })
  @Type(() => CommentDto)
  comments: CommentDto[];
}

export class PostCommentRequest {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Type(() => Number)
  companyId: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  content: string;
}

export class PostCommentResponse {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Type(() => Number)
  commentId: number;
}
