import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

import { PasswordMatchPipe } from "src/common/pipes/password-match.pipe";
import { AuthGuard } from "src/common/guard/auth.guard";
import { LoggingInterceptor } from "src/common/interceptors/logger.interceptor";
import { ResponseInterceptor } from "src/common/interceptors/reponse.interceptor";

@UseInterceptors(LoggingInterceptor ,ResponseInterceptor )
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post("/resend-otp")
  async resendOtp(@Body() resendOtp: any) {
    return await this.authService.resendOtp(resendOtp);
  }

  @Patch("/confirm-email")
  async confirmEmail(@Body() confirmEmail: any) {
    return await this.authService.confirmEmail(confirmEmail);
  }
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: any) {
    return await this.authService.login(login);
  }
  @Get("/get-profile")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    return await this.authService.getProfile(req);
  }
}
