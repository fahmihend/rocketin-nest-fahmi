import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/dto/auth.dto";
import { Config } from "src/helper/config.helper";
import { AuthRepository } from "src/repository/auth.repository";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        private jwtTokenService: JwtService,
    ) { }

    async register(params: RegisterDto) {
        try {
            const result = await this.authRepository.regiter(params);
            return result;
        } catch (error) {
            return error
        }
    }

    async login(params: RegisterDto) {
        try {
            const userLogin = await this.authRepository.login(params);

            const payload = {
                username: userLogin.username,
                role: userLogin.role,
            }
            
            const accessToken = await this.generateToken(payload);

            return accessToken;
        } catch (error) {
            return error
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const extractedToken = this.jwtTokenService.decode(refreshToken);
            const generateToken = await this.generateToken({ username: extractedToken['username'], role: extractedToken['role'] });
            return generateToken;
        } catch (error) {
            throw (error);
        }
    }


    async generateToken(payload: any) {
        try {
            const accessToken = this.jwtTokenService.sign(
                payload,
                {
                    secret: Config.get('ACCESS_TOKEN_SECRET'),
                    expiresIn: Config.get('ACCESS_TOKEN_EXPIRES_IN')
                }
            );
            const refreshToken = this.jwtTokenService.sign(
                payload,
                {
                    secret: Config.get('REFRESH_TOKEN_SECRET'),
                    expiresIn: Config.get('REFRESH_TOKEN_EXPIRATION')
                }
            );
            const extractedToken = this.jwtTokenService.decode(accessToken);
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                created_at: extractedToken['iat'],
                expired_at: extractedToken['exp'],
            };
        } catch (e) {
            return e
        }
    }
}