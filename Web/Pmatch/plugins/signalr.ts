import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export default defineNuxtPlugin((nuxtApp) => {
  let connection: HubConnection;
  let onMessage: ((data: any) => void) | null = null;

const initSignalR = async ({ url, token, groupParam }: { url: string; token: string; groupParam: string }) => {
    connection = new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => token,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

      connection.on('ReceiveConnectionId', (id) => {
        console.log("[ReceiveConnectionId]", id);
      });

      connection.on("ReceiveChatMessage", (data) => {
        if (onMessage) onMessage(data);
      });
      
      connection.onclose((error) => {
        console.warn("SignalR connection closed", error);
      });

    try {
      await connection.start();
      await connection.invoke('JoinChatRoom', groupParam, token);
    } catch (error) {
      console.error("[SignalR] 連接失敗", error);
    }
  };
  nuxtApp.provide('initSignalR', initSignalR);
  nuxtApp.provide('setSignalROnMessage', (handler: (data: any) => void) => {
    onMessage = handler;
  });
});

declare module '#app' {
  interface NuxtApp {
    $initSignalR: (params: { url: string; token: string; groupParam: string }) => Promise<void>;
    $setSignalROnMessage: (handler: (data: any) => void) => void;
  }
}