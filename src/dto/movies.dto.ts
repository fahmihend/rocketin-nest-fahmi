import {IsNotEmpty} from 'class-validator';

export class moviesDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    duration: string
    @IsNotEmpty()
    artists: string
    @IsNotEmpty()
    genres: string
    @IsNotEmpty()
    watch_url: string

}