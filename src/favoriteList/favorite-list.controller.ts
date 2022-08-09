import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
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
import {
  ApiBaseResponse,
  ApiOkBaseResponse,
} from 'common/decorators/response.decorator';
import { Identity, RequestParamId } from 'common/dto';
import {
  BaseResponse,
  ServerApiResponseInterface,
} from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import {
  CreateFavoriteListRequest,
  DeleteFavoriteTickerParams,
  GetListFavoriteQuery,
  GetListFavoriteResponse,
  UpdateFavoriteListRequest,
} from './favorite-list.dto';

@ApiBearerAuth()
@ApiTags('Favorite List')
@Controller({
  path: 'favorite-lists',
  version: configService.getValue('API_VERSION'),
})
export class FavoriteListController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Get favorite lists',
  })
  @ApiOkBaseResponse(GetListFavoriteResponse, {
    description: 'Get list favorite list successfully',
  })
  async getFavoriteLists(
    @GetUserId() id: number,
    @Query() query: GetListFavoriteQuery,
  ): Promise<BaseResponse<GetListFavoriteResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/favorite-lists`, { params: { ...query, userId: id } })
      .then((res) => res.data);

    return getBaseResponse<GetListFavoriteResponse>(
      res,
      GetListFavoriteResponse,
    );
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create favorite list',
  })
  @ApiOkBaseResponse(Identity, {
    description: 'Create favorite list successfully',
  })
  async createList(
    @GetUserId() id: number,
    @Body() data: CreateFavoriteListRequest,
  ): Promise<BaseResponse<Identity>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .post(`/favorite-lists`, {
        ...data,
        userId: id,
      })
      .then((res) => res.data);

    return getBaseResponse<Identity>(res, Identity);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    summary: 'Update favorite list',
  })
  @ApiOkBaseResponse(Identity, {
    description: 'Update favorite list successfully',
  })
  async updateList(
    @GetUserId() id: number,
    @Param() params: RequestParamId,
    @Body() data: UpdateFavoriteListRequest,
  ): Promise<BaseResponse<Identity>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .post(`/favorite-lists`, {
        ...data,
        userId: id,
        favoriteListId: params.id,
      })
      .then((res) => res.data);

    return getBaseResponse<Identity>(res, Identity);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    summary: 'Delete favorite list',
  })
  @ApiBaseResponse(Identity, {
    status: 204,
    description: 'Delete favorite list successfully',
  })
  async deleteList(
    @GetUserId() id: number,
    @Param() params: RequestParamId,
  ): Promise<void> {
    await this.coreService.client.delete(`/favorite-lists`, {
      data: {
        favoriteListIds: [params.id],
        userId: id,
      },
    });
  }

  @Delete(':id/tickers/:companyId')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiParam({ name: 'companyId', type: 'number' })
  @ApiOperation({
    summary: 'Delete favorite ticker',
  })
  async deleteFavoriteTicker(
    @GetUserId() userId: number,
    @Param() params: DeleteFavoriteTickerParams,
  ): Promise<void> {
    await this.coreService.client.delete(
      `/favorite-lists/${params.id}/tickers`,
      {
        data: {
          companyIds: [params.companyId],
          userId,
        },
      },
    );
  }
}
