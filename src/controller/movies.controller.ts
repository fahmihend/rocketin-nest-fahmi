import { Controller, Get, Post, UseGuards, Headers, Req, Body, UseInterceptors, UploadedFile, Put, Delete } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { moviesDto } from "src/dto/movies.dto";
import { editFileName, imageFileFilter } from "src/helper/file-filter.helper";
import { createPaginationOptions } from "src/helper/pagination.helper";
import { response, responseError, responsePage } from "src/helper/response.helper";
import { MoviesService } from "src/service/movies.service";

@Controller('movies')
export class MoviesController {
    constructor(
        private MoviesService: MoviesService
    ) { }

    @Get('view/all')
    async getAllMovies(@Req() req) {
        try {
            const pagination = createPaginationOptions(req)
            const result = await this.MoviesService.getAllMovies(pagination)
            return responsePage(result[0], result[1], pagination)
        } catch (e) {
            return responseError(e.message)
        }
    }
    
    @Get('view/search')
    async getSearch(@Req() req) {
        try {
            const search = req.query.search
            const result = await this.MoviesService.getSearch(search)
            return response('success', result)
        } catch (e) {
            return responseError(e.message)
        }
    }
    
    @Get('view/viewship')
    @UseGuards(JwtAuthGuard)
    async getViewship(@Headers('Authorization') auth: string) {
        try {
            const result = await this.MoviesService.getViewship(auth)
            return response('success', result)
        } catch (e) {
            return responseError(e.message)
        }
    }
    
    @Get('view/mostView')
    @UseGuards(JwtAuthGuard)
    async getMostView(@Headers('Authorization') auth: string) {
        try {
            const result = await this.MoviesService.getMostView(auth)
            return response('success', result)
        } catch (e) {
            return responseError(e.message)
        }
    }
    
    @Delete('delete')
    @UseGuards(JwtAuthGuard)
    async deleteMovie(@Headers('Authorization') auth: string, @Req() req) {
        try {
            const moviesId = req.query.moviesId
            const result = await this.MoviesService.deleteMovie(auth, moviesId)
            return response('success', result)
        } catch (e) {
            return responseError(e.message)
        }
    }

    @Post('add')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './assets/apps',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
    async add(@Headers('Authorization') auth: string, @Body() body: moviesDto, @UploadedFile() file: any) {
        try {
            await this.MoviesService.addMovies(auth, body, file)
            return response('successfully add data')
        } catch (e) {
            return responseError(e.message)
        }
    }
    
    @Put('update')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './assets/apps',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
    async update(@Headers('Authorization') auth: string, @Body() body: moviesDto, @UploadedFile() file: any, @Req() req) {
        try {
            const id = req.query.moviesId
            await this.MoviesService.updateMovies(auth, id, body, file)
            return response('successfully add data')
        } catch (e) {
            return responseError(e.message)
        }
    }
}