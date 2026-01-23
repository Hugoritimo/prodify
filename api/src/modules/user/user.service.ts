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
                activities: {
                    take: 5,
                    orderBy: { createdAt: 'desc' }
                }
            },
        });

        if (!usuario) {
            throw new NotFoundException(`Usuário ${username} não encontrado.`);
        }

        return usuario;
    }

    // --- ALIAS (Atalho) ---
    async findByUsername(username: string) {
        return this.buscarPerfil(username);
    }

    // 2. Busca apenas as estatísticas
    async buscarStats(username: string) {
        return await this.prisma.user.findUnique({
            where: { username },
            select: {
                points: true,
                streak: true,
            },
        });
    }

    // 3. Adiciona pontos ao usuário
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

    // 4. Busca o Ranking Global (Top 10)
    async getLeaderboard() {
        return this.prisma.user.findMany({
            orderBy: { points: 'desc' },
            take: 10,
            select: {
                id: true,
                username: true,
                points: true,
                avatarUrl: true,
                streak: true,
            },
        });
    }

    // 5. NOVO: Atualiza o Avatar do Usuário (A peça que faltava!)
    async updateAvatar(userId: string, avatarUrl: string) {
        return this.prisma.user.update({
            where: { id: userId }, // Busca pelo ID (que vem do Token JWT)
            data: {
                avatarUrl: avatarUrl
            },
            // Retorna os dados atualizados para o App já atualizar a tela
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                points: true
            }
        });
    }
}