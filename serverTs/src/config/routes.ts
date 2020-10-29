import { Request, Response } from "express";
import { BaseController } from "../controllers/baseController";

export class Routes {
  public nodesController: BaseController = new BaseController();

  public routes(app): void {
    app.route("/chess").get(this.nodesController.get).post(this.nodesController.post);
  }
}
