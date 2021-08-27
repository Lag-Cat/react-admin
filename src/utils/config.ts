//export const baseUrl="http://120.24.77.193:8726"
const env = process.env.REACT_APP_ENV;

let url = "";
switch (env) {
  case "production":
    url = "http://120.24.77.193:8726";
    break;
  case "test":
    url = "http://10.2.78.52:46082";
    break;
  case "development":
    url = "http://10.2.78.52:46082";
    break;
  default:
    url = "http://10.2.78.52:46082";
    break;
}

console.log(env, "env");

export const baseUrl = url;
