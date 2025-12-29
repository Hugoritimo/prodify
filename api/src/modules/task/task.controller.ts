import { Controller, Post, Get, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() body: { title: string; duration: number; userId: string }) {
        return this.taskService.create(body.title, body.duration, body.userId);
    }

    @Get('user/:userId')
    async findAll(@Param('userId') userId: string) {
        return this.taskService.findAll(userId);
    }

    @Patch(':id/complete')
    async complete(@Param('id') id: string, @Body() body: { userId: string }) {
        return this.taskService.completeTask(id, body.userId);
    }
}