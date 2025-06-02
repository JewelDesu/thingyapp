import { app, BrowserWindow, Menu } from "electron";
import { getStaticData } from "./resources.js";

export function createMenu(mainWindow: BrowserWindow) {

    const info = getStaticData().hostName;

    Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
        label: info,
    },
    {
        label: "File",
        type: "submenu",
        submenu: [{
            label: "Quit",
            click: app.quit,
        }]
    },
        {
        label: "DevTools",
        click: () => mainWindow.webContents.openDevTools(),
    },

]));
}