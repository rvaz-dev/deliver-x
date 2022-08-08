import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";


interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({username, password}: ICreateDeliveryman) {
    // Validar se o usurario ja existe
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    });

    if (deliverymanExists) {
      throw new Error("Deliveryman already exists");
    }

    // criptografar a senha
    const hashedPassword = await hash(password, 10);

    // salvar o usuario
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    return deliveryman;
  }
}
