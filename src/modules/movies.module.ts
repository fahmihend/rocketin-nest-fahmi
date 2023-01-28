import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesController } from "src/controller/movies.controller";
import { MoviesRepository } from "src/repository/movies.repository";
import { MoviesService } from "src/service/movies.service";

@Module({
    imports: [TypeOrmModule.forFeature([MoviesRepository]), JwtModule.register({})],
    controllers: [MoviesController],
    providers: [MoviesService],
})

export class MoviesModule {}