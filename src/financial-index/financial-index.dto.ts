import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FinancialIndexDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  name: string;

  @Expose()
  @ApiProperty({ type: 'number' })
  value: number;

  @Expose()
  @ApiProperty({ type: 'number' })
  year: number;
}

export class GetFinancialIndexesQuery {
  @ApiProperty({ type: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  companyId: number;
}

export class GetFinancialIndexesResponse {
  @Expose()
  @ApiProperty({ type: [FinancialIndexDto] })
  @Type(() => FinancialIndexDto)
  financialIndexes: FinancialIndexDto[];
}
