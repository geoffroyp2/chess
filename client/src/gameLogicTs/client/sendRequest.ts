import axios from "axios";
import { NGRequest, MRequest, Response } from "../../interfaces/APIRequest";

export const sendRequest = (req: NGRequest | MRequest, callback: (res: Response) => void): void => {
    const body = JSON.stringify(req);

    axios
        .post("http://localhost:3001/chess", { body })
        .then((res) => {
            callback(res.data);
        })
        .catch((e) => console.error(e));
}
