import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { RefreshStrategy } from "src/auth/refresh.strategy";
import { AuthController } from "src/controller/auth.controller";
import { AuthRepository } from "src/repository/auth.repository";
import { AuthService } from "src/service/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([AuthRepository]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}