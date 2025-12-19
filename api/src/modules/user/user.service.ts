import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    // 1. Busca o perfil completo pelo username (para a tela de Perfil)
    async buscarPerfil(username: string) {
        const usuario = await this.prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                email: true,
                username: true,
                points: true,
                streak: true,
                isPremium: true,
                avatarUrl: true,
                createdAt: true,
            },
        });

        if (!usuario) {
            throw new NotFoundException(`Usuário ${username} não encontrado.`);
        }

        return usuario;
    }

    // 2. Busca apenas as estatísticas (para os StatCards da Home)
    async buscarStats(username: string) {
        return await this.prisma.user.findUnique({
            where: { username },
            select: {
                points: true,
                streak: true,
            },
        });
    }

    // 3. Adiciona pontos ao usuário (útil para quando ele terminar uma Task)
    async adicionarPontos(username: string, quantidade: number) {
        return await this.prisma.user.update({
            where: { username },
            data: {
                points: {
                    increment: quantidade,
                },
            },
        });
    }
}