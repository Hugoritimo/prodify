import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class FocusService {
    constructor(private prisma: PrismaService) { }

    // Recebe String agora (UUID)
    async createSession(userId: string, duration: number) {
        return this.prisma.focusSession.create({
            data: {
                userId,
                duration,
                startTime: new Date(),
            },
        });
    }

    // Recebe String agora (UUID)
    async getFocusHistory(userId: string) {
        const sessions = await this.prisma.focusSession.findMany({
            where: { userId },
            orderBy: { startTime: 'asc' },
        });

        const historyMap = new Map<string, number>();

        sessions.forEach((session) => {
            const date = session.startTime.toISOString().split('T')[0];
            const currentCount = historyMap.get(date) || 0;
            historyMap.set(date, currentCount + 1);
        });

        return Array.from(historyMap, ([date, count]) => ({ date, count }));
    }
}