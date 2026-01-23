import {
    Controller, Get, Post, Param, UseGuards, Request,
    UseInterceptors, UploadedFile, BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user') // Rota base: localhost:3000/user
export class UserController {
    constructor(private readonly userService: UserService) { }

    // 1. ROTA DE RANKING
    @Get('leaderboard/global')
    async getLeaderboard() {
        return this.userService.getLeaderboard();
    }

    // --- NOVA ROTA: UPLOAD DE AVATAR ---
    @UseGuards(JwtAuthGuard)
    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // 📁 Salva na pasta uploads na raiz
            filename: (req, file, cb) => {
                // Gera nome único para não substituir arquivos (ex: a1b2c3d4.jpg)
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            // 🔒 Segurança: Só aceita imagens
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                return cb(new BadRequestException('Apenas arquivos de imagem são permitidos!'), false);
            }
            cb(null, true);
        }
    }))
    async uploadAvatar(@Request() req, @UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Nenhum arquivo enviado');
        }

        // Salva o caminho relativo (ex: /uploads/nome-da-foto.jpg)
        const avatarUrl = `/uploads/${file.filename}`;

        // Atualiza no banco de dados usando o ID do usuário logado (do Token)
        return this.userService.updateAvatar(req.user.userId, avatarUrl);
    }

    // 2. Rota para buscar o perfil completo
    @Get(':username')
    async getPerfil(@Param('username') username: string) {
        return this.userService.buscarPerfil(username);
    }

    // 3. Rota para buscar apenas os Stats
    @Get(':username/stats')
    async getStats(@Param('username') username: string) {
        return this.userService.buscarStats(username);
    }
}