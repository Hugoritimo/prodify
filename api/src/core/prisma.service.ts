import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    // Quando o app liga, a gente acorda o banco
    async onModuleInit() {
        await this.$connect();
        console.log('Deu bom saporra');
    }

    // Quando desliga, a gente fecha a porta pra não dar ruim
    async onModuleDestroy() {
        await this.$disconnect();
    }
}