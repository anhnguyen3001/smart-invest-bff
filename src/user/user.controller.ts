import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, GetUserId } from 'common/decorators/request.decorator';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import { Identity, RequestParamId } from 'common/dto';
import {
  BaseResponse,
  IAMApiResponseInterface,
} from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { IAMService } from 'external/iam/iam.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  SearchUserDto,
  SearchUsersResponse,
  UpdateProfileDto,
  UpdateUserDto,
  UserDto,
  UserResponseDto,
} from './user.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller({
  path: 'users',
  version: configService.getValue('API_VERSION'),
})
export class UserController {
  constructor(private readonly iamService: IAMService) {}

  @Get()
  @ApiOperation({
    summary: 'Get users by queries',
  })
  @ApiOkBaseResponse(SearchUsersResponse, {
    description: 'Get users by queries successfully',
  })
  async getListUsers(
    @Query() dto: SearchUserDto,
  ): Promise<BaseResponse<SearchUsersResponse>> {
    const res: IAMApiResponseInterface = await this.iamService.client
      .get('/users', { params: dto })
      .then((res) => res.data);
    return getBaseResponse<SearchUsersResponse>(res, SearchUsersResponse);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiOkBaseResponse(Identity, {
    description: 'Create user successfully',
  })
  async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<BaseResponse<Identity>> {
    const res: IAMApiResponseInterface = await this.iamService.client
      .post('/users', dto)
      .then((res) => res.data);
    return getBaseResponse<Identity>(res, Identity);
  }

  @Patch('/:id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiOkBaseResponse(Identity, {
    description: 'Update user successfully',
  })
  async updateUser(
    @Body() data: UpdateUserDto,
    @Param() params: RequestParamId,
  ): Promise<BaseResponse<Identity>> {
    const res: IAMApiResponseInterface = await this.iamService.client
      .post('/permissions', data, { params: { id: params.id } })
      .then((res) => res.data);
    return getBaseResponse<Identity>(res, Identity);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete user by id',
  })
  @ApiResponse({
    status: 204,
    description: 'Delete user successfully',
  })
  async deleteRoute(@Param() params: RequestParamId): Promise<void> {
    await this.iamService.client.delete(`/users/${params.id}`);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get user info',
  })
  @ApiOkBaseResponse(UserResponseDto, {
    description: 'Get user info successfully',
  })
  async getUserInfo(
    @GetUser() user: UserDto,
  ): Promise<BaseResponse<UserResponseDto>> {
    return getBaseResponse(
      {
        data: { user },
      },
      UserResponseDto,
    );
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Update user profile',
  })
  @ApiNoContentResponse({
    description: 'Update user profile successfully',
  })
  async updateProfile(
    @GetUserId() id: number,
    @Body() data: UpdateProfileDto,
  ): Promise<void> {
    await this.iamService.client.post('/users', data, { params: { id } });
  }

  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Change password',
  })
  @ApiNoContentResponse({ description: 'Change password successfully' })
  async changePassword(
    @GetUserId() id: number,
    @Body() data: ChangePasswordDto,
  ): Promise<void> {
    await this.iamService.client.post('/users', data, { params: { id } });
  }
}
