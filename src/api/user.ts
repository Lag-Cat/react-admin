import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const findAll = (): Promise<UserInfo[]> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/findAll`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const findById = (data: UserInfoId): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/findById`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const addUser = (data: UserInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/addUser`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};

export const updateUser = (data: UserInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/updateUser`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};

export const deleteUser = (data: UserInfoId): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/deleteUser`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};
