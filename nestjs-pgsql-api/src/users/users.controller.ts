import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    async getUsers(){
        return 'Testing route';
    }

    @Post()
    async createAdminUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        console.log(`======= [EDU]: createUserDto: ${JSON.stringify(createUserDto)}`);
        const user = await this.userService.createAdminUser(createUserDto);
        return {
            user, 
            message: 'Admin successfully created'
        };
    }
}
