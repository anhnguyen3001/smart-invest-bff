import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestParamId } from 'common/dto';
import { ServerApiResponseInterface } from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import { CompanyDto } from './company.dto';

@ApiTags('Company')
@Controller({
  path: 'company',
  version: configService.getValue('API_VERSION'),
})
export class CompanyController {
  constructor(private readonly coreService: CoreService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get company by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  async getCompany(@Param() params: RequestParamId) {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/companies/${params.id}`)
      .then((res) => res.data);
    return getBaseResponse<CompanyDto>(res, CompanyDto);
  }
}
