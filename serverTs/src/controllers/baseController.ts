import { Request, Response } from "express";
import { APIResponse } from "../../../client/src/TSInterfaces/APIRequest";
import gameCoordinator from "../game/gameCoordinator";

export class BaseController {
  public get(req: Request, res: Response) {
    console.log(req.query, req.params);

    res.status(400);
    res.json({
      message: "No GET here",
    });
  }

  public post(req: Request, res: Response) {
    const data = JSON.parse(req.body.body);
    let resData: APIResponse;

    switch (data.ReqType) {
      case "NG":
        resData = gameCoordinator.newGame(data);
        break;
      case "M":
        resData = gameCoordinator.sendMove(data);
        break;
      default:
        break;
    }

    res.json(resData);
  }
}
