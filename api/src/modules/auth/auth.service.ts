import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'; // Adicionei ConflictException
import { PrismaService } from '../../core/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  // Método para criar um novo usuário (COM VERIFICAÇÃO)
  async cadastrarUsuario(dados: any) {
    // 1. Antes de criar, verifica se já existe
    const usuarioExistente = await this.prisma.user.findUnique({
      where: { email: dados.email },
    });

    if (usuarioExistente) {
      // Retorna erro 409 (Conflict) em vez de quebrar o servidor
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    // 2. Se não existe, cria
    const novoUsuario = await this.prisma.user.create({
      data: {
        email: dados.email,
        username: dados.username,
        password: dados.password, // Lembrete: Use bcrypt em produção!
        points: 100,
        streak: 1,
      },
    });

    console.log(`Usuário ${novoUsuario.username} registrado com sucesso.`);

    // Opcional: Já retornar o token no cadastro para logar direto (UX melhor)
    return novoUsuario;
  }

  // Método de Login
  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== pass) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}