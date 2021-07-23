import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const findAll = (): Promise<
  {
    id: number;
    userName: string;
    email: string;
    status: string;
    groupId: string;
    createdAt: string;
    updatedAt: string;
  }[]
> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/findAll`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const findById = (data: {
  id: number;
}): Promise<{
  id: number;
  userName: string;
  email: string;
  status: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/findById`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
