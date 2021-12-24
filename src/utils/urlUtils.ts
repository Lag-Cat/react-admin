export interface UrlObject {
  protocol: string;
  host: string;
  port: string;
  path: string;
  hash: string;
  params: ParamsType;
}

export type ParamsType = Map<string, string>;
export const getUrlObject = (url?: string): UrlObject => {
  let urlObject: UrlObject;
  if (url) {
    urlObject = {
      protocol: getProtocol(url),
      host: getHost(url),
      port: getPort(url),
      path: getPath(url),
      hash: getHash(url),
      params: getParams(url),
    };
  } else {
    urlObject = {
      protocol: window.location.protocol.split(":")[0],
      host: window.location.hostname,
      port: window.location.port,
      path: window.location.pathname,
      hash: getHash(window.location.hash),
      params: getParams(window.location.href),
    };
  }

  return urlObject;
};

const getProtocol = (url: string) => {
  let tmp = url.split("://");
  if (tmp.length === 2) {
    return tmp[0];
  } else {
    return "";
  }
};

const getHost = (url: string) => {
  if (url.split("#").length > 1) {
    return url
      .split("#")[0]
      .replace(getProtocol(url) + "://", "")
      .split(":")[0];
  } else {
    return url
      .split("?")[0]
      .replace(getProtocol(url) + "://", "")
      .split(":")[0];
  }
};

const getPort = (url: string) => {
  return "";
};

const getPath = (url: string) => {
  return "";
};

const getHash = (urlHash: string) => {
  if (urlHash.indexOf("?") >= 0) {
    return urlHash.split("?")[0].split("#")[1];
  } else {
    return urlHash;
  }
};

const getParams = (url: string) => {
  let tmp = url.split("?");
  let res: ParamsType = new Map<string, string>();
  if (tmp.length === 2) {
    let params = tmp[1].split("&");
    for (let param of params) {
      res.set(param.split("=")[0], param.split("=")[1]);
    }
  }
  return res;
};
