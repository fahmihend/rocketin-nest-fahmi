import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('viewship')
export class Viewship extends BaseEntity{
    @PrimaryGeneratedColumn()
    viewship_id: number;

    @Column()
    user_id: string;

    @Column()
    movie_id: number;
}