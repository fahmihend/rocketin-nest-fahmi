import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;
}