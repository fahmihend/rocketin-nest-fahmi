import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class Employee extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    position: string;

    @Column()
    createdate: Date;
}