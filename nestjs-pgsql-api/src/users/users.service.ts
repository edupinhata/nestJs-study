import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('The password dont match.');
        } else {
            console.log(`====== [EDU]: createUser.type: ${typeof this.userRepository}`);
            console.log(`====== [EDU]: createUser: ${Object.getOwnPropertyNames(Object.getPrototypeOf(this.userRepository))}`);
            return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
        }
    }
}
