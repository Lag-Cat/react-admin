interface UserInfo {
  id: number;
  userName: string;
  email: string;
  sex?: string;
  phone?: string;
  status?: string;
  groupId?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserInfoM {
  id?: number;
  email?: string;
  sex?: string;
  phone?: string;
  status?: string;
  groupId?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserInfoId {
  id: number;
}

interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  sex: string;
  phone: string;
  status: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}
interface UserId {
  id: number;
}

interface UserPublicInfo {
  id: number;
  userName: string;
  photo?: string;
}
