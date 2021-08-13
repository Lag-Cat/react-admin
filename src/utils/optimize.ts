export const throttle = (func: () => any, delay: number) => {
  var fontTime: number;
  return function () {
    var nowTime = new Date().getTime(); //获取当前时间戳
    if (nowTime - fontTime > delay || !fontTime) {
      fontTime = nowTime;
      func();
    }
  };
};

export const debounce = (func: () => any, delay: number) => {
  let timer: NodeJS.Timeout;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

