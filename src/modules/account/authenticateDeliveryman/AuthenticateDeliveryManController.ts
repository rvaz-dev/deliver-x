import { AuthenticateDeliveryManUseCase } from "./AuthenticateDeliverymanUseCase";

import { Request, Response } from "express";

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliveryManUseCase();
    const result = await authenticateDeliverymanUseCase.execute({
      username,
      password
    });

    return response.json(result);
  }
}