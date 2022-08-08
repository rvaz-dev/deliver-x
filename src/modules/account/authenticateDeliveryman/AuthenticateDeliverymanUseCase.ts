import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../database/prismaClient';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}


export class AuthenticateDeliveryManUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // receber username e password

    
    // verificar se o username está cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error("Username or password is invalid");
    }
      
    // verificar se a senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);
    
    if (!passwordMatch) {
      throw new Error("Username or password is invalid");
    }

    // gerar token de autenticação
    const token = sign({ username }, "1f8f4c33ffbade9e82444ed27520dc2c", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });
    return token;
  }
}