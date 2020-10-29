import axios from "axios";
import { NGRequest, MRequest, Response } from "../../TSInterfaces/APIRequest";

export const sendRequest = (req: NGRequest | MRequest, callback: (res: Response) => void): void => {
  const body = JSON.stringify(req);

  axios
    .post("http://localhost:3001/chess", { body })
    .then((res: any) => {
      callback(res.data);
    })
    .catch((e: Error) => console.error(e));
};
