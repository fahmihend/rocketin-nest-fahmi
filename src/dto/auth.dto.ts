import {IsNotEmpty} from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @IsNotEmpty()
    role: string;
}