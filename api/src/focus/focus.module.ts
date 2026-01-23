import { Module } from '@nestjs/common';
import { FocusService } from './focus.service';
import { FocusController } from './focus.controller';
import { PrismaService } from '../core/prisma.service';

@Module({
    controllers: [FocusController],
    providers: [FocusService, PrismaService],
})
export class FocusModule { }