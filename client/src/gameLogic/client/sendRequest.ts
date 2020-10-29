import axios from "axios";
import { NGRequest, MRequest, APIResponse } from "../../TSInterfaces/APIRequest";

export const sendRequest = (req: NGRequest | MRequest, callback: (res: APIResponse) => void): void => {
  const body = JSON.stringify(req);

  axios
    .post("http://localhost:3001/chess", { body })
    .then((res: any) => {
      callback(res.data);
    })
    .catch((e: Error) => console.error(e));
};
