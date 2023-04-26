using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Common
{
    public class Decryption : IDecryption
    {
        const string key = "4512631236589784";
        const string ivBytes = "4512631236589784";
        const string error = "keyError";
        const string keyException = "key";
        const string cipherTexteException = "cipherText";

        /// <summary>
        ///  Input: password
        ///  Output: decrypted password
        ///  Description:this function allows to decrypt the password
        /// </summary>
        public string DecryptStringAES(string password)
        {
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var ivBytes = Encoding.UTF8.GetBytes(Decryption.ivBytes);
            var encrypted = Convert.FromBase64String(password);
            var decriptedPasswordt = DecryptStringFromBytes(encrypted, keyBytes, ivBytes);
            return RemoveInvalidCharacter(decriptedPasswordt);
        }

        /// <summary>
        ///  Input: password bytes,key and iv
        ///  Output: password
        ///  Description:this function allows to decrypt the password from bytes
        /// </summary>
        private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            // Check arguments.
            if (cipherText == null || cipherText.Length <= 0)
            {
                throw new ArgumentNullException(cipherTexteException);
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException(keyException);
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException(keyException);
            }

            // Declare the string used to hold
            // the decrypted text.
            string plaintext = null;

            // Create an RijndaelManaged object
            // with the specified key and IV.
            using (var rijAlg = new RijndaelManaged())
            {
                //Settings
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    // Create the streams used for decryption.
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {

                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream
                                // and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                catch
                {
                    plaintext = error;
                }
            }
            return plaintext;
        }

        /// <summary>
        ///  Input: password
        ///  Output: password without ""
        ///  Description:this function allows to remove the ""
        /// </summary>
        private static string RemoveInvalidCharacter(string password)
        {
            var passwordWithoutFirst = password.Remove(0, 1);

            return passwordWithoutFirst.Remove(passwordWithoutFirst.Length - 1, 1);
        }

    }
}
