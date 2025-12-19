// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    // O Controller recebe a chamada do banco
    controllers: [AuthController],

    providers: [AuthService],
    // Deixei aqui o  Service para caso o UserModule precise dele depois
    exports: [AuthService],
})
export class AuthModule { }