import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'common/decorators/request.decorator';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import {
  BaseResponse,
  ServerApiResponseInterface,
} from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import {
  GetFavoriteNewsQuery,
  GetListNewsQuery,
  GetListNewsResponse,
} from './news.dto';

@ApiBearerAuth()
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
  @ApiOkBaseResponse(GetListNewsResponse, {
    description: 'Get list news successfully',
  })
  async getListNews(
    @Query() query: GetListNewsQuery,
  ): Promise<BaseResponse<GetListNewsResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/news`, { params: query })
      .then((res) => res.data);
    return getBaseResponse<GetListNewsResponse>(res, GetListNewsResponse);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get list news of favorite tickers',
  })
  @ApiOkBaseResponse(GetListNewsResponse, {
    description: 'Get list news of favorite tickers successfully',
  })
  async getFavoriteNews(
    @GetUserId() id: number,
    @Query() query: GetFavoriteNewsQuery,
  ): Promise<BaseResponse<GetListNewsResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/news`, { params: { userId: id, ...query } })
      .then((res) => res.data);
    return getBaseResponse<GetListNewsResponse>(res, GetListNewsResponse);
  }
}
