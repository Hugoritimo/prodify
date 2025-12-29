import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // Método 'create' que o Controller está pedindo
  async create(title: string, duration: number, userId: string) {
    return this.prisma.task.create({
      data: {
        title,
        duration,
        userId,
        points: 10, // XP padrão por tarefa
      },
    });
  }

  // Método 'findAll' que o Controller está pedindo
  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Método 'completeTask' que o Controller está pedindo
  async completeTask(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new NotFoundException('Tarefa não encontrada');

    // Atualiza a tarefa para concluída
    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: { completed: true, completedAt: new Date() },
    });

    // Soma os pontos ao usuário
    await this.prisma.user.update({
      where: { id: userId },
      data: { points: { increment: task.points } },
    });

    // Cria o registro de atividade para a Home
    await this.prisma.activity.create({
      data: {
        userId,
        type: 'TASK_COMPLETED',
        description: `Concluiu: ${task.title}`,
        icon: 'check-circle',
      },
    });

    return updatedTask;
  }
}