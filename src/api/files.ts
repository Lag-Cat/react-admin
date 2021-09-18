import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const upload = (fileName: string, file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log(file);
    axios.upload(`${baseUrl}/ftp/upload`, file).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
