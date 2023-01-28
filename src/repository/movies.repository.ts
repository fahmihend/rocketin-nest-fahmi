import { moviesDto } from "src/dto/movies.dto";
import { Movies } from "src/entity/movies.entity";
import { Users } from "src/entity/users.entity";
import { Viewship } from "src/entity/viewship.entity";
import { PaginationOptions } from "src/helper/pagination.helper";
import { Brackets, EntityRepository, Repository } from "typeorm";

@EntityRepository(Movies)
export class MoviesRepository extends Repository<Movies> {
    async getAllMovies(pagination: PaginationOptions) {
        try {
            return await Movies.createQueryBuilder('movies').skip(pagination.queryPage).take(pagination.limit).getManyAndCount()
        } catch (e) {
            throw e;
        }
    }
    
    async getSearch(search: string) {
        try {
            return await Movies.createQueryBuilder('movies')
            .andWhere(new Brackets(qb => {
                qb.where('movies.title LIKE :title', { title: `%${search}%` })
                  .orWhere('movies.description LIKE :description', { description: `%${search}%` })
                  .orWhere('movies.artists LIKE :artists', { artists: `%${search}%` })
                  .orWhere('movies.artists LIKE :artists', { artists: `%${search}%` })
                  .orWhere('movies.genres LIKE :genres', { genres: `%${search}%` });
              }))
            .getMany()
        } catch (e) {
            throw e;
        }
    }
    
    async getMostView() {
        try {
            return await Movies.createQueryBuilder('movies').orderBy('movies.total_views', 'DESC').getOne()
        } catch (e) {
            throw e;
        }
    }
    
    async getViewship(username: string) {
        try {
            const getUser = await Users.createQueryBuilder('a').where('a.username = :username', {username: username}).getOne()
            return await Viewship.createQueryBuilder('a')
                .leftJoinAndMapMany('a.user', Users, 'user', 'a.user_id = user.id')
                .leftJoinAndMapMany('a.movies', Movies, 'movies', 'a.movie_id = movies_id')
                .where('a.user_id = :uid', {uid: getUser.id})
                .getOne()
        } catch (e) {
            throw e;
        }
    }
    
    async deleteMovie(moviesId: string) {
        try {
            await Movies.createQueryBuilder('movies').delete().where('movies.movies_id = :id', {id: moviesId}).execute()
            return null
        } catch (e) {
            throw e;
        }
    }

    async addMovies(body: moviesDto, filepath) {
        try {
            const val = new moviesDto()
            val.artists = body.artists;
            val.description = body.description;
            val.duration = body.duration;
            val.genres = body.genres;
            val.title = body.title;
            val.watch_url = filepath;
            await Movies.createQueryBuilder('movies').insert().values(val).execute()
            return null
        } catch (e) {
            throw e;
        }
    }

    async updateMovies(body: moviesDto, id: string, filepath) {
        try {
            const val = new moviesDto()
            val.artists = body.artists;
            val.description = body.description;
            val.duration = body.duration;
            val.genres = body.genres;
            val.title = body.title;
            if (filepath !== '') {
                val.watch_url = filepath;
            }
            await Movies.createQueryBuilder('movies').update().set(val).where('movies.movies_id = :id', {id: id}).execute()
            return null
        } catch (e) {
            throw e;
        }
    }
}