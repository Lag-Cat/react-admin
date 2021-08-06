import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const findAll = (): Promise<AuthUserGroup[]> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/auth/findAll`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};