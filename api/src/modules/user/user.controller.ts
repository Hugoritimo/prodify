import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') // Rota base: localhost:3000/user
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Rota para buscar o perfil completo
    @Get(':username')
    async getPerfil(@Param('username') username: string) {
        return this.userService.buscarPerfil(username);
    }

    // Rota para buscar apenas os Stats (pontos e streak)
    @Get(':username/stats')
    async getStats(@Param('username') username: string) {
        return this.userService.buscarStats(username);
    }
}