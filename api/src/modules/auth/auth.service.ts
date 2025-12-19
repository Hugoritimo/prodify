import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  // Método para criar um novo usuário
  async cadastrarUsuario(dados: any) {
    const novoUsuario = await this.prisma.user.create({
      data: {
        email: dados.email,
        username: dados.username,
        password: dados.password,
        points: 100, // Pontos iniciais conforme seu teste
        streak: 1,
      },
    });

    console.log(`Usuário ${novoUsuario.username} registrado com sucesso.`);
    return novoUsuario;
  }

  // Método de Login
  async login(email: string, pass: string) {
    // 1. Busca o usuário pelo e-mail
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // 2. Verifica se o usuário existe e se a senha bate
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    // 3. Retorna os dados para o frontend mobile
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}