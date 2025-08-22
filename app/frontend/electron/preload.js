import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sendOnlineStatus: (status) => ipcRenderer.send("online-status-changed", status)
});
