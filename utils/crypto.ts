import CryptoJS from 'crypto-js';
import { ENCRYPTION_SECRET } from '../constants';

export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_SECRET).toString();
};

export const decryptData = (ciphertext: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.error("Decryption failed", e);
    return null;
  }
};

export const hashString = (str: string): string => {
  return CryptoJS.SHA256(str).toString();
};
