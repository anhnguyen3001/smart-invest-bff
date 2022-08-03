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
  GetTickerPredictedPriceQuery,
  GetTickerPredictedPriceResponse,
  GetTickerPriceQuery,
  GetTickerPriceResponse,
  GetTickersNotInFavoriteQuery,
  GetTickersQuery,
  GetTickersResponse,
} from './ticker.dto';

@ApiBearerAuth()
@ApiTags('Ticker')
@Controller({
  path: 'tickers',
  version: configService.getValue('API_VERSION'),
})
export class TickerController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Search tickers',
  })
  @ApiOkBaseResponse(GetTickersResponse, {
    description: 'Get tickers successfully',
  })
  async getTickers(
    @Query() query: GetTickersQuery,
  ): Promise<BaseResponse<GetTickersResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/tickers`, { params: query })
      .then((res) => res.data);
    return getBaseResponse<GetTickersResponse>(res, GetTickersResponse);
  }

  @Get('new-favorite-tickers')
  @ApiOperation({
    summary: 'Get tickers not in favorite list',
  })
  @ApiOkBaseResponse(GetTickersResponse, {
    description: 'Get tickers not in favorite list successfully',
  })
  async getTickersNotInFavorite(
    @GetUserId() userId: number,
    @Query() query: GetTickersNotInFavoriteQuery,
  ): Promise<BaseResponse<GetTickersResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/tickers`, { params: { ...query, userId } })
      .then((res) => res.data);
    return getBaseResponse<GetTickersResponse>(res, GetTickersResponse);
  }

  @Get('price')
  @ApiOperation({
    summary: 'Get ticker prices ',
  })
  @ApiOkBaseResponse(GetTickerPriceResponse, {
    description: 'Get ticker prices successfully',
  })
  async getTickerPrice(
    @Query() query: GetTickerPriceQuery,
  ): Promise<BaseResponse<GetTickerPriceResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/tickers/price`, { params: query })
      .then((res) => res.data);
    return getBaseResponse<GetTickerPriceResponse>(res, GetTickerPriceResponse);
  }

  @Get('predicted-price')
  @ApiOperation({
    summary: 'Get predicted prices',
  })
  @ApiOkBaseResponse(GetTickerPredictedPriceResponse)
  async getPredictedPrice(
    @Query() query: GetTickerPredictedPriceQuery,
  ): Promise<BaseResponse<GetTickerPredictedPriceResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client.get(
      `/tickers/predicted-price`,
      {
        params: query,
      },
    );
    return getBaseResponse<GetTickerPredictedPriceResponse>(
      res,
      GetTickerPredictedPriceResponse,
      { excludeExtraneousValues: false },
    );
  }
}
