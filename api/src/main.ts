import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <--- 1. Import novo
import { join } from 'path'; // <--- 2. Para manipular caminhos de pasta

async function bootstrap() {
  // 3. Adicionamos o tipo <NestExpressApplication> aqui na criação
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilita CORS (Segurança para o celular acessar)
  app.enableCors();

  // 4. Mágica: Tudo que estiver na pasta 'uploads' vira um link público
  // Ex: Se salvar 'foto.jpg', acessa em http://localhost:3000/uploads/foto.jpg
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();