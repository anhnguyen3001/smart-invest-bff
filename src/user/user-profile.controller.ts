import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, GetUserId } from 'common/decorators/request.decorator';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import { BaseResponse } from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { IAMService } from 'external/iam/iam.service';
import {
  UpdatePasswordDto,
  UpdateProfileDto,
  UserDto,
  UserResponseDto,
} from './user.dto';

@ApiBearerAuth()
@ApiTags('UserProfile')
@Controller({
  path: 'me',
  version: configService.getValue('API_VERSION'),
})
export class UserProfileController {
  constructor(private readonly iamService: IAMService) {}

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
    @Body() data: UpdatePasswordDto,
  ): Promise<void> {
    await this.iamService.client.post('/users', data, { params: { id } });
  }
}
