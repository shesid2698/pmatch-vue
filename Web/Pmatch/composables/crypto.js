import CryptoJS from 'crypto-js';
export default function(){

  const encrypt = txt=>{
    let str = CryptoJS.AES.encrypt(txt, 'dwdsao6d5w67wojdihjvvc87xz6dw87678').toString();
    return str;
  }

  const decrypt = txt=>{
   let str = CryptoJS.AES.decrypt(txt, 'dwdsao6d5w67wojdihjvvc87xz6dw87678').toString(CryptoJS.enc.Utf8);
   return str;
  }
  const md5 = txt=>{
    let str = CryptoJS.MD5(txt).toString();
    return str;
  }
  return {
      encrypt,
      decrypt,
      md5,
  };
}
