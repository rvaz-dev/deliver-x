import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {

  async execute({username, password}: ICreateClient) {
    // Validar se o usurario ja existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    });

    if (clientExists) {
      throw new Error("Client already exists");
    }

    // criptografar a senha
    const hashedPassword = await hash(password, 10);

    // salvar o usuario
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    return client;
  }
}