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

export const addRecord = (data: AuthUserGroup): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/auth/addRecord`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const updateRecord = (data: AuthUserGroup): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/auth/updateRecord`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const deleteRecord = (data: AuthUserGroup): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/auth/deleteRecord`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const refreshAuthMenu = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/auth/refreshAuthMenu`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
