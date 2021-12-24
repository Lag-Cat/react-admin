import {
  loginOut as _loginOut,
  login as _login,
  loginResType,
} from "../../../api/system";
import store from "../../../store/index";

export const login = (
  account: string,
  password: string
): Promise<loginResType> => {
  return new Promise((resolve, reject) => {
    _login({ account, password }).then((res) => {
      setToken(res.token);
      setUserInfo(res.userInfo);
      resolve(res);
    });
  });
};

export const setUserInfo = (userInfo: UserPublicInfo) => {
  store.dispatch({
    type: "SET_USERINFO",
    payload: { userInfo: userInfo },
  });

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const setToken = (token: IToken) => {
  store.dispatch({
    type: "SET_TOKEN",
    payload: token.token,
  });

  localStorage.setItem("token", token.token);
};
