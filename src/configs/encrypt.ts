import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_PUBLIC_AES_KEY;

// Mã hóa tin nhắn
const encryptMessage = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
};

// Giải mã tin nhắn
const decryptMessage = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptMessage, decryptMessage };
