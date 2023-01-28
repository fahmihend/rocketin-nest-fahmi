import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movies extends BaseEntity{
    @PrimaryGeneratedColumn()
    movies_id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    duration: string;
    @Column()
    artists: string;
    @Column()
    genres: string;
    @Column()
    watch_url: string;
    @Column()
    total_views: string;
}