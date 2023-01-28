import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "src/dto/auth.dto";
import { response } from "src/helper/response.helper";
import { AuthService } from "src/service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(
        @Body() params: RegisterDto,
    ) {
        try {
            const result = await this.authService.register(params);
            return response('Success Create Data',result);
        } catch (error) {
            return error
        }
    }

    @Post('login')
    async login(
        @Body() params: RegisterDto,
    ) {
        try {
            const result = await this.authService.login(params);
            return response('Success Login',result);
        } catch (error) {
            return error
        }
    }

    @Post('refresh')
    async refresh(
        @Body() refreshToken: string,
        ) {
        try {
            const token = Object.values(refreshToken)[0]
            const result = await this.authService.refreshToken(token);
            return response('refresh success',result)
        } catch (e) {
            return e;
        }
    }
}