import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'common/decorators/request.decorator';
import { ApiOkBaseResponse } from 'common/decorators/response.decorator';
import {
  BaseResponse,
  ServerApiResponseInterface,
} from 'common/types/api-response.type';
import { OtpTypeEnum } from 'common/types/entity.type';
import { getBaseResponse } from 'common/utils/response';
import { configService } from 'config/config.service';
import { Request } from 'express';
import { IAMService } from 'external/iam/iam.service';
import {
  ForgetPasswordDto,
  LoginDto,
  LoginSocialDto,
  ResendOtpQueryDto,
  ResetPasswordDto,
  SignupDto,
  TokenResult,
  VerifyOtpDto,
} from './auth.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: configService.getValue('API_VERSION'),
})
export class AuthController {
  constructor(private readonly iamService: IAMService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login',
  })
  @ApiOkBaseResponse(TokenResult, {
    description: 'Login successfully',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
  ): Promise<BaseResponse<TokenResult>> {
    const res: ServerApiResponseInterface = await this.iamService.client
      .post('/auth/login', {
        ...loginDto,
        path: `client/${request.url}`,
        method: request.method,
      })
      .then((res) => res.data);
    return getBaseResponse<TokenResult>(res, TokenResult);
  }

  @Public()
  @Get('facebook')
  @ApiOperation({
    summary: 'Login Facebook',
  })
  @ApiOkBaseResponse(TokenResult, {
    description: 'Login facebook successfully',
  })
  async loginFB(
    @Query() query: LoginSocialDto,
  ): Promise<BaseResponse<TokenResult>> {
    const res: ServerApiResponseInterface = await this.iamService.client
      .get('/auth/facebook', { params: query })
      .then((res) => res.data);

    return getBaseResponse<TokenResult>(res, TokenResult);
  }

  @Public()
  @Get('google')
  @ApiOperation({
    summary: 'Login Google',
  })
  @ApiOkBaseResponse(TokenResult, {
    description: 'Login google successfully',
  })
  async loginGoogle(
    @Query() query: LoginSocialDto,
  ): Promise<BaseResponse<TokenResult>> {
    const res: ServerApiResponseInterface = await this.iamService.client
      .get('/auth/google', { params: query })
      .then((res) => res.data);
    return getBaseResponse<TokenResult>(res, TokenResult);
  }

  @Public()
  @Post('signup')
  @ApiOperation({
    summary: 'Sign up',
  })
  @ApiCreatedResponse({
    description: 'Sign up successfully',
  })
  async signup(@Body() dto: SignupDto): Promise<void> {
    await this.iamService.client.post('/auth/signup', {
      ...dto,
      roleCode: configService.getValue('USER_ROLE_CODE'),
      sendVerifiedEmail: true,
    });
  }

  @Public()
  @Get('verify')
  @ApiOperation({
    summary: 'Verify account',
  })
  @ApiOkResponse({
    description: 'Verify account successfully',
  })
  async verifyUser(@Query() query: VerifyOtpDto): Promise<void> {
    await this.iamService.client.get('/auth/verify', { params: query });
  }

  @Public()
  @Get('recover/init')
  @ApiOperation({
    summary: 'Forget password',
  })
  @ApiOkResponse({
    description: 'Forget password successfully',
  })
  async forgetPassword(@Query() query: ForgetPasswordDto): Promise<void> {
    await this.iamService.client.get('/auth/recover/init', { params: query });
  }

  @Public()
  @Post('recover/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reset password',
  })
  @ApiOkResponse({ description: 'Reset password successfully' })
  async recoverPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.iamService.client.post('/auth/recover/password', dto, {});
  }

  @Public()
  @Get('resend/reset-password')
  @ApiOperation({
    summary: 'Resend OTP for reseting password',
  })
  @ApiOkResponse({ description: 'Resend otp success' })
  async resendOtp(@Query() query: ResendOtpQueryDto): Promise<void> {
    await this.iamService.client.get('/otps/send', {
      params: { ...query, type: OtpTypeEnum.resetPassword },
    });
  }

  @Public()
  @Get('resend/verify')
  @ApiOperation({
    summary: 'Resend OTP for verify user',
  })
  @ApiOkResponse({ description: 'Resend otp success' })
  async resendVerifiedOtp(@Query() query: ResendOtpQueryDto): Promise<void> {
    await this.iamService.client.get('/otps/send', {
      params: {
        ...query,
        type: OtpTypeEnum.verifyUser,
      },
    });
  }
}
