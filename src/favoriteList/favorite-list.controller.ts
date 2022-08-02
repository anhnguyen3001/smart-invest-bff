import {
  Body,
  Controller,
  Delete,
  Get,
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
  async getFavoriteLists(
    @GetUserId() id: number,
    @Query() query: GetListFavoriteQuery,
  ): Promise<BaseResponse<GetListFavoriteResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get(`/favorite-lists`, { params: { ...query, userId: id } })
      .then((res) => res.data);
    console.log(res);
    return getBaseResponse<GetListFavoriteResponse>(
      res,
      GetListFavoriteResponse,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create favorite list',
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
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    summary: 'Update favorite list',
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
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    summary: 'Delete favorite list',
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
}
