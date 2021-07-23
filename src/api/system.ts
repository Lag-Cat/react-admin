import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const login = (data: {
  account: string;
  password: string;
}): Promise<{
  token: { token: string };
  userInfo: { id: number; userName: string };
}> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/login`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const getSysMenuList = (): Promise<
  {
    id: number;
    parentId: number;
    menuName: string;
    urlTo: string;
    isDeleted: string;
    createdBy: string;
    createdDate: string;
  }[]
> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/system/sysMenuList`, {}).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
