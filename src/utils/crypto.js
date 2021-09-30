import crypto from "crypto";
export const makeCryptoFunction = (password) => {
  // const cryptoedPassword = crypto
  //   .createHash("sha256")
  //   .update(password)
  //   .digest("base64");
  const cryptoedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest()
    .toString("hex");
  return cryptoedPassword;
};
