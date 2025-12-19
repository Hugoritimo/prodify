import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../core/prisma.service'; // Ajuste o caminho conforme sua pasta core

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
    exports: [UserService], // Exportamos para que o AuthModule possa usar o UserService no futuro
})
export class UserModule { }