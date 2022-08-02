import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'common/decorators/request.decorator';
import {
  BaseResponse,
  ServerApiResponseInterface,
} from 'common/types/api-response.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { CoreService } from 'external/core/core.service';
import { IAMService } from 'external/iam/iam.service';
import { UserDto } from 'user/user.dto';
import {
  GetCommentsQuery,
  GetCommentsResponse,
  PostCommentRequest,
  PostCommentResponse,
} from './comment.dto';

@ApiBearerAuth()
@ApiTags('Comment')
@Controller({
  path: 'comments',
  version: configService.getValue('API_VERSION'),
})
export class CommentController {
  constructor(
    private readonly coreService: CoreService,
    private readonly iamService: IAMService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get list comments',
  })
  async getComments(
    @Query() query: GetCommentsQuery,
  ): Promise<BaseResponse<GetCommentsResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .get('comments', { params: query })
      .then((res) => res.data);

    const userIds = (res.data.comments as any).map(({ userId }) => userId);
    if (userIds.length) {
      const userRes: ServerApiResponseInterface =
        await this.iamService.client.get('users', {
          params: { getAll: true, userIds },
        });

      const userMapping: { [id: number]: UserDto } = (
        userRes.data.data.users as UserDto[]
      ).reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

      res.data.comments = res.data.comments.map(({ userId, ...rest }) => ({
        ...rest,
        user: userMapping[userId],
      }));
    }

    return getBaseResponse<GetCommentsResponse>(res, GetCommentsResponse);
  }

  @Post()
  @ApiOperation({
    summary: 'Create comment',
  })
  async createComment(
    @GetUserId() id: number,
    @Body() data: PostCommentRequest,
  ): Promise<BaseResponse<PostCommentResponse>> {
    const res: ServerApiResponseInterface = await this.coreService.client
      .post('comments', { ...data, userId: id })
      .then((res) => res.data);

    return getBaseResponse<PostCommentResponse>(res, PostCommentResponse);
  }
}
