import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptPasswordService {
  constructor() {}

  /**
   * Encrypt password using method AES256.
   * @param password
   * @returns encrypted password
   */
  encryptUsingAES256(password: any) {
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(JSON.stringify(password)),
      Constants.key,
      {
        keySize: 128 / 8,
        iv: Constants.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  }

  /**
   * decrypt password using method AES256.
   * @param password
   * @returns decrypted password
   */
  decryptUsingAES256(password: any) {
    var decrypted = CryptoJS.AES.decrypt(password, Constants.key, {
      keySize: 128 / 8,
      iv: Constants.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return this.deleteQuotesFromDecryptedPassword(
      decrypted.toString(CryptoJS.enc.Utf8)
    );
  }
  /**
   * this function is used to delete "" after decryption password
   * @param decryptedPassword
   * @returns password without ""
   */
  deleteQuotesFromDecryptedPassword(decryptedPassword: string) {
    decryptedPassword = decryptedPassword.substring(1);
    return decryptedPassword.slice(0, -1);
  }
}
