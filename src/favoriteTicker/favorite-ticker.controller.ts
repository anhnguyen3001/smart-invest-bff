import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'common/decorators/request.decorator';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import { Identity } from 'common/dto';
import {
  BaseResponse,
  ServerApiResponseInterface,
} from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import {
  AddFavoriteTickerRequest,
  GetFavoriteTickersQuery,
  GetFavoriteTickersResponse,
} from './favorite-ticker.dto';

@ApiBearerAuth()
@ApiTags('Favorite Ticker')
@Controller({
  path: 'favorite-tickers',
  version: configService.getValue('API_VERSION'),
})
export class FavoriteTickerController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Get favorite tickers',
  })
  @ApiOkBaseResponse(GetFavoriteTickersResponse, {
    description: 'Get favorite tickers successfully',
  })
  async getFavoriteTickers(
    @GetUserId() id: number,
    @Query() query: GetFavoriteTickersQuery,
  ): Promise<BaseResponse<GetFavoriteTickersResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/favorite-tickers`, { params: { ...query, userId: id } })
      .then((res) => res.data);
    return getBaseResponse<GetFavoriteTickersResponse>(
      res,
      GetFavoriteTickersResponse,
    );
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Add favorite ticker',
  })
  @ApiOkBaseResponse(Identity, {
    description: 'Add favorite ticker successfully',
  })
  async addTicker(
    @GetUserId() id: number,
    @Body() data: AddFavoriteTickerRequest,
  ): Promise<BaseResponse<Identity>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .post(`/favorite-tickers`, {
        ...data,
        userId: id,
      })
      .then((res) => res.data);

    return getBaseResponse<Identity>(res, Identity);
  }
}
