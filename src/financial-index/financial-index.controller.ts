import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import { ServerApiResponseInterface } from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import {
  GetFinancialIndexesQuery,
  GetFinancialIndexesResponse,
} from './financial-index.dto';

@ApiBearerAuth()
@ApiTags('Financial Index')
@Controller({
  path: 'financial-indexes',
  version: configService.getValue('API_VERSION'),
})
export class FinancialIndexController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Get financial indexes of company',
  })
  @ApiOkBaseResponse(GetFinancialIndexesResponse, {
    description: 'Get financial indexes successfully',
  })
  async getFinancialIndexes(@Query() query: GetFinancialIndexesQuery) {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/financial-indexes`, { params: query })
      .then((res) => res.data);
    return getBaseResponse<GetFinancialIndexesResponse>(
      res,
      GetFinancialIndexesResponse,
    );
  }
}
