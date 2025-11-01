import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "..", "react", "src", "assets", "chat.ico"),
    webPreferences: {
      nodeIntegration : true,
      preload: path.join(__dirname, 'preload.js'),
    },

  });

  // win.loadURL("http://localhost:5173"); // dev
  win.loadURL("https://electron-app-9lgr.onrender.com/");


  // win.loadFile(path.join(__dirname, "..", "react", "dist", "index.html"));


win.webContents.openDevTools();


  Menu.setApplicationMenu(null);

  // progress bar example
  let c = 0;
  const INCREMENT = 0.03;
  const INTERVAL_DELAY = 100;
  const progressInterval = setInterval(() => {
    if (win && !win.isDestroyed()) {
      win.setProgressBar(c);
    }
    if (c < 1) {
      c += INCREMENT;
    } else {
      win.setProgressBar(-1);
      clearInterval(progressInterval);
    }
  }, INTERVAL_DELAY);
};

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

// 🔹 listen for online status from renderer
ipcMain.on("online-status-changed", (event, status) => {
  console.log("User is online?", status);
  // you can store in DB, update UI, send to backend etc.
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on('show-notification', (event, data) => {
  const notification = new Notification({
    title: data.sender,
    body: data.text,
    icon: path.join(__dirname, 'assets/chat-icon.png'),
    silent: false,
    actions: [
      { type: 'button', text: 'View' },
      { type: 'button', text: 'Reply' }
    ],
    closeButtonText: 'Ignore'
  });

  notification.on('action', (_, index) => {
    if (index === 0) {
      win.show(); // open app on "View"
    } else if (index === 1) {
      win.webContents.send('reply-to-message', data.sender);
    }
  });

  notification.show();
});

