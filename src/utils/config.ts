//export const baseUrl="http://120.24.77.193:8726"
const env = process.env.REACT_APP_ENV;

let url = "";
let _ftpUrl = "";
switch (env) {
  case "production":
    url = "http://120.24.77.193:8726";
    _ftpUrl = "http://10.2.78.52:46082/ftp/upload";
    break;
  case "test":
    url = "http://10.2.78.52:46082";
    _ftpUrl = "http://10.2.78.52:46082/ftp/upload";
    break;
  case "development":
    url = "http://10.2.78.52:46082";
    _ftpUrl = "http://10.2.78.52:46082/ftp/upload";
    break;
  default:
    url = "http://10.2.78.52:46082";
    _ftpUrl = "http://10.2.78.52:46082/ftp/upload";
    break;
}

console.log(env, "env");

export const baseUrl = url;
export const ftpUrl = _ftpUrl;
