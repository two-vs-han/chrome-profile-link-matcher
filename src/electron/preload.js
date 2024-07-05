const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openLink: (url) => ipcRenderer.invoke("open-link", url),
  saveProfileLinks: (links) => ipcRenderer.invoke("save-profile-links", links),
});
