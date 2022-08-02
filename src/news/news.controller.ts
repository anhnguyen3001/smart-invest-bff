import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServerApiResponseInterface } from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import { GetListNewsQuery, GetListNewsResponse } from './news.dto';

@ApiTags('News')
@Controller({
  path: 'news',
  version: configService.getValue('API_VERSION'),
})
export class NewsController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list news',
  })
  async getListNews(@Query() query: GetListNewsQuery) {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/news`, { params: query })
      .then((res) => res.data);
    return getBaseResponse<GetListNewsResponse>(res, GetListNewsResponse);
  }
}
