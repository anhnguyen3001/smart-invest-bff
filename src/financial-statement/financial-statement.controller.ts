import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import { ServerApiResponseInterface } from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import {
  GetFinancialStatementsQuery,
  GetFinancialStatementsResponse,
} from './financial-statement.dto';

@ApiTags('Financial Statement')
@Controller({
  path: 'financial-statements',
  version: configService.getValue('API_VERSION'),
})
export class FinancialStatementController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Get financial statements of company',
  })
  @ApiOkBaseResponse(GetFinancialStatementsResponse, {
    description: 'Get financial statements successfully',
  })
  async getFinancialStatements(@Query() query: GetFinancialStatementsQuery) {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/financial-statements`, { params: query })
      .then((res) => res.data);
    return getBaseResponse<GetFinancialStatementsResponse>(
      res,
      GetFinancialStatementsResponse,
    );
  }
}
