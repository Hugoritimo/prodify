import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { FocusService } from './focus.service';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';

@Controller('focus')
export class FocusController {
    constructor(private readonly focusService: FocusService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createSession(@Request() req, @Body() data: { duration: number }) {
        // O req.user.userId vem do JWT (agora é string/UUID)
        // Se o seu JWT Strategy estiver retornando "id" em vez de "userId", troque para req.user.id
        return this.focusService.createSession(req.user.userId, data.duration);
    }

    @UseGuards(JwtAuthGuard)
    @Get('history')
    async getHistory(@Request() req) {
        return this.focusService.getFocusHistory(req.user.userId);
    }
}