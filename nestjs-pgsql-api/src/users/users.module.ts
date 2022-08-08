import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository, UserRepositoryProvider } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    providers: [UsersService, UserRepositoryProvider],
    controllers: [UsersController],
})
export class UsersModule {}
