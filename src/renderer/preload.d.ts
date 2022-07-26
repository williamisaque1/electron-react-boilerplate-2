import { Channels } from 'main/preload';

declare global {
  interface Window {
    api: {
      create(channel: Channels, args?: unknown[]): Promise<[]>;
      delete(channel: Channels, args?: unknown[] | String): Promise<[]>;
      add(
        channel: Channels,
        conteudo: String,
        realizado: Boolean
      ): Promise<Number>;
      deleteTruncate(channel: Channels): void;
    };
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
