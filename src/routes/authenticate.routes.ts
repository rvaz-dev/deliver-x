import { Router } from "express";
import { AuthenticateClientController } from "../modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "../modules/account/authenticateDeliveryman/AuthenticateDeliveryManController";

const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
/**
 * @route POST /authenticate/client
 * @group Authenticate - Authenticate Client
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @ returns {string} 200 - Token
 */
authenticateRoutes.post("/client", authenticateClientController.handle);

/**
 * @route POST /authenticate/deliveryman
 * @group Authenticate - Authenticate Deliveryman
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @ returns {string} 200 - Token
*/
authenticateRoutes.post("/deliveryman", authenticateDeliverymanController.handle);

export { authenticateRoutes };
