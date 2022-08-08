import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { clientRoutes } from "./client.routes";
import { deliverymanRoutes } from "./deliveryman.routes";

const routes = Router();

//routes
routes.use("/client", clientRoutes);
routes.use("/authenticate", authenticateRoutes);
routes.use("/deliveryman", deliverymanRoutes);

export { routes };
