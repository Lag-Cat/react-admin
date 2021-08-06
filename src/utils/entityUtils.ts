export const isExists = (entity: any, pk: string[], array: any[]) => {
  let _isexist = false;
  array.forEach((item) => {
    if (_isexist) return;
    let c = 0;
    for (let key of pk) {
      if (item[key] === entity[key]) {
        c++;
      }
    }
    if (c === pk.length) _isexist = true;
  });

  return _isexist;
};
