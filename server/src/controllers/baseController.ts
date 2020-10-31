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

    const onReceive = (response: APIResponse) => {
      res.json(response);
    };

    switch (data.ReqType) {
      case "NG":
        gameCoordinator.newGame(data, onReceive);
        break;
      case "M":
        gameCoordinator.sendMove(data, onReceive);
        break;
      default:
        res.json("invalide query");
        break;
    }
  }
}
