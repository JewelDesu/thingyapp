import  { app, BrowserWindow, Tray } from 'electron';
import { ipcMainHandle, ipcMainOn, isDev } from './util.js'
import { getStaticData, poll } from './resources.js';
import { getAssetPath, getPreloadPath, getUIPath } from './pathResolve.js';
import path from 'path';
import { createMenu } from './menu.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences:{
            preload: getPreloadPath(),
        },
        frame: false,
    });
    if(isDev()){
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(getUIPath());
    }
    poll(mainWindow);

    ipcMainHandle("getStaticData", () => {
        return getStaticData();
    })

    ipcMainOn("changeFrameAction", (payload) => {
        switch (payload) {
            case 'CLOSE':
                mainWindow.close();
                console.log(payload);
                break;
            case 'MINIMIZE':
                mainWindow.minimize();
                break;
            case 'MAXIMIZE':
                mainWindow.maximize();
                break;
        }   
    });

    createMenu(mainWindow);
    new Tray(path.join(getAssetPath(), process.platform === "win32" ? 'icon.ico' : 'icon@2x.png'));
    
});

