import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    // A gente trocou o TypeORM pelo PrismaModule que é mais "na mão"
    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }