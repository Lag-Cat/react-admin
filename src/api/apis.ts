import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const selectPage = (
  current: number,
  pageSize: number,
  systemId: string
): Promise<PaginationResult<Apis>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/api/apis/selectPage`, { current, pageSize, systemId })
      .then(
        (res) => {
          resolve(res);
        },
        () => reject()
      );
  });
};
