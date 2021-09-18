// 重写axios配置,重写get/post方法,实现拦截器
import axios from "axios";
import { router } from "../router";
import { message, Modal } from "antd";
declare interface IAxiosResponse {
  code: number;
  data: any;
  msg: string;
}
declare interface IHttp {
  get: (url: string, param?: any) => Promise<any>;
  post: (url: string, data?: any, param?: any) => Promise<any>;
  upload: (url: string, file: File) => Promise<any>;
}
declare interface IErrInfo {
  status: number;
  message: string;
}
const baseURL = "";

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 10,
  baseURL,
  //   crossDomain: true
});

interface IResult {
  code: number;
  msg: String;
  data: any;
}

// instance.defaults.crossDomain = true
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //检查token;
    //let token = useSelector((store: IRootState) => store.token);
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    } else {
      //Modal.error({ title: "错误", content: "登录过期或验证出错，请重新登录" });
      //   setTimeout(() => {
      //     router.push("/login");
      //   }, 1000 * 5);
    }

    // 为请求加上时间戳,防止请求相同从缓存里面读取
    if (config.method === "post") {
      config.data = {
        ...config.data,
        // _t: Date.parse(new Date()) / 1000
      };
    }
    if (config.method === "get") {
      config.params = {
        //_t: Date.parse(new Date()) / 1000,
        ...config.params,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 这里主要拦截服务器返回的错误信息
    if (error && error.response) {
      let msg = "";
      let response = error.response;
      switch (response.status) {
        case 400:
          msg = "";
          break;
        case 401:
          msg = "身份验证失败，请重新登录";
          break;
        case 403:
          msg = "访问被拒绝";
          break;
        case 404:
          msg = "未找到指定资源";
          break;
        case 500:
          msg = "服务器错误,请联系系统管理员";
          break;
        default:
          msg = "";
          break;
      }
      Modal.error({
        title: "错误",
        content: msg,
        onOk: () => {
          if (response.status === 401) router.push("/login");
        },
      });

      return new Promise(error);
    }
  }
);

// 重写get方法
const get = function (url: string, params: any) {
  return new Promise((resolve, reject) => {
    // 使用Promise异步
    try {
      instance
        .get(url, params)
        .then((response) => {
          // 处理后端业务中传回的错误信息
          if (!response) {
            // Modal.error({ title: "错误", content: "请求失败" });
            throw "请求失败";
          } else {
            if (response.status !== 200 && response.data.code < 0) {
              reject(response.data.msg);
            } else {
              resolve(response.data);
            }
          }
        })
        .catch((e) => {
          // Modal.error({ title: "错误", content: e });
        });
    } catch (e) {}
  });
};

// 重写post方法
const post = function (url: string, data: any, params: any) {
  return new Promise((resolve, reject) => {
    // 使用Promise异步
    instance
      .post(url, data, params)
      .then((response: any) => {
        // 处理后端传回的错误信息
        if (response.code === 0 || response.code === 200) {
          resolve(response.data);
        } else {
          message.error(response.msg, 2);
          reject(response.data.msg);
        }
      })
      .catch((e) => {
        // Modal.error({ title: "错误", content: e });
        //console.log("postpost");
      });
  });
};

const upload = (url: string, file: File) => {
  return new Promise((resolve, reject) => {
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    let param = new FormData();
    param.append("file", file);
    console.log(param,"adsakldjalsdjakl")
    instance.post(url, {file:param}).then((response: any) => {
      if (response.code === 0 || response.code === 200) {
        resolve(response.data);
      } else {
        // message.error(response.msg, 2);
        // reject(response.data.msg);
        reject();
      }
    });
  });
};

const http: IHttp = { get, post, upload };
// 导出文件
export default http;
