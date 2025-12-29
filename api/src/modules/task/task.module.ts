import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../../core/prisma.service'; // Não esqueça do Prisma!

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService], // Adicione o PrismaService aqui
})
export class TaskModule { }