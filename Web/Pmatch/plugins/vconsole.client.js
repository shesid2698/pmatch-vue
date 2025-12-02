import VConsole from 'vconsole';

export default defineNuxtPlugin((nuxtApp) => {
  // 這裡可以設定變數，例如只在測試網址或 process.dev 時才啟用
  // 為了測試方便，您可以先強制開啟
  if (process.client) {
    const vConsole = new VConsole();

    // 把 vConsole 實體掛載到 app 上 (選配)
    return {
      provide: {
        vConsole
      }
    }
  }
});