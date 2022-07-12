import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(
        createUserDto = CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const { email, name, password }  = createUserDto.arguments;
        console.log(`=== [EDU]: createUserDto: ${JSON.stringify(createUserDto)}`);

        const user = this.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.status = true;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('endereço de amail já está em uso);')
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar usuario no banco de dados',
                );
            }
        }
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
    
}