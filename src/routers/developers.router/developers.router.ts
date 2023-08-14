import { Router } from "express";
import { createDevelopers, deleteDeveloper, searchAllInfoDeveloper, upDateDeveloper } from "../../controllers/developers.controllers/developer.controllers";
import { createDevelopersInfos } from "../../controllers/developers.controllers/developerInfos.controllers";
import { checkExistingEmail } from "../../middlewares/developers.middlewares/developers.middleware";
import {
  checkExistingId,
  checkExistingPreferredOS,
  existingDeveloperInfos,
} from "../../middlewares/developers.middlewares/developerInfos.middleware";

export const developersRouter: Router = Router();

developersRouter.post("/", checkExistingEmail, createDevelopers);
developersRouter.post(
  "/:id/infos",
   checkExistingId, 
   checkExistingPreferredOS, 
   existingDeveloperInfos, 
  createDevelopersInfos
);

developersRouter.get(
  "/:id",
   checkExistingId,
   checkExistingEmail,
   searchAllInfoDeveloper 
);

developersRouter.patch(
  "/:id",
   checkExistingId,
   checkExistingEmail,
   upDateDeveloper 
);

developersRouter.delete(
  "/:id",
   checkExistingId,   
   deleteDeveloper 
);

