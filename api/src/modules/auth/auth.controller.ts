import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('registro')
    async registro(@Body() body: any) {
        // Ajustado para o nome correto do método no Service
        return this.authService.cadastrarUsuario(body);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: any) {
        // Este aqui está certinho!
        return this.authService.login(body.email, body.password);
    }
}