import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const tokenKey = process.env.REACT_APP_TOKEN_KEY;

export const jwtSign = (datas) => {
  const jwtSignData = jwt.sign(
    //  jwt를 이용한 암호화, 비밀번호 알고리즘 defualt HS256
    { data: datas }, //  담고싶은 data
    tokenKey, //  secretKey,
    { expiresIn: "3d" } //  expire 날짜
  );

  return jwtSignData;
};
export const jwtVerify = (datas) => {
  const jwtVerifyData = jwt.verify(datas, tokenKey).data; //  jwt로 암호화된 토큰을 decode한 후 data에 바로 접근
  return jwtVerifyData;
};
