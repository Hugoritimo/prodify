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
                activities: { // Opcional: trazer as atividades recentes se precisar
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
    // Isso garante que se o Controller chamar "findByUsername", ele usa o "buscarPerfil"
    async findByUsername(username: string) {
        return this.buscarPerfil(username);
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

    // 4. NOVO: Busca o Ranking Global (Top 10)
    async getLeaderboard() {
        return this.prisma.user.findMany({
            orderBy: { points: 'desc' }, // Ordena do maior XP para o menor
            take: 10, // Pega apenas os 10 primeiros
            select: {
                id: true,
                username: true,
                points: true,
                avatarUrl: true,
                streak: true,
            },
        });
    }
}