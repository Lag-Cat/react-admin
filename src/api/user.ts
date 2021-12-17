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

export const addUser = (data: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/addUser`, data).then(
      () => {
        resolve();
      },
      () => reject()
    );
  });
};

export const updateUser = (data: User): Promise<void> => {
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

export const getCurrentUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/getCurrentUserInfo`).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
export const updateUserInfo = (data: UserInfoM): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/user/updateUserInfo`, data).then(
      (res) => {
        resolve(res);
      },
      () => reject()
    );
  });
};
export const selectPage = (
  current: number,
  pageSize: number,
  data?: UserInfoM
): Promise<PaginationResult<UserInfo>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/api/user/selectPage`, { ...data, current, pageSize })
      .then(
        (res) => {
          resolve(res);
        },
        () => reject()
      );
  });
};
