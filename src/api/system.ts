import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export type loginResType = {
  token: { token: string };
  userInfo: { id: number; userName: string };
};
export const login = (data: {
  account: string;
  password: string;
}): Promise<loginResType> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/login`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const loginOut = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/loginOut`).then(
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
    icon: string;
    isRoot: number;
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
