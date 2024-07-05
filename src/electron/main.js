const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("node:path");

let profileLinks = [];

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("open-link", (event, url) => {
  const profileLink = profileLinks.find((pl) => pl.link === url);
  if (profileLink) {
    exec(
      `open -na "Google Chrome" --args --profile-directory="${profileLink.profile}" "${profileLink.link}"`,
      (error) => {
        if (error) {
          console.error(`Error opening link: ${error.message}`);
        }
      }
    );
  } else {
    console.error(`No profile found for link: ${url}`);
  }
});

ipcMain.handle("save-profile-links", (event, links) => {
  profileLinks = links;
});
