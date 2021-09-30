export const number = (num) => {
  let val = num * 1000;
  return val.toLocaleString("ko-KR", "currency");
};
