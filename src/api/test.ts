import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const testExcel = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/testExcel`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
