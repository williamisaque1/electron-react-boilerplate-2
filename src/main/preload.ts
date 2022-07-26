import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'listar'
  | 'delete'
  | 'add'
  | 'deleteTruncate';
contextBridge.exposeInMainWorld('api', {
  create(channel: Channels, args: unknown[]) {
    ipcRenderer.send(channel, args);
    return new Promise((resolve, reject) => {
      ipcRenderer.once('listar', (e, d) => {
        resolve(d);
      });
    });
  },
  delete(channel: Channels, args: number) {
    ipcRenderer.send(channel, args);
    return new Promise((resolve, reject) => {
      ipcRenderer.once(channel, (e, d) => {
        resolve(d);
      });
    });
  },
  add(channel: Channels, conteudo: string, realizada: Boolean) {
    ipcRenderer.send(channel, conteudo, realizada);
    return new Promise((resolve, reject) => {
      ipcRenderer.once(channel, (e, d) => {
        resolve(d);
      });
    });
  },
  deleteTruncate(channel: Channels) {
    ipcRenderer.send(channel);
    return new Promise((resolve, reject) => {
      ipcRenderer.once(channel, (e, d) => {
        resolve(d);
      });
    });
  },
});

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
