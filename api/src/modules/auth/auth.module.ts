import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // <--- Importante para validar o usuário
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants'; // A chave que criamos
import { JwtStrategy } from './jwt.strategy'; // <--- A PEÇA QUE FALTAVA (Corrige o erro)

@Module({
    imports: [
        UserModule,
        PassportModule,
        // Configura o módulo JWT para assinar os tokens com sua senha secreta
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' }, // Token dura 7 dias
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy, // <--- OBRIGATÓRIO: Registra a estratégia no sistema
        // Se você tiver um LocalStrategy (login com senha), adicione aqui também:
        // LocalStrategy 
    ],
    exports: [AuthService],
})
export class AuthModule { }