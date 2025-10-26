import aesjs from "aes-js";
import crypto from "crypto";

export async function generate192BitKey() {
  const buffer = crypto.randomBytes(24);
  return Array.from(buffer);
}

export const encryptText = async (text) => {
  // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
  // var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  var key = await generate192BitKey();

  // Convert text to bytes
  var textBytes = aesjs.utils.utf8.toBytes(text);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  // to store convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  ////////////////////////////////
  /////// DEBUG CONSOLE LOGS ////
  //////////////////////////////
  console.log("~ key generated ~", key);
  console.log("🚀 ~ textBytes:", textBytes);
  console.log("🚀 ~ encryptText ~ encryptedHex:", encryptedHex);

  return {
    key,
    encryptedHex,
  };
};

export const decryptText = async (key, cipherText) => {
  ///////////////////////////////
  ////// NORMALIZATION //////////
  ///////////////////////////////
  // Make sure key is a simple array of numbers (not Buffer or object)
  if (Buffer.isBuffer(key)) key = Array.from(key);
  if (!Array.isArray(key)) throw new Error("Invalid key format");
  if (![16, 24, 32].includes(key.length))
    throw new Error("Invalid key size (must be 16, 24, or 32 bytes)");

  // Convert cipherText if it's hex
  var encryptedBytes;
  if (typeof cipherText === "string") {
    encryptedBytes = aesjs.utils.hex.toBytes(cipherText);
  } else if (Array.isArray(cipherText)) {
    encryptedBytes = cipherText;
  } else if (Buffer.isBuffer(cipherText)) {
    encryptedBytes = Array.from(cipherText);
  } else {
    throw new Error("Unsupported cipherText format");
  }

  ///////////////////////////////
  /////// DECRYPTION ///////////
  ///////////////////////////////
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

  ///////////////////////////////
  ////// DEBUG CONSOLE LOGS ////
  ///////////////////////////////
  console.log("🚀 ~ decryptText ~ key:", key);
  console.log("🚀 ~ decryptText ~ encryptedBytes:", encryptedBytes);
  console.log("🚀 ~ decryptText ~ decryptedText:", decryptedText);

  return decryptedText;
};
