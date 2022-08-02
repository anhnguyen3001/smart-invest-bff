import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserId } from 'common/decorators/request.decorator';
import { Identity, RequestParamId } from 'common/dto';
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
  @ApiOperation({
    summary: 'Add favorite ticker',
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

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    summary: 'Delete favorite ticker',
  })
  async deleteFavoriteTicker(
    @GetUserId() id: number,
    @Param() params: RequestParamId,
  ): Promise<void> {
    await this.coreService.client.delete(`/favorite-tickers`, {
      data: {
        favoriteTickerIds: [params.id],
        userId: id,
      },
    });
  }
}
