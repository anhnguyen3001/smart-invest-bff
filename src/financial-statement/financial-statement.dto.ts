import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CoreQueryDto, ResponseWithPagination } from 'common/dto';

export enum ExchangeEnum {
  HSX = 'HSX',
  UPCOM = 'UPCOM',
  HNX = 'HNX',
}

export class FinancialStatementDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  name: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  period: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  path: string;
}

export class GetFinancialStatementsQuery extends CoreQueryDto {
  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  companyId: number;

  @ApiProperty({ type: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  year?: number;
}

export class GetFinancialStatementsResponse extends ResponseWithPagination {
  @Expose()
  @ApiProperty({ type: [FinancialStatementDto] })
  @Type(() => FinancialStatementDto)
  financialStatements: FinancialStatementDto[];
}
