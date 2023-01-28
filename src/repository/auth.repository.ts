import { RegisterDto } from "src/dto/auth.dto";
import { Users } from "src/entity/users.entity";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {
    async regiter(params: RegisterDto) {
        try {
            const salt = await bcrypt.genSalt(10);
            const checkUsername = await Users.createQueryBuilder('users')
                .where('users.username = :username', { username: params.username })
                .getCount();
            if (checkUsername > 0) throw new Error('Username already exist');
            if (params.password !== params.confirmPassword) throw new Error('Password not match');
            const hashPassword = await bcrypt.hash(params.password, salt);
            await Users.createQueryBuilder().insert().values({
                username: params.username,
                password: hashPassword,
                role: params.role
            })
                .execute();
            return true;
        } catch (error) {
            return error
        }
    }

    async login(params: RegisterDto) {
        try {
            const data = await Users.createQueryBuilder('users')
                .where('users.username = :username', { username: params.username })
                .getOne();
            if (!data) throw new Error('Username not found');
            const checkPassword = await bcrypt.compare(params.password, data.password);
            if (!checkPassword) throw new Error('Password not match');
            const result = {
                username: data.username,
                role: data.role
            }
            return result;
        } catch (error) {
            return error
        }
    }
}