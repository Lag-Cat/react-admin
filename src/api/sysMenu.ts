import axios from "../utils/axios";
import { baseUrl } from "../utils/config";

export const findAll = (): Promise<SysMenu[]> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/sysmenu/findAll`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};

export const addRecord = (data: SysMenu): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/sysmenu/addRecord`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};

export const updateRecord = (data: SysMenu): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/sysmenu/updateRecord`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};

export const deleteRecord = (data: SysMenuId): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/sysmenu/deleteRecord`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};
