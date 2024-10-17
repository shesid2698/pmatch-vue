import CryptoJS from 'crypto-js';
export default function(){

  const encrypt = txt=>{
    let str = CryptoJS.AES.encrypt(txt, 'secret-key').toString();
    return str;
  }

  const decrypt = txt=>{
   let str = CryptoJS.AES.decrypt(txt, 'secret-key').toString(CryptoJS.enc.Utf8);
   return str;
  }
  return {
      encrypt,
      decrypt,
  };
}
