import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';

@Global() // Prisma disponível no PROJ todo, sem precisar importar sempre
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Botei para outros modulos usarem também
})
export class PrismaModule { }