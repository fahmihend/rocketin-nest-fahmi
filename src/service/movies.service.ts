import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { moviesDto } from "src/dto/movies.dto";
import { PaginationOptions } from "src/helper/pagination.helper";
import { MoviesRepository } from "src/repository/movies.repository";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MoviesRepository)
        private readonly moviesRepository: MoviesRepository,
        public readonly jwtTokenService: JwtService,
    ) {}
    async getAllMovies(pagination: PaginationOptions) {
        try {
            return await this.moviesRepository.getAllMovies(pagination)
        } catch (e) {
            throw e;
        }
    }
    
    async getSearch(string: string) {
        try {
            return await this.moviesRepository.getSearch(string)
        } catch (e) {
            throw e;
        }
    }
    
    async getMostView(auth: string) {
        try {
            const extractedToken = this.jwtTokenService.decode(auth.replace('Bearer ', ''));
            if (extractedToken['role'] !== 'admin') throw new Error('you are not allowed to access this')
            return await this.moviesRepository.getMostView()
        } catch (e) {
            throw e;
        }
    }
    
    async getViewship(auth: string) {
        try {
            const extractedToken = this.jwtTokenService.decode(auth.replace('Bearer ', ''));
            const username = extractedToken['username']
            return await this.moviesRepository.getViewship(username)
        } catch (e) {
            throw e;
        }
    }
    
    async deleteMovie(auth: string, moviesId: string) {
        try {
            const extractedToken = this.jwtTokenService.decode(auth.replace('Bearer ', ''));
            if (extractedToken['role'] !== 'admin') throw new Error('you are not allowed to access this')
            return await this.moviesRepository.deleteMovie(moviesId)
        } catch (e) {
            throw e;
        }
    }
    
    async addMovies(auth: string, body: moviesDto, file: any) {
        try {
            const filepath = (file.path).replaceAll('\\', '/')
            const extractedToken = this.jwtTokenService.decode(auth.replace('Bearer ', ''));
            if (extractedToken['role'] !== 'admin') throw new Error('you are not allowed to access this')
            return await this.moviesRepository.addMovies(body, filepath)
        } catch (e) {
            throw e;
        }
    }
    
    async updateMovies(auth: string, id: any, body: moviesDto, file: any) {
        try {
            let filepath = '';
            if (file) {
                filepath = (file.path).replaceAll('\\', '/')
            }
            const extractedToken = this.jwtTokenService.decode(auth.replace('Bearer ', ''));
            if (extractedToken['role'] !== 'admin') throw new Error('you are not allowed to access this')
            return await this.moviesRepository.updateMovies(body, id, filepath)
        } catch (e) {
            throw e;
        }
    }
}