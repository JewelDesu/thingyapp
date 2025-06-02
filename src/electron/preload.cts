const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) => 
        ipcOn("statistics", (stats) => {
            callback(stats);
        }),
    getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window['electron']);

function ipcInvoke<Key extends keyof EventPayload>(
    key: Key
    ): Promise<EventPayload[Key]>{
        return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayload>(
    key: Key, 
    callback: (payload: EventPayload[Key]) => void
    ){
        const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload)
        electron.ipcRenderer.on(key, cb);
        return() => electron.ipcRenderer.off(key, cb);
}