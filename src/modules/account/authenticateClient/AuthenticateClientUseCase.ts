import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../database/prismaClient';

interface IAuthenticateClient {
  username: string;
  password: string;
}


export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // receber username e password

    
    // verificar se o username está cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password is invalid");
    }
      
    // verificar se a senha corresponde ao username
    const passwordMatch = await compare(password, client.password);
    
    if (!passwordMatch) {
      throw new Error("Username or password is invalid");
    }

    // gerar token de autenticação
    const token = sign({ username }, "1f8f4c33ffbade9e82444ed27520dc2c", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}